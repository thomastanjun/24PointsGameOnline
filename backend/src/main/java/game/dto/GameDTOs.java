package game.dto;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

public class GameDTOs {

    public static class CellInfo {
        private String formula;
        private String result;
        private String error;

        public CellInfo() {
        }

        public CellInfo(String formula, String result, String error) {
            this.formula = formula;
            this.result = result;
            this.error = error;
        }

        public String getFormula() {
            return this.formula;
        }

        public void setFormula(String formula) {
            this.formula = formula;
        }

        public String getResult() {
            return this.result;
        }

        public void setResult(String result) {
            this.result = result;
        }
    }

    public static class GameStatus {
        private String gameStatus;
        private String winner;
        private String winnerFormula;

        public GameStatus() {
        }

        public GameStatus(String gameStatus, String winner, String winnerFormula) {
            this.gameStatus = gameStatus;
            this.winner = winner;
            this.winnerFormula = winnerFormula;
        }

        public String getGameStatus() {
            return this.gameStatus;
        }

        public void setGameStatus(String gameStatus) {
            this.gameStatus = gameStatus;
        }

        public String getWinner() {
            return this.winner;
        }

        public void setWinner(String winner) {
            this.winner = winner;
        }

        public String getWinnerFormula() {
            return this.winnerFormula;
        }

        public void setWinnerFormula(String winnerFormula) {
            this.winnerFormula = winnerFormula;
        }
    }

    public static class GamePageInfo {
        private GameStatus gameStatus;
        private String[] gameNumbers;
        private Map<String, CellInfo> players;

        public GamePageInfo() {
        }

        public GamePageInfo(GameStatus gameStatus, String[] gameNumbers, Map<String, CellInfo> players) {
            this.gameStatus = gameStatus;
            this.gameNumbers = gameNumbers;
            this.players = players;
        }

        public GameStatus getGameStatus() {
            return this.gameStatus;
        }

        public void setGameStatus(GameStatus gameStatus) {
            this.gameStatus = gameStatus;
        }

        public String[] getGameNumbers() {
            return this.gameNumbers;
        }

        public void setGameNumbers(String[] gameNumbers) {
            this.gameNumbers = gameNumbers;
        }

        public Map<String, CellInfo> getPlayers() {
            return this.players;
        }

        public void setPlayers(Map<String, CellInfo> players) {
            this.players = players;
        }
    }

    public static class RoomInfo {
        private String roomID;
        private String hostPlayer;
        private String vacancySeats;
    
        public RoomInfo() {
        }
    
        public RoomInfo(String roomID, String hostPlayer, String vacancySeats) {
            this.roomID = roomID;
            this.hostPlayer = hostPlayer;
            this.vacancySeats = vacancySeats;
        }
    
        public String getRoomID() {
            return this.roomID;
        }
    
        public void setRoomID(String roomID) {
            this.roomID = roomID;
        }
    
        public String getHostPlayer() {
            return this.hostPlayer;
        }
    
        public void setHostPlayer(String hostPlayer) {
            this.hostPlayer = hostPlayer;
        }
    
        public String getVacancySeats() {
            return this.vacancySeats;
        }
    
        public void setVacancySeats(String vacancySeats) {
            this.vacancySeats = vacancySeats;
        }
    }

    public static class RoomResponse {
        private String status;
        private List<RoomInfo> roomList;

        public RoomResponse() {
        }

        public RoomResponse(String status, List<RoomInfo> roomList) {
            this.status = status;
            this.roomList = roomList;
        }

        public String getStatus() {
            return this.status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public List<RoomInfo> getRoomList() {
            return this.roomList;
        }

        public void setRoomList(List<RoomInfo> roomList) {
            this.roomList = roomList;
        }
    }
}