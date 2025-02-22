import { PageInfo, CellInfo, GameStatusInfo } from '../GameDefinitions';
import { Rooms } from '../GameDefinitions';

interface ErrorResponse {
    message: string;
    code: string;
    timestamp: number;
}

export enum GameMode {
    SINGLE = 'SINGLE',
    MULTI = 'MULTI'
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/game';

class GameClient {
    private _baseURL: string;
    private _playerName: string; 
    private _cells: {[playerName: string]: CellInfo};
    private _gameNumbers: string[];
    private _gameStatus: GameStatusInfo;
    private _roomID: string | null;
    private _gameMode: GameMode | null;

    private _rooms: {[roomID: string]: string};

    constructor(playerName: string) {
        this._baseURL = API_URL;
        this._playerName = playerName;
        this._cells = {};
        this._gameNumbers = [];
        this._gameStatus = { gameStatus: 'false', winner: '', winnerFormula: '' };
        this._roomID = null;
        this._gameMode = null;
        console.log("GameClient initialized with player:", playerName);

        this._rooms = {};
    }

    // Core game operations
    public async getOnlinePlayerNumber(): Promise<number> {
        try {
            const response = await fetch('${this._baseURL/players/count}');

            if (!response.ok) {
                console.error('Server response:', response.status, response.statusText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
            
        } catch (error) {
            console.error('Error fetching online player number:', error);
            throw error;
        }
    }


    public async verifyPlayerName(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/player/${this._playerName}`); 

            
            if (!response.ok) {
                if (response.status === 409) {
                    const errorData: ErrorResponse = await response.json();
                    throw new Error(errorData.message);
                } else {
                    throw new Error('Unexpected error: '+ response.status);
                }
            }
        } catch (error) {
            console.error('Player Already logged in:', error);
            throw error;
        }
    }

    public async createRoom(maxPlayers: string): Promise<string> {
        try {
            console.log("creating game");
            const response = await fetch(`${this._baseURL}/room/${maxPlayers}`, {
                method: 'POST'
            });
            const roomID = await response.text();
            this._roomID = roomID;
            console.log("GameClient roomID", roomID);

            this._gameMode = GameMode.SINGLE ;
            return roomID;
        } catch (error) {
            console.error('Error creating room:', error);
            throw error;
        }
    }

    public async fetchRooms(): Promise<Rooms> {
        try {
            const response = await fetch(`${this._baseURL}/rooms/available`);
            if (!response.ok) {
                console.error('Server response:', response.status, response.statusText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw error;
        }
    }

    public async addPlayer(playerName: string): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/player/add/${playerName}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Error adding player:', error);
            throw error;
        }
    }

    public async joinGame(roomID: string): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/room/${roomID}/add/player/${this._playerName}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(errorData.message);
            }
            this._roomID = roomID;
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error joining game:', error);
            throw error;
        }
    }

    public exitGame(): void {
        try {
            fetch(`${this._baseURL}/player/remove/${this._playerName}`, {
                method: 'DELETE',
                keepalive: true
            });

            this._roomID = null;

        } catch (error) {
            console.error('Error during exit:', error);
            throw error;
        }
    }

    public async addToken(token: string): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/room/${this._roomID}/add/token/${this._playerName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: token
            });
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error adding token:', error);
            throw error;
        }
    }

    public async removeToken(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/room/${this._roomID}/remove/token/${this._playerName}`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._updateGameState(data);
            console.log("reveived data after remove", data);
        } catch (error) {
            console.error('Error removing token:', error);
            throw error;
        }
    }

    public async clearFormula(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/room/${this._roomID}/clear/formula/${this._playerName}`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._updateGameState(data);
            console.log("reveived data after clear", data);
        } catch (error) {
            console.error('Error clearing formula:', error);
            throw error;
        }
    }

    public async startNewGame(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/room/${this._roomID}/newgame/game1`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error starting new game:', error);
            throw error;
        }
    }

    public async fetchGamePage(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/room/${this._roomID}/state`);
            
            const data = await response.json();
            console.log("fetch", response);
            this._updateGameState(data);
        } catch (error) {
            console.error('Error fetching game state:', error);
            throw error;
        }
    }

    public setRoomID(roomID: string): void {
        this._roomID = roomID;
    }

    public getCurrentPlayerFormula(): string {
        return this._cells[this._playerName]?.formula || '';
    }

    public getCurrentPlayerResult(): string {
        return this._cells[this._playerName]?.value || '0';
    }

    public getCurrentPlayerError(): string {
        return this._cells[this._playerName]?.value || '';
    }

    public getGameNumbersString(): string[] {
        return this._gameNumbers;
    }

    public isGameFinished(): boolean {
        return this._gameStatus.gameStatus === 'true';
    }

    public getWinner(): string {
        return this._gameStatus.winner;
    }

    public getWinnerFormula(): string {
        return this._gameStatus.winnerFormula;
    }

    public getGameStatus(): string {
        return this._gameStatus.gameStatus;
    }

    public getPlayerName(): string {
        return this._playerName;
    }

    private _updateGameState(data: PageInfo): void {
        this._cells = data.players;
        this._gameNumbers = data.gameNumbers;
        this._gameStatus = data.gameStatus;
    }

    public resetClient(): void {
        this._cells = {};
        this._gameNumbers = [];
        this._gameStatus = { gameStatus: 'false', winner: '', winnerFormula: '' };
        this._roomID = null;
        this._gameMode = null;
    }

}

export default GameClient;