package game;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.stereotype.Service;

import game.GameEngine.GamePageManager;
import game.GameEngine.PlayerManager;

@Service
public class GameService {
    private final Map<String, GamePageManager> gameRooms;
    private final PlayerManager playerManager;

    public GameService() {
        this.playerManager = new PlayerManager();
        this.gameRooms = new HashMap<>();
    }

    public String createRoom(boolean isSinglePlayer) {
        String roomId = generateRoomId(isSinglePlayer);
        GamePageManager gameManager = new GamePageManager(this.playerManager);
        this.gameRooms.put(roomId, gameManager);
        return roomId;
    }

    private String generateRoomId(boolean isSinglePlayer) {
        String roomType = isSinglePlayer ? "S-" : "M-";
        String randomId = UUID.randomUUID().toString().substring(0, 5);
        return roomType + randomId;
    }

    public String addPlayer(String playerName, String roomId) {
        System.out.println("Game Service Adding player: " + playerName + " to room: " + roomId);
        GamePageManager room = this.gameRooms.get(roomId);
        System.out.println("Game Service Room: " + room);
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

    public String addToken(String token, String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.addToken(token, playerName);
        return room.pageToJSON();
    }

    public String removeToken(String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.removeToken(playerName);
        return room.pageToJSON();
    }

    public String clearFormula(String playerName, String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.clearFormula(playerName);
        return room.pageToJSON();
    }

    // Start new game will reset the PageMemory and generate new numbers
    public String startNewGame(String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        room.reset();
        return room.pageToJSON();
    }

    // Return the current state of the game
    public String getGamePage(String roomID) {
        GamePageManager room = this.gameRooms.get(roomID);
        if (room == null) {
            throw new IllegalArgumentException("Game room not found: " + roomID);
        }
        return room.pageToJSON();
    }
}
