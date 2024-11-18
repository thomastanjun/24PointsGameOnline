package game.GameEngine;

import java.util.Map;
import java.util.HashMap;

public class GamePageManager {
    private PageMemory pageMemory;
    private PlayerManager playerManager;
    private NumberGenerator numberGenerator;
    private String[] currentGameNumbers;
    private boolean gameState;
    private String winnerFormula;
    private String winner;

    public GamePageManager(PlayerManager playerManager) {
        
        this.playerManager = playerManager;
        this.numberGenerator = new NumberGenerator();
        this.currentGameNumbers = generateGameNumbers();
        this.gameState = false;
        this.winnerFormula = "";
        this.winner = "";
        this.pageMemory = new PageMemory(this.currentGameNumbers);
    }

    public String[] generateGameNumbers() {
        return numberGenerator.generateValidNumbers();
    }

    public String[] getCurrentGameNumbers(){
        return this.currentGameNumbers;
    }

    public void addPlayer(String playerName) {
        if (this.isPlayerActive(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + "already logged in");
        }
        this.playerManager.addPlayer(playerName);
        this.pageMemory.addPlayer(playerName);
    }

    public boolean isEmpty() {
        return this.pageMemory.isEmpty();
    }

    public void removePlayer(String playerName) {
        if (!this.isPlayerActive(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + "does not exist");
        }
        this.playerManager.removePlayer(playerName);
        this.pageMemory.removePlayer(playerName);
    }

    public boolean isPlayerActive(String playerName) {
        return this.playerManager.isPlayerActive(playerName);
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
        this.currentGameNumbers = generateGameNumbers();
        this.pageMemory.reset(this.currentGameNumbers);
        this.gameState = false;
        this.winnerFormula = "";
        this.winner = "";
    }

    // Method to get the page memory as a JSON string
    public String pageToJSON() {    
        return pageMemory.pageToJSON();
    }
    
    // Method to update the page memory from a JSON string
    public void updatePageFromJSON(String json) {
        pageMemory.updatePageFromJSON(json);
    }
    
    // Method to create a page memory from a JSON string
    public PageMemory createPageFromJSON(String json)  {
        reset();
        updatePageFromJSON(json);
        return pageMemory;
    }

    // Method to get the game numbers as a JSON string
    public String numbersToJSON() {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{\"gameNumbers\":[");
        for (int i = 0; i < currentGameNumbers.length; i++) {
            jsonBuilder.append("\"").append(currentGameNumbers[i]).append("\"");
            if (i < currentGameNumbers.length - 1) {
                jsonBuilder.append(",");
            }
        }
        jsonBuilder.append("]}");
        return jsonBuilder.toString();
    }
}
