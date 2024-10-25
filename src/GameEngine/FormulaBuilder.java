package src.GameEngine;

import java.util.ArrayList;
import java.util.List;

public class FormulaBuilder {

    private List<String> formula;

    public FormulaBuilder() {
        this.formula = new ArrayList<>();
    }

    /**
     * @return the value of the formula
     */
    public List<String> getFormula() {
        return this.formula;
    }

    /**
     * Set the formula
     */
    public void setFormula(List<String> formula) {
        this.formula = new ArrayList<>(formula);
    }

    /**
     * Add token to current formula
     */
    public void addToken(String token) {
        this.formula.add(token);
        return;
    }

    /**
     * Remove the last token from the formula
     */
    public void removeToken() {
        if (this.formula.isEmpty()) {
            return;
        }
        this.formula.remove(this.formula.size() - 1);
    }
    
    /**
     * Get the formula as a string.
     * Add a space between each token and remove the last space if there is one.
     */
    public String getFormulaString() {
        StringBuilder result = new StringBuilder();

        for (String token : this.formula) {
            result.append(token).append(" ");
        }

        // Remove the last space 
        if (result.length() > 0) {
            result.setLength(result.length() - 1);
        }

        return result.toString();
    }

}