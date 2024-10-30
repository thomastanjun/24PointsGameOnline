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

    public String[] generateValidNumbers() {
        String[] numbers;
        do {
            numbers = generateFourNumbers();
        } while (!canMake24(numbers));
        
        return numbers;
    }

    private String[] generateFourNumbers() {
        String[] numbers = new String[4];
        for (int i = 0; i < 4; i++) {
            numbers[i] = String.valueOf(random.nextInt(9) + 1);  
        }
        return numbers;
    }

    private boolean canMake24(String[] numbers) {
        List<String[]> permutations = generatePermutations(numbers);
        String[] operators = {"+", "-", "*", "/"};
        
        for (String[] perm : permutations) {
            for (String[] ops : generateOperators(operators)) {
                for (String pattern : generateParenPatterns()) {
                    FormulaBuilder formula = buildFormula(perm, ops, pattern);
                    evaluator.evaluate(formula.getFormula());
                    if (Math.abs(evaluator.getResult() - 24.0) < 0.0001) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
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

    private List<String> generateParenPatterns() {
        List<String> patterns = new ArrayList<>();
        patterns.add("(N O N) O (N O N)");  
        patterns.add("((N O N) O N) O N");  
        patterns.add("(N O (N O N)) O N");  
        patterns.add("N O ((N O N) O N)");  
        patterns.add("N O (N O (N O N))");  
        return patterns;
    }

    private List<String[]> generatePermutations(String[] arr) {
        List<String[]> result = new ArrayList<>();
        permuteHelper(arr, 0, result);
        return result;
    }

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
