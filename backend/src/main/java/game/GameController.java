package game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import game.dto.GameDTOs.CellInfo;
import game.dto.GameDTOs.GameStatus;
import game.dto.GameDTOs.GamePageInfo;
import game.dto.GameDTOs.RoomInfo;
import game.dto.GameDTOs.RoomResponse;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/game")
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PutMapping("/player/add/{name}")
    public ResponseEntity<?> addPlayer(
            @PathVariable String name) {
        try {
            System.out.println("Adding player: " + name); // Debug log
            this.gameService.addPlayer(name);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("Player already active", "0001"));
        }
    }


    @PostMapping("/room/{maxPlayers}")
    public ResponseEntity<String> createRoom(
        @PathVariable int maxPlayers) {
        System.out.println("Creating room..."); // Debug log
        String roomID = this.gameService.createRoom(true, maxPlayers);
        System.out.println("Created room: " + roomID); // Debug log
        return ResponseEntity.ok(roomID);
    }

    @PutMapping("/room/{roomID}/add/player/{name}")
    public ResponseEntity<?> assignPlayerToRoom(
            @PathVariable String name,
            @PathVariable String roomID) {
        try {
            System.out.println("Adding player: " + name + " to " + roomID); // Debug log
            GamePageInfo jsonResponse = this.gameService.assignPlayerToRoom(name, roomID);  
            return ResponseEntity.ok(jsonResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Player already active", "0001"));
        }
    }

    // Called when a player completely leaves the game, removes the player from the room and the active players list
    @DeleteMapping("/player/remove/{name}")  
    public ResponseEntity<?> removePlayer(
            @PathVariable String name) {
        try {
            System.out.println("Removing player: " + name); // Debug log
            this.gameService.removePlayer(name);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("Player not found", "0002"));
        }
    }

    @DeleteMapping("/room/{roomID}/remove/player/{name}")  
    public ResponseEntity<?> removePlayerFromRoom(
            @PathVariable String name,
            @PathVariable String roomID) {
        try {
            System.out.println("Removing player: " + name); // Debug log
            this.gameService.removePlayerFromRoom(name, roomID);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("Player not found", "0002"));
        }
    }

    @PutMapping("/room/{roomID}/add/token/{name}")
    public ResponseEntity<GamePageInfo> addToken(
            @PathVariable String roomID,
            @PathVariable String name,
            @RequestBody String token) {
        GamePageInfo jsonResponse = this.gameService.addToken(token, name, roomID);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/room/{roomID}/remove/token/{name}")
    public ResponseEntity<GamePageInfo> removeToken(
            @PathVariable String name,
            @PathVariable String roomID) {
        GamePageInfo jsonResponse = this.gameService.removeToken(name, roomID);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
    
    @PutMapping("/room/{roomID}/clear/formula/{name}")
    public ResponseEntity<GamePageInfo> clearFormula(
            @PathVariable String name,
            @PathVariable String roomID) {
        GamePageInfo jsonResponse = this.gameService.clearFormula(name, roomID);
        System.out.println("Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }

    @PutMapping("/room/{roomID}/newgame/{name}")
    public ResponseEntity<GamePageInfo> startNewGame(
            @PathVariable String name,
            @PathVariable String roomID) {
        GamePageInfo jsonResponse = this.gameService.startNewGame(roomID);
        System.out.println("Start New Game, Backend sending: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }

    @GetMapping("/players/count")
    public ResponseEntity<Integer> getCurrentPlayersCount() {
        int count = this.gameService.getCurrentPlayersCount();
        System.out.println("Current players count: " + count); // Debug log
        return ResponseEntity.ok(count);
    }

    @GetMapping("/player/{name}")
    public ResponseEntity<Object> isPlayerActive(
            @PathVariable String name) {
        boolean isPlayerActive = this.gameService.isPlayerActive(name);
        if (isPlayerActive) {
            return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(new ErrorResponse("Player already active", "0001"));
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("rooms/available")
    public ResponseEntity<?> getAvailableRooms() {
        try {
            List<RoomInfo> rooms = this.gameService.getAvailableRooms();
            System.out.println("Available rooms: " + rooms); // Debug log
            RoomResponse response = new RoomResponse();
            if (rooms.isEmpty()) {
                response.setStatus("Empty");
                response.setRoomList(rooms);
                return ResponseEntity.ok(response);
            } else {
                response.setStatus("Available");
                response.setRoomList(rooms);
                return ResponseEntity.ok(response);
            }} catch (Exception e) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("No rooms available", "0003"));
            }
    }
    
    @GetMapping("/room/{roomID}/state")
    public ResponseEntity<GamePageInfo> getGamePage(
            @PathVariable String roomID) {
        System.out.println("Fetching..."); // Debug log
        GamePageInfo jsonResponse = this.gameService.getGamePage(roomID);
        System.out.println("Fetched: " + jsonResponse); // Debug log
        return ResponseEntity.ok(jsonResponse);
    }
            
}
