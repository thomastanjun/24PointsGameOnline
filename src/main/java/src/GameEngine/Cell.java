package src.GameEngine;

import java.util.List;

public class Cell {

    private double value;
    private FormulaBuilder formula;
    private FormulaEvaluator evaluator;
    private String error;

    public Cell() {
        this.value = 0;
        this.formula = new FormulaBuilder(); 
        this.evaluator = new FormulaEvaluator();
        this.error = "";
    }

    // Method to add a token to the cell's formula
    public void addToken(String token) {
        this.formula.addToken(token);
        updateCalculation();
    }

    // Method to remove a token from the cell's formula
    public void removeToken() {
        this.formula.removeToken();
        updateCalculation();
    }

    // Private method to update the cell's calculation
    private void updateCalculation() {
        evaluator.evaluate(formula.getFormula());
        this.value = evaluator.getResult();
        this.error = evaluator.getError();
    }

    // Getter for the cell's value
    public double getValue() {
        return value;
    }

    // Setter for the cell's value
    public void setValue(double value) {
        this.value = value;
    }

    // Getter for the cell's formula builder object
    public FormulaBuilder getFormula() {
        return this.formula;
    }

    // Setter for the cell's formula
    public void setFormula(List<String> formula) {
        this.formula.setFormula(formula);
        updateCalculation();
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
        this.formula = new FormulaBuilder(); // Reset formula to empty
        this.error = "";
    }

    // Method to get the formula as a string
    public String getStringFormula() {
        return this.formula.getFormulaString();
    }
}