package src.GameEngine;

public class GamePageManager {
    private PageMemory pageMemory;

    public GamePageManager() {
        this.pageMemory = new PageMemory();
    }

    // Method to add a token to the current cell's formula
    public void addToken(String token) {
        Cell cell = pageMemory.getCurrentCell();
        cell.addToken(token);        
    }

    // Method to remove a token from the current cell's formula
    public void removeToken() {
        Cell cell = pageMemory.getCurrentCell();
        cell.removeToken();  
    }

    // Method to clear the current cell's formula
    public void clearFormula() {
        Cell cell = pageMemory.getCurrentCell();
        cell.clear();
    }

    // Method to get the current cell's formula as a string
    public String getFormulaString() {
        return pageMemory.getCurrentCellFormulaString();
    }

    // Method to get the current cell's result as a string
    public String getResultString() {
        return String.valueOf(pageMemory.getCurrentCellValue());
    }

    // Method to reset the page memory
    public void reset() {
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
}
