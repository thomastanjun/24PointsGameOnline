package game.GameWebSocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;


@Controller
public class GameWebSocketController {
    private final GameWebSocketService gameWebSocketService;

    public GameWebSocketController(GameWebSocketService gameWebSocketService) {
        this.gameWebSocketService = gameWebSocketService;
    }

    @MessageMapping("/room/{roomID}/state")
    public void getGamePageWebSocket(
            @DestinationVariable String roomID) {
        this.gameWebSocketService.broadcastGamePage(roomID);
    } 

    // Connection test
    @MessageMapping("/ping/{roomID}")
    public void pingRoom(@DestinationVariable String roomID) {
        System.out.println("Ping received for room: " + roomID);
        this.gameWebSocketService.broadcastGamePage(roomID);
    }
    
}
