package src.GameEngine;

import java.util.Set;
import java.util.HashSet;

public class GamePageManager {
    private PageMemory pageMemory;
    private NumberGenerator numberGenerator;
    private String[] currentGameNumbers;
    private Set<String> activePlayers;

    public GamePageManager() {
        this.pageMemory = new PageMemory();
        this.numberGenerator = new NumberGenerator();
        this.currentGameNumbers = generateGameNumbers();
        this.activePlayers = new HashSet<>();
    }

    public String[] generateGameNumbers() {
        return numberGenerator.generateValidNumbers();
    }

    public String[] getCurrentGameNumbers(){
        return this.currentGameNumbers;
    }

    public void addPlayer(String playerName) {
        if (isPlayerActive(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + "already logged in");
        }
        pageMemory.addPlayer(playerName);
        activePlayers.add(playerName);
    }

    public void removePlayer(String playerName) {
        if (!isPlayerActive(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + "does not exist");
        }
        pageMemory.removePlayer(playerName);
        activePlayers.remove(playerName);
    }

    public boolean isPlayerActive(String playerName) {
        return activePlayers.contains(playerName);
    }

    // Method to add a token to the current cell's formula
    public void addToken(String token, String playerName) {
        Cell cell = pageMemory.getPlayerCell(playerName);
        cell.addToken(token);        
    }

    // Method to remove a token from the current cell's formula
    public void removeToken(String playerName) {
        Cell cell = pageMemory.getPlayerCell(playerName);
        cell.removeToken();  
    }

    // Method to clear the current cell's formula
    public void clearFormula(String playerName) {
        Cell cell = pageMemory.getPlayerCell(playerName);
        cell.clear();
    }

    private boolean validateAnswer(String playerName) {
        Cell cell = pageMemory.getPlayerCell(playerName);
        double value = cell.getValue();
        double target = 24;
        double tolerance = 0.000001;

        return Math.abs(value - target) < tolerance;
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
        pageMemory = new PageMemory();
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
