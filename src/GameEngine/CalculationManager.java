package src.GameEngine;

import java.util.List;



public class CalculationManager {

    public void evaluateCell(Cell cell) {
        FormulaEvaluator calculator = new FormulaEvaluator();

        List<String> formula = cell.getFormula();

        calculator.evaluate(formula);
        double value = calculator.getResult();
        String error = calculator.getError();

        // Update the cell with the result and error
        cell.setValue(value);
        cell.setError(error);
    }
}