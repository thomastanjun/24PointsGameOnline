package game;

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

    @PostMapping("/room")
    public ResponseEntity<String> createRoom() {
        String roomID = gameService.createRoom(true);
        System.out.println("Creating room: " + roomID); // Debug log
        return ResponseEntity.ok(roomID);
    }


    @PutMapping("/room/{roomID}/add/player/{name}")
    public ResponseEntity<?> addPlayer(
            @PathVariable String name,
            @PathVariable String roomID) {
        try {
            String jsonResponse = gameService.addPlayer(name, roomID);  
            System.out.println("Adding player: " + jsonResponse); // Debug log
            return ResponseEntity.ok(jsonResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Player already active", "0001"));
        }
    }

    @DeleteMapping("/room/{roomID}/remove/player/{name}")  
    public ResponseEntity<?> removePlayer(
            @PathVariable String name,
            @PathVariable String roomID) {
        try {
            System.out.println("Removing player: " + name); // Debug log
            gameService.removePlayer(name, roomID);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("Player not found", "0002"));
        }
    }

    @PutMapping("/room/{roomID}/add/token/{name}")
    public ResponseEntity<String> addToken(
            @PathVariable String roomID,
            @PathVariable String name,
            @RequestBody String token) {
        String jsonResponse = gameService.addToken(token, name, roomID);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/room/{roomID}/remove/token/{name}")
    public ResponseEntity<String> removeToken(
            @PathVariable String name,
            @PathVariable String roomID) {
        String jsonResponse = gameService.removeToken(name, roomID);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/room/{roomID}/clear/formula/{name}")
    public ResponseEntity<String> clearFormula(
            @PathVariable String name,
            @PathVariable String roomID) {
        String jsonResponse = gameService.clearFormula(name, roomID);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }

    @PutMapping("/room/{roomID}/newgame/{name}")
    public ResponseEntity<String> startNewGame(
            @PathVariable String name,
            @PathVariable String roomID) {
        String jsonResponse = gameService.startNewGame(roomID);
        System.out.println("Start New Game, Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @GetMapping("/room/{roomID}/state")
    public ResponseEntity<String> getGamePage(
            @PathVariable String roomID) {
        System.out.println("Fetching..."); // Debug log
        String jsonResponse = gameService.getGamePage(roomID);
        System.out.println("Fetching: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
}
            
}
