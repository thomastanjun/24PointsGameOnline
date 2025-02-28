package game.GameEngine;

import game.dto.GameDTOs.CellInfo;
import game.dto.GameDTOs.GameStatus;
import game.dto.GameDTOs.GamePageInfo;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.fasterxml.jackson.databind.ObjectMapper;



public class PageMemory {
    private Map<String, Cell> playerCells;
    private boolean gameStatus;
    private String winner;
    private String winnerFormula;
    private String[] currentGameNumbers;

    public PageMemory(String[] numbers) {
        this.playerCells = new LinkedHashMap<>();
        this.gameStatus = false;
        this.winner = "";
        this.winnerFormula = "";
        this.currentGameNumbers = numbers;
    }

    // Asign a cell for a new player
    public void addPlayer(String playerName) {
        if (playerCells.containsKey(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + " already exists");
        }
        playerCells.putIfAbsent(playerName, new Cell());
        System.out.println("PageMemory Player added: " + playerName); // Debug log
    }

    // Remove a player from the game page
    public void removePlayer(String playerName) {
        if (!playerCells.containsKey(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + " not found");
        }
        playerCells.remove(playerName);
    }

    public int getPlayersCount() {
        return playerCells.size();
    }

    public boolean isEmpty() {
        return playerCells.isEmpty();
    }

    public String getHostPlayer() {
        return playerCells.keySet().iterator().next();
    }

    public void setWinner(String playerName) {
        this.gameStatus = true;
        this.winner = playerName;
        this.winnerFormula = playerCells.get(playerName).getStringFormula();
    }

    // Reset player cells but keep the players amd update game numbers
    public void reset(String[] numbers) {
        for (Cell cell : playerCells.values()) {
            cell.clear();
        }
        this.gameStatus = false;
        this.winner = "";
        this.winnerFormula = "";
        this.currentGameNumbers = numbers;
    }

    // Get a player's cell
    public Cell getPlayerCell(String playerName) {
        validatePlayer(playerName);
        return playerCells.get(playerName);
    }

    // Set cell for specific player
    public void setCell(String playerName, Cell cell) {
        validatePlayer(playerName);
        playerCells.put(playerName, cell);
    }

    // Set formula for specific player
    public void setCellFormula(String playerName, List<String> formula) {
        validatePlayer(playerName);
        Cell cell = getPlayerCell(playerName);
        if (cell != null) {
            cell.setFormula(formula);
        }
    }

    // Get value for specific player
    public double getCellValue(String playerName) {
        validatePlayer(playerName);
        Cell cell = getPlayerCell(playerName);
        return cell.getValue();
    }

    // Set value for specific player
    public void setCellValue(String playerName, double value) {
        validatePlayer(playerName);
        Cell cell = getPlayerCell(playerName);
        if (cell != null) {
            cell.setValue(value);
        }
    }

    // Get formula string for specific player
    public String getCellFormulaString(String playerName) {
        validatePlayer(playerName);
        Cell cell = getPlayerCell(playerName);
        return cell.getStringFormula();
    }

    // Check if the input playername exists
    private void validatePlayer(String playerName) {
        if (!playerCells.containsKey(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + " not found");
        }
    }

    public GamePageInfo getGamePageInfo() {
        GameStatus gameStatus = new GameStatus(String.valueOf(this.gameStatus), this.winner, this.winnerFormula);

        Map<String, CellInfo> playersContainer = new HashMap<>();
        for (Map.Entry<String, Cell> entry : this.playerCells.entrySet()) {
            String playerName = entry.getKey();
            Cell cell = entry.getValue();
            CellInfo cellContents = new CellInfo(cell.getStringFormula(), String.valueOf(cell.getValue()), cell.getError());
            System.out.println("PageMemory getGamePageInfo: " + playerName + " " + String.valueOf(cell.getValue()) + " " + cell.getError()); // Debug log
            playersContainer.put(playerName, cellContents);
        }

        GamePageInfo gamePageInfo = new GamePageInfo(gameStatus, this.currentGameNumbers, playersContainer);

        return gamePageInfo;
    }
}
