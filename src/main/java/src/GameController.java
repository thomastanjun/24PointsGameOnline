package src;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("/add/token/{name}")
    public ResponseEntity<String> addToken(
            @PathVariable String name,
            @RequestBody String token) {
        String jsonResponse = gameService.addToken(token);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/remove/token/{name}")
    public ResponseEntity<String> removeToken(@PathVariable String name) {
        String jsonResponse = gameService.removeToken();
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/clear/formula/{name}")
    public ResponseEntity<String> clearFormula(@PathVariable String name) {
        String jsonResponse = gameService.clearFormula();
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @GetMapping("/formula/string/{name}")
    public ResponseEntity<String> getFormulaString(@PathVariable String name) {
        String formula = gameService.getFormulaString();
        return ResponseEntity.ok(formula);
    }
    
    @GetMapping("/result/string/{name}")
    public ResponseEntity<String> getResultString(@PathVariable String name) {
        String result = gameService.getResultString();
        return ResponseEntity.ok(result);
    }
    
}
