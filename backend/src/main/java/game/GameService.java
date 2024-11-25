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

@Service
public class GameService {
    private final Map<String, GamePageManager> gameRooms;
    private final PlayerManager playerManager;

    public GameService() {
        this.playerManager = new PlayerManager();
        this.gameRooms = new HashMap<>();
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

    public String createRoom(boolean isSinglePlayer, int maxPlayers) {
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

    public GamePageInfo addPlayer(String playerName, String roomId) {
        System.out.println("Game Service Adding player: " + playerName + " to room: " + roomId);
        GamePageManager room = this.gameRooms.get(roomId);
        room.addPlayer(playerName);
        return room.pageToJSON();
    }

    public void removePlayer(String playerName, String roomId) {
        GamePageManager room = this.gameRooms.get(roomId);
        room.removePlayer(playerName);
        if (room.isEmpty()) {
            this.gameRooms.remove(roomId);
        }
    }

    public boolean isPlayerActive(String playerName, String roomId) {
        GamePageManager room = this.gameRooms.get(roomId);
        return room.isPlayerActive(playerName);
    }

    public GamePageInfo addToken(String token, String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.addToken(token, playerName);
        return room.pageToJSON();
    }

    public GamePageInfo removeToken(String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.removeToken(playerName);
        return room.pageToJSON();
    }

    public GamePageInfo clearFormula(String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.clearFormula(playerName);
        return room.pageToJSON();
    }

    // Start new game will reset the PageMemory and generate new numbers
    public GamePageInfo startNewGame(String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.reset();
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
}
