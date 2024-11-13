package src.GameEngine;

import java.util.Set;
import java.util.HashSet;

public class PlayerManager {
    private Set<String> currentPlayers;


    public PlayerManager(){
        this.currentPlayers = new HashSet<>();
    }
    
    public void addPlayer(String playerName) {
        if (currentPlayers.contains(playerName)) {
            throw new IllegalStateException("Player name already exists");
        }
        currentPlayers.add(playerName);
    }
    
    public void removePlayer(String playerName) {
        if (currentPlayers.contains(playerName)) {
            currentPlayers.remove(playerName);
        }
        else {
            throw new IllegalStateException("Player name does not exist");
        }
    }

    public boolean isPlayerActive(String playerName) {
        return currentPlayers.contains(playerName);
    }
}
