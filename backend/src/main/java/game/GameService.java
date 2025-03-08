package game;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.stereotype.Service;

import game.GameEngine.GamePageManager;
import game.GameEngine.PlayerManager;

import game.dto.GameDTOs.CellInfo;
import game.dto.GameDTOs.GameStatus;
import game.dto.GameDTOs.GamePageInfo;
import game.dto.GameDTOs.RoomInfo;

import game.GameWebSocket.GameUpdateListener;

@Service
public class GameService {
    private final Map<String, GamePageManager> gameRooms;
    private final PlayerManager playerManager;
    private GameUpdateListener gameUpdateListener;

    public GameService() {
        this.playerManager = new PlayerManager();
        this.gameRooms = new HashMap<>();
        this.gameUpdateListener = null;
    }

    public boolean isPlayerActive(String playerName) {
        return this.playerManager.isPlayerActive(playerName);
    }

    public List<RoomInfo> getAvailableRooms() {
        List<RoomInfo> availableRooms = new ArrayList<>();

        System.out.println("Game Service getAvailableRooms: " + this.gameRooms); // Debug log

        for (Map.Entry<String, GamePageManager> entry : this.gameRooms.entrySet()) {
            GamePageManager gameRoom = entry.getValue();
            if (!entry.getValue().isGameRoomFull()) {
                RoomInfo availableRoom = new RoomInfo(entry.getKey(), gameRoom.getHostPlayer(), gameRoom.getVacancySeats());
                availableRooms.add(availableRoom);
            }
        }
        return availableRooms;
    }

    public String createRoom(int maxPlayers) {
        boolean isSinglePlayer = false;
        if (maxPlayers == 1) {
            isSinglePlayer = true;
        }
        String roomId = generateRoomId(isSinglePlayer);
        GamePageManager gameManager = new GamePageManager(this.playerManager, maxPlayers);
        this.gameRooms.put(roomId, gameManager);
        return roomId;
    }

    private String generateRoomId(boolean isSinglePlayer) {
        String roomType = isSinglePlayer ? "S-" : "M-";
        String randomId = UUID.randomUUID().toString().substring(0, 5);
        return roomType + randomId;
    }

    public void addPlayer(String playerName) {
        this.playerManager.addPlayer(playerName);
    }

    public GamePageInfo assignPlayerToRoom(String playerName, String roomID) {
        System.out.println("Game Service Adding player: " + playerName + " to room: " + roomID);
        GamePageManager room = this.gameRooms.get(roomID);
        if (room == null) {
            throw new IllegalArgumentException ("Room not found: " + roomID);
        }
        if (room.isGameRoomFull()) {
            throw new IllegalArgumentException("Room is full");
        }
        if (this.playerManager.getPlayerRoom(playerName) != null) {
            throw new IllegalArgumentException("Player already in a room");
        }
        try {
            room.addPlayer(playerName);
            this.playerManager.assignPlayerToRoom(playerName, roomID);
            
            broadcastGamePage(roomID, room.isSinglePlayer());
            
            return room.pageToJSON();
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to add player: " + playerName +e.getMessage());
        }
    }

    public void removePlayer(String playerName) {
        String roomId = this.playerManager.getPlayerRoom(playerName);
        if (roomId != null) {
            GamePageManager room = this.gameRooms.get(roomId);
            room.removePlayer(playerName);
            if (room.isEmpty()) {
                this.gameRooms.remove(roomId);
            }
        }
        this.playerManager.removePlayer(playerName);
    }

    public void removePlayerFromRoom(String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.removePlayer(playerName);
        if (room.isEmpty()) {
            this.gameRooms.remove(roomID);
        }

        broadcastGamePage(roomID, room.isSinglePlayer());
        

    }

    public GamePageInfo addToken(String token, String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.addToken(token, playerName);

        broadcastGamePage(roomID, room.isSinglePlayer());
        

        return room.pageToJSON();
    }

    public GamePageInfo removeToken(String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.removeToken(playerName);

        broadcastGamePage(roomID, room.isSinglePlayer());
        

        return room.pageToJSON();
    }

    public GamePageInfo clearFormula(String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.clearFormula(playerName);

        broadcastGamePage(roomID, room.isSinglePlayer());
        

        return room.pageToJSON();
    }

    // Start new game will reset the PageMemory and generate new numbers
    public GamePageInfo startNewGame(String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.reset();

        broadcastGamePage(roomID, room.isSinglePlayer());
        
        return room.pageToJSON();
    }

    // Return the current state of the game
    public GamePageInfo getGamePage(String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        if (room == null) {
            throw new IllegalArgumentException("Game room not found: " + roomID);
        }
        return room.pageToJSON();
    }

    public int getCurrentPlayersCount() {
        return this.playerManager.getCurrentPlayersCount();
    }

    public void registerListener(GameUpdateListener listener) {
        this.gameUpdateListener = listener;
    }

    private void broadcastGamePage(String roomID, boolean isSinglePlayer) {
        if (this.gameUpdateListener != null && !isSinglePlayer) {
            this.gameUpdateListener.onGameUpdate(roomID);
        }
    }
}
