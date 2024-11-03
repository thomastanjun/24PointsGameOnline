package src;

import org.springframework.stereotype.Service;

import src.GameEngine.GamePageManager;

@Service
public class GameService {
    private final GamePageManager gameManager;

    public GameService() {
        this.gameManager = new GamePageManager();
    }

    public String addToken(String token) {
        gameManager.addToken(token);
        return gameManager.pageToJSON();
    }

    public String removeToken() {
        gameManager.removeToken();
        return gameManager.pageToJSON();
    }

    public String clearFormula() {
        gameManager.clearFormula();
        return gameManager.pageToJSON();
    }

    // Start new game will reset the PageMemory and generate new numbers
    public String startNewGame() {
        gameManager.reset();
        return gameManager.numbersToJSON();
    }

    public String getFormulaString() {
        return gameManager.getFormulaString();
    }

    public String getGameNumbers() {
        return gameManager.numbersToJSON();
    }

    public String getResultString() {
        return gameManager.getResultString();
    }

    // Return the current state of the game
    public String getGameState() {
        return gameManager.pageToJSON();
    }
}
