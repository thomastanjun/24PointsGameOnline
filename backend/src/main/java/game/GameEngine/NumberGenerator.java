package game.GameEngine;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.HashMap;
import java.io.IOException;
import java.io.File;


public class NumberGenerator {

    public static final int UPPER_BOUND = 9;
    public static final int NUMBER_LIMIT = 4;

    private FormulaEvaluator evaluator;

    private record NumberState(String[] numbers, int index) {};
    private record SolutionState(boolean found, String solution) {};
 
    public NumberGenerator() {
        this.evaluator = new FormulaEvaluator();
    }

    public void saveSolutionFiles(String fileName) {
        Map<String, String> total_solutions = generateFourNumbers();

        File dataDir = new File("data");
        if (!dataDir.exists()) {
            dataDir.mkdir();
        }

        File outputFile = new File(dataDir, fileName);
        
        Properties properties = new Properties();

        for (Map.Entry<String, String> entry : total_solutions.entrySet()) {
            properties.setProperty(entry.getKey(), entry.getValue());
        }

        try (FileOutputStream out = new FileOutputStream(outputFile)){
            properties.store(out, "24 Game Solutions");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Method to generate 4 random numbers
    private Map<String, String> generateFourNumbers() {

        Map<String, String> total_solutions = new HashMap<String, String>();

        List<NumberState> frontier = new ArrayList<>();

        for (int i = 1; i < UPPER_BOUND+1; i++) {
            String[] numbers = new String[NUMBER_LIMIT];
            numbers[0] = String.valueOf(i);
            frontier.add(new NumberState(numbers, 0));
        }

        while (frontier.size() > 0) {
            NumberState current = frontier.remove(frontier.size()-1);
            String[] currentNumbers = current.numbers();
            int currentIndex = current.index();

            if (currentIndex == NUMBER_LIMIT-1) {
                SolutionState solution = canMake24(currentNumbers);
                if (solution.found()) {
                    String gameNumbers = String.join(",", currentNumbers); 
                    total_solutions.put(gameNumbers, solution.solution());
                }
            } else {
                for (int i = 1; i < UPPER_BOUND+1; i++) {
                    String[] newNumbers = currentNumbers.clone();
                    newNumbers[currentIndex+1] = String.valueOf(i);
                    frontier.add(new NumberState(newNumbers, currentIndex+1));
                }
            }
        }

        return total_solutions;
    }

    // Method to check if the given numbers can be combined to make 24
    private SolutionState canMake24(String[] numbers) {
        List<String[]> permutations = generatePermutations(numbers);
        String[] operators = {"+", "-", "*", "/"};
        
        for (String[] perm : permutations) {
            for (String[] ops : generateOperators(operators)) {
                for (String pattern : generateParenPatterns()) {
                    FormulaBuilder formula = buildFormula(perm, ops, pattern);
                    evaluator.evaluate(formula.getFormula());
                    System.out.println("Formula: " + formula.getFormula() + " Result: " + evaluator.getResult()); // Debug log
                    if (Math.abs(evaluator.getResult() - 24.0) < 0.0001) {
                        return new SolutionState(true, formula.getFormulaString());
                    }
                }
            }
        }
        return new SolutionState(false, null);
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

    public static void main(String[] args) {
        NumberGenerator generator = new NumberGenerator();
        generator.saveSolutionFiles("solutions.properties");

    }
}
