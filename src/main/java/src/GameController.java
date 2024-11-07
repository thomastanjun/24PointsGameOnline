package src;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/game")
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PutMapping("/player/{name}")
    public ResponseEntity<?> addPlayer(@PathVariable String name) {
        try {
            if (gameService.isPlayerActive(name)) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Player already active", "0001"));
            }
            String jsonResponse = gameService.addPlayer(name);  
            return ResponseEntity.ok(jsonResponse);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/add/token/{name}")
    public ResponseEntity<String> addToken(
            @PathVariable String name,
            @RequestBody String token) {
        String jsonResponse = gameService.addToken(token, name);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/remove/token/{name}")
    public ResponseEntity<String> removeToken(@PathVariable String name) {
        String jsonResponse = gameService.removeToken(name);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/clear/formula/{name}")
    public ResponseEntity<String> clearFormula(@PathVariable String name) {
        String jsonResponse = gameService.clearFormula(name);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }

    @PutMapping("/newgame/{name}")
    public ResponseEntity<String> startNewGame(@PathVariable String name) {
        String newNumbersJson = gameService.startNewGame();
        System.out.println("Backend sending: " + newNumbersJson); // Debug log
        return ResponseEntity.ok(newNumbersJson);
    }
        
    @GetMapping("/numbers/{name}")
    public ResponseEntity<String> getGameNumbers(@PathVariable String name) {
        String numbersJson = gameService.getGameNumbers();
        return ResponseEntity.ok(numbersJson);
    }
    

    @GetMapping("/state/{name}")
    public ResponseEntity<String> getGameState(@PathVariable String name) {
        String gameState = gameService.getGameState();
        return ResponseEntity.ok(gameState);
}
            
}
