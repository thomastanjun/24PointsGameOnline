package game.data;

import java.util.Map;
import java.util.List;

public final class GameData {
    public record CellInfo (String formula, String result, String error) {}

    public record GameStatus (String gameStatus, String winner, String winnerFormula) {}

    public record GamePageInfo (GameStatus gameStatus, String[] gameNumbers, Map<String, CellInfo> players) {}

    public record RoomInfo (String roomID, String hostPlayer, String vacancySeats) {}

    public record RoomResponse (String status, List<RoomInfo> roomList) {}
}
