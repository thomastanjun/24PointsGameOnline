package src.GameEngine;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PageMemory {
    private Cell currentCell;

    public PageMemory() {
        this.currentCell = new Cell();
    }

    // Getter for the cell
    public Cell getCurrentCell() {
        return currentCell;
    }

    // Setter for the cell
    public void setCurrentCell(Cell cell) {
        this.currentCell = cell;
    }

    // Setter for the cell's formula
    public void setCurrentCellFormula(List<String> formula) {
        currentCell.setFormula(formula);
    }

    // Getter for the cell's value
    public double getCurrentCellValue() {
        return currentCell.getValue();
    }

    // Setter for the cell's value
    public void setCurrentCellValue(double value) {
        currentCell.setValue(value);
    }

    // Get the cell's formula as a string
    public String getCurrentCellFormulaString() {
        return currentCell.getStringFormula();
    }

    
    //Get a JSON representation of the page.
    public String pageToJSON() {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{");
        jsonBuilder.append("\"formula\":").append("\"").append(this.getCurrentCellFormulaString()).append("\",");
        jsonBuilder.append("\"value\":").append(currentCell.getValue()).append(",");
        jsonBuilder.append("\"error\":").append("\"").append(currentCell.getError()).append("\"");
        jsonBuilder.append("}");

        String json = jsonBuilder.toString();
        System.out.println("PageMemory creating JSON: " + json); // Debug log
        return json;
    }

    //Update the page from a JSON string.
    public void updatePageFromJSON(String jsonString) {
        String[] parts = jsonString.replaceAll("[{}\"]", "").split(",");
        System.out.println(Arrays.toString(parts));
        for (String part : parts) {
            String[] keyValue = part.split(":");
            String key = keyValue[0].trim();
            String value = keyValue[1].trim();

            switch (key) {
                case "formula":
                    value = value.replaceAll("[\\[\\]\"]", ""); 
                    List<String> newFormula = new ArrayList<>(Arrays.asList(value.split(",")));
                    currentCell.setFormula(newFormula);
                    break;
                case "value":
                    currentCell.setValue(Double.parseDouble(value));
                    break;
                case "error":
                    currentCell.setError(value);
                    break;
                default:
                    break;
            }
        }
    }

    // Create a PageMemory instance from a JSON string.
    public static PageMemory createPageFromJSON(String jsonString) {
        PageMemory pageMemory = new PageMemory(); 
        pageMemory.updatePageFromJSON(jsonString);
        return pageMemory;
    }
}
