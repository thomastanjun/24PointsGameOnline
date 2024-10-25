package src.GameEngine;

import java.util.ArrayList;
import java.util.List;

public class Cell {

    private double value;
    private List<String> formula;
    private String error;

    public Cell() {
        this.value = 0;
        this.formula = new ArrayList<>(); 
        this.error = "";
    }

    // Getter for the cell's value
    public double getValue() {
        return value;
    }

    // Setter for the cell's value
    public void setValue(double value) {
        this.value = value;
    }

    // Getter for the cell's formula
    public List<String> getFormula() {
        return new ArrayList<>(this.formula);
    }

    // Setter for the cell's formula
    public void setFormula(List<String> formula) {
        this.formula = formula;
    }

    // Getter for the cell's error message
    public String getError() {
        return error;
    }

    // Setter for the cell's error message
    public void setError(String error) {
        this.error = error;
    }

    // Method to clear the cell (reset value, formula, and error)
    public void clear() {
        this.value = 0;
        this.formula = new ArrayList<>(); // Reset formula to empty
        this.error = "";
    }
}