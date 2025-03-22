package game.GameEngine;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Random;

import game.dto.GameDTOs.CellInfo;
import game.dto.GameDTOs.GameStatus;
import game.dto.GameDTOs.GamePageInfo;
import game.dto.GameDTOs.RoomInfo;

public class GamePageManager {
    private PageMemory pageMemory;
    private Map<String, String> puzzles;
    private String[] currentGameNumbers;
    private boolean gameState;
    private String winnerFormula;
    private String winner;
    private int maxPlayers;
    private final Random gameRandom;

    public GamePageManager(PlayerManager playerManager, int maxPlayers, Map<String, String> puzzleSolutions) {
        
        this.currentGameNumbers = drawGameNumbers();
        this.gameState = false;
        this.winnerFormula = "";
        this.winner = "";
        this.pageMemory = new PageMemory(this.currentGameNumbers);
        this.maxPlayers = maxPlayers;
        this.puzzles = puzzleSolutions;
        this.gameRandom = new Random();
        this.currentGameNumbers = drawGameNumbers();
        System.out.println("GamePageManager Created a room with max player:" + maxPlayers); // Debug log
    }

    public boolean isSinglePlayer() {
        return this.maxPlayers == 1;
    }

    public String[] drawGameNumbers() {
        if (this.puzzles == null || this.puzzles.isEmpty()) {
            throw new IllegalStateException("Puzzle solutions are not loaded");
        }
        List<String> keys = new ArrayList<>(this.puzzles.keySet());
        String gameNumbers = keys.get(this.gameRandom.nextInt(keys.size()));
        return gameNumbers.split(",");
    }

    public String[] getCurrentGameNumbers(){
        return this.currentGameNumbers;
    }

    public boolean isGameRoomFull() {
        System.out.println("GamePageManager Players count: " + this.pageMemory.getPlayersCount()); // Debug log
        System.out.println("GamePageManager Max players: " + this.maxPlayers); // Debug log
        System.out.println("GamePageManager isGameRoomFull: " + (this.pageMemory.getPlayersCount() >= this.maxPlayers)); // Debug log
        return this.pageMemory.getPlayersCount() >= this.maxPlayers;
    }

    public int getPlayersCount() {
        return this.pageMemory.getPlayersCount();
    }

    public void addPlayer(String playerName) {
        if (this.isGameRoomFull()) {
            throw new IllegalArgumentException("Game room is full");
        }
        this.pageMemory.addPlayer(playerName);
    }

    public boolean isEmpty() {
        return this.pageMemory.isEmpty();
    }

    public void removePlayer(String playerName) {
        this.pageMemory.removePlayer(playerName);
    }

    public String getHostPlayer() {
        return this.pageMemory.getHostPlayer();
    }
    
    public String getVacancySeats() {
        return String.valueOf(this.getPlayersCount()) + "/" + String.valueOf(this.maxPlayers);
    }

    // Method to add a token to the current cell's formula
    public void addToken(String token, String playerName) {
        Cell cell = pageMemory.getPlayerCell(playerName);
        cell.addToken(token);
        validateAnswer(cell, playerName);        
    }

    // Method to remove a token from the current cell's formula
    public void removeToken(String playerName) {
        Cell cell = pageMemory.getPlayerCell(playerName);
        cell.removeToken();
        validateAnswer(cell, playerName);
    }

    // Method to clear the current cell's formula
    public void clearFormula(String playerName) {
        Cell cell = pageMemory.getPlayerCell(playerName);
        cell.clear();
    }

    private void validateAnswer(Cell cell, String playerName) {
        double value = cell.getValue();
         
        if (!this.gameState && Math.abs(value - 24) < 0.000001) {
            String formula = cell.getStringFormula();
            String[] formulaTokens = formula.split(" ");
            Map<String, Integer> numberCounts = new HashMap<>();
            Map<String, Integer> tokenCounts = new HashMap<>();
            boolean valid = true;
            for (String gameNumber : this.currentGameNumbers) {
                numberCounts.put(gameNumber, numberCounts.getOrDefault(gameNumber, 0) + 1);
            }

            for (String token : formulaTokens) {
                if (numberCounts.containsKey(token)) {
                    tokenCounts.put(token, tokenCounts.getOrDefault(token, 0) + 1);
                }
            }


            if (!tokenCounts.equals(numberCounts)) {
                    valid = false;
            }
            
            if (valid) {
                this.pageMemory.setWinner(playerName);
                this.gameState = true;
            }
        }
    }

    // Method to get the current cell's formula as a string
    public String getFormulaString(String playerName) {
        return pageMemory.getCellFormulaString(playerName);
    }

    // Method to get the current cell's result as a string
    public String getResultString(String playerName) {
        return String.valueOf(pageMemory.getCellValue(playerName));
    }

    // Method to reset the page memory
    public void reset() {
        this.currentGameNumbers = drawGameNumbers();
        this.pageMemory.reset(this.currentGameNumbers);
        this.gameState = false;
        this.winnerFormula = "";
        this.winner = "";
    }

    // Method to get the page memory as a JSON string
    public GamePageInfo pageToJSON() {    
        return this.pageMemory.getGamePageInfo();
    }

}
