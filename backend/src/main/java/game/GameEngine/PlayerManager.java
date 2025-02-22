package game.GameEngine;

import java.util.Map;
import java.util.HashMap;

public class PlayerManager {
    private Map<String, String> currentPlayers;


    public PlayerManager(){
        this.currentPlayers = new HashMap<>();
    }
    
    public void addPlayer(String playerName) {
        if (currentPlayers.containsKey(playerName)) {
            throw new IllegalStateException("Player name already exists");
        }
        currentPlayers.put(playerName, null);
    }

    public void assignPlayerToRoom(String playerName, String roomID) {
        if (currentPlayers.containsKey(playerName)) {
            currentPlayers.put(playerName, roomID);
        }
        else {
            throw new IllegalStateException("Player name does not exist");
        }
    }
    
    public void removePlayer(String playerName) {
        if (currentPlayers.containsKey(playerName)) {
            currentPlayers.remove(playerName);
        }
        else {
            throw new IllegalStateException("Player name does not exist");
        }
    }

    public void removePlayerFromRoom(String playerName) {
        if (currentPlayers.containsKey(playerName)) {
            currentPlayers.put(playerName, null);
        }
        else {
            throw new IllegalStateException("Player name does not exist");
        }
    }

    public boolean isPlayerActive(String playerName) {
        return currentPlayers.containsKey(playerName);
    }

    public String getPlayerRoom(String playerName) {
        if (currentPlayers.containsKey(playerName)) {
            return currentPlayers.get(playerName);
        }
        else {
            throw new IllegalStateException("Player name does not exist");
        }
    }

    public int getCurrentPlayersCount() {
        return currentPlayers.size();
    }
}
