package src.GameEngine;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class NumberGenerator {

    private Random random;
    private FormulaEvaluator evaluator;
 
    public NumberGenerator() {
        this.random = new Random();
        this.evaluator = new FormulaEvaluator();
    }

    // Method to generate a set of 4 numbers that can be combined to make 24
    public String[] generateValidNumbers() {
        String[] numbers;
        do {
            numbers = generateFourNumbers();
        } while (!canMake24(numbers));
        
        return numbers;
    }

    // Method to generate 4 random numbers
    private String[] generateFourNumbers() {
        String[] numbers = new String[4];
        for (int i = 0; i < 4; i++) {
            numbers[i] = String.valueOf(random.nextInt(9) + 1);  
        }
        return numbers;
    }

    // Method to check if the given numbers can be combined to make 24
    private boolean canMake24(String[] numbers) {
        List<String[]> permutations = generatePermutations(numbers);
        String[] operators = {"+", "-", "*", "/"};
        
        for (String[] perm : permutations) {
            for (String[] ops : generateOperators(operators)) {
                for (String pattern : generateParenPatterns()) {
                    FormulaBuilder formula = buildFormula(perm, ops, pattern);
                    evaluator.evaluate(formula.getFormula());
                    System.out.println("Formula: " + formula.getFormula() + " Result: " + evaluator.getResult()); // Debug log
                    if (Math.abs(evaluator.getResult() - 24.0) < 0.0001) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Method to generate all possible operator combinations
    private List<String[]> generateOperators(String[] operators) {
        List<String[]> result = new ArrayList<>();
        for (String op1 : operators) {
            for (String op2 : operators) {
                for (String op3 : operators) {
                    result.add(new String[]{op1, op2, op3});
                }
            }
        }
        return result;
    }

    // Method to generate all possible parenthese patterns
    private List<String> generateParenPatterns() {
        List<String> patterns = new ArrayList<>();
        patterns.add("( N O N ) O ( N O N )");  
        patterns.add("( ( N O N ) O N ) O N");  
        patterns.add("( N O ( N O N ) ) O N");  
        patterns.add("N O ( ( N O N ) O N )");  
        patterns.add("N O ( N O ( N O N ) )");  
        return patterns;
    }

    // Method to generate all possible permutations of the given array
    private List<String[]> generatePermutations(String[] arr) {
        List<String[]> result = new ArrayList<>();
        permuteHelper(arr, 0, result);
        return result;
    }

    // Helper method for generating permutations
    private void permuteHelper(String[] arr, int index, List<String[]> result) {
        if (index == arr.length) {
            result.add(arr.clone());
            return;
        }
    
        for (int i = index; i < arr.length; i++) {
            String temp = arr[index];
            arr[index] = arr[i];
            arr[i] = temp;
        
            permuteHelper(arr, index + 1, result);
        
            temp = arr[index];
            arr[index] = arr[i];
            arr[i] = temp;
        }
    }

    // Method to build a formula from the given numbers, operators and parenthese
    private FormulaBuilder buildFormula(String[] numbers, String[] operators, String pattern) {
        FormulaBuilder formula = new FormulaBuilder();
        
        String[] tokens = pattern.split(" ");
        int numIndex = 0;
        int opIndex = 0;
        
        for (String token : tokens) {
            switch (token) {
                case "N":
                    formula.addToken(numbers[numIndex++]);
                    break;
                case "O":
                    formula.addToken(operators[opIndex++]);
                    break;
                default:
                    formula.addToken(token);  
                    break;
            }
        }
        return formula;
    }
}
