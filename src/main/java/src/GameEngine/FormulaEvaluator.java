package src.GameEngine;

import java.util.ArrayList;
import java.util.List;

public class FormulaEvaluator {
    private boolean errorOccurred = false;
    private String errorMessage = "";
    private List<String> currentFormula;
    private double lastResult = 0;
    private double result = 0;

    public FormulaEvaluator() {}

    // Method to evaluate the formula
    public void evaluate(List<String> formula) {
        this.errorOccurred = false;
        this.currentFormula = new ArrayList<>(formula);

        if (this.currentFormula.isEmpty()) {
            this.result = 0;
            this.errorMessage = "Empty formula";
            return;
        }

        this.errorMessage = "";
        double resultValue = expression();
        this.result = resultValue;

        // If an error occurred, return the last valid result
        if (this.errorOccurred) {
            this.result = this.lastResult;
        }
    }

    // Getter for error message
    public String getError() {
        return this.errorMessage;
    }

    // Getter for result
    public double getResult() {
        return this.result;
    }

    // Parses an expression (term +|- term)
    private double expression() {
        double result = term();
        while (!this.currentFormula.isEmpty() && 
                (this.currentFormula.get(0).equals("+") || this.currentFormula.get(0).equals("-"))) {
            String operator = this.currentFormula.remove(0);
            if (operator.equals("+")) {
                result += term();
            } else {
                result -= term();
            }
        }
        this.lastResult = result;
        return result;
    }

    // Parses a term (factor *|/ factor)
    private double term() {
        double result = factor();
        while (!this.currentFormula.isEmpty() && 
                (this.currentFormula.get(0).equals("*") || this.currentFormula.get(0).equals("/"))) {
            String operator = this.currentFormula.remove(0);
            double factor = factor();
            if (operator.equals("*")) {
                result *= factor;
            } else {
                if (factor == 0) {
                    this.errorOccurred = true;
                    this.errorMessage = "Division by zero";
                    this.lastResult = Double.POSITIVE_INFINITY;
                    return Double.POSITIVE_INFINITY;
                }
                result /= factor;
            }
        }
        this.lastResult = result;
        return result;
    }

    // Parses a factor (number | "(" expression ")")
    private double factor() {
        double result = 0;

        // If the formula is empty, report an error
        if (this.currentFormula.isEmpty()) {
            this.errorOccurred = true;
            this.errorMessage = "Empty parentheses";
            return result;
        }

        // Get the first token in the formula
        String token = this.currentFormula.remove(0);

        // If the token is a number, set the result
        if (isNumber(token)) {
            result = Double.parseDouble(token);
            this.lastResult = result;

        // If the token is an opening parenthesis, evaluate the expression within the parentheses
        } else if (token.equals("(")) {
            result = expression();
            if (this.currentFormula.isEmpty() || !this.currentFormula.remove(0).equals(")")) {
                this.errorOccurred = true;
                this.errorMessage = "Missing closing parenthesis";
                this.lastResult = result;
            }
        } else {
            this.errorOccurred = true;
            this.errorMessage = "Invalid formula";
        }

        return result;
    }

    private boolean isNumber(String token) {
        try {
            Double.parseDouble(token);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}