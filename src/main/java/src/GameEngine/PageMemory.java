package src.GameEngine;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;


public class PageMemory {
    private Map<String, Cell> playerCells;

    public PageMemory() {
        this.playerCells = new HashMap<>();
    }

    // Asign a cell for a new player
    public void addPlayer(String playerName) {
        if (playerCells.containsKey(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + " already exists");
        }
        playerCells.putIfAbsent(playerName, new Cell());
    }

    // Remove a player from the game page
    public void removePlayer(String playerName) {
        if (!playerCells.containsKey(playerName)) {
            throw new IllegalArgumentException("Player " + playerName + " not found");
        }
        playerCells.remove(playerName);
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

    // Get a json representation of the game page
    public Map<String, Map<String, String>> pageContainer() {
        Map<String, Map<String, String>> container = new HashMap<>();

        for (Map.Entry<String, Cell> entry : playerCells.entrySet()) {
            String playerName = entry.getKey();
            Cell cell = entry.getValue();

            Map<String, String> cellContents = new HashMap<>();
            cellContents.put("formula", cell.getStringFormula());  
            cellContents.put("value", String.valueOf(cell.getValue())); 
            cellContents.put("error", cell.getError());  

            container.put(playerName, cellContents);
        }

        return container;
    }

    // Convert the game page to a JSON string
    public String pageToJSON() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            System.out.println(mapper.writeValueAsString(pageContainer())); // Debug log
            return mapper.writeValueAsString(pageContainer());
        } catch (Exception e) {
            throw new RuntimeException("Error converting to JSON", e);
        }
    }

    // Update the game page from a JSON string
    public void updatePageFromJSON(String jsonString) {
        try {
            String content = jsonString.substring(1, jsonString.length() - 1);
            String[] entries = content.split("},");
            
            playerCells.clear();

            System.out.println(Arrays.toString(entries)); // Debug log
    
            for (String entry : entries) {
                entry = entry.replace("\"", "").replace("{", "").replace("}", "");
                System.out.println(entry); // Debug log
                int colonIndex = entry.indexOf(":");
                String playerName = entry.substring(0, colonIndex).trim();
                String cellData = entry.substring(colonIndex + 1).trim();
    
                Cell cell = new Cell();

                String[] formulaParts = cellData.split(",")[0].split(":");
                cell.setFormula(Arrays.asList(formulaParts[1].trim().split(" ")));
    
                String[] valueParts = cellData.split(",")[1].split(":");
                cell.setValue(Double.parseDouble(valueParts[1].trim()));
    
                String[] errorParts = cellData.split(",")[2].split(":");
                if (errorParts.length > 1) {
                    cell.setError(errorParts[1].trim());
                } else {
                    cell.setError("");
                }
                
                playerCells.put(playerName, cell);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error parsing JSON: " + e.getMessage());
        }
    }


    // Create a game page from a JSON string
    public static PageMemory createPageFromJSON(String jsonString) {
        PageMemory page = new PageMemory();
        page.updatePageFromJSON(jsonString);
        return page;
    }
    
}
