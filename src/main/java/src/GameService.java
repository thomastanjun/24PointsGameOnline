package src;

import org.springframework.stereotype.Service;

import src.GameEngine.GamePageManager;
import src.GameEngine.PlayerManager;

@Service
public class GameService {
    private final GamePageManager gameManager;
    private final PlayerManager playerManager;

    public GameService() {
        this.playerManager = new PlayerManager();
        this.gameManager = new GamePageManager(this.playerManager);
    }

    public String addPlayer(String playerName) {
        gameManager.addPlayer(playerName);
        return gameManager.pageToJSON();
    }

    public String removePlayer(String playerName) {
        gameManager.removePlayer(playerName);
        return gameManager.pageToJSON();
    }

    public boolean isPlayerActive(String playerName) {
        return this.gameManager.isPlayerActive(playerName);
    }

    public String addToken(String token, String playerName) {
        gameManager.addToken(token, playerName);
        return gameManager.pageToJSON();
    }

    public String removeToken(String playerName) {
        gameManager.removeToken(playerName);
        return gameManager.pageToJSON();
    }

    public String clearFormula(String playerName) {
        gameManager.clearFormula(playerName);
        return gameManager.pageToJSON();
    }

    // Start new game will reset the PageMemory and generate new numbers
    public String startNewGame() {
        gameManager.reset();
        return gameManager.numbersToJSON();
    }

    public String getGameNumbers() {
        return gameManager.numbersToJSON();
    }

    // Return the current state of the game
    public String getGamePage() {
        return gameManager.pageToJSON();
    }
}
