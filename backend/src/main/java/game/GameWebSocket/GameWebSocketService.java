package game.GameWebSocket;

import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;


import game.GameService;
import game.dto.GameDTOs.GamePageInfo;

@Service
public class GameWebSocketService implements GameUpdateListener {
    private final SimpMessagingTemplate messagingTemplate;
    private final GameService gameService;

    public GameWebSocketService(SimpMessagingTemplate messagingTemplate, GameService gameService) {
        this.messagingTemplate = messagingTemplate;
        this.gameService = gameService;
        this.gameService.registerListener(this);
    }

    @Override
    public void onGameUpdate(String roomID) {
        this.broadcastGamePage(roomID);
    }

    public void broadcastGamePage(String roomID) {
        GamePageInfo jsonResponse = this.gameService.getGamePage(roomID);
        System.out.println("Broadcasting game page: " + jsonResponse); // Debug log
        this.messagingTemplate.convertAndSend("/topic/room/" + roomID + "/state", jsonResponse);
    }
    
}
