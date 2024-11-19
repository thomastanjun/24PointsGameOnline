import { PageInfo, CellInfo, GameStatusInfo } from '../GameDefinitions';

interface ErrorResponse {
    message: string;
    code: string;
    timestamp: number;
}

export enum GameMode {
    SINGLE = 'SINGLE',
    MULTI = 'MULTI'
}

class GameClient {
    private _baseURL: string;
    private _playerName: string; 
    private _cells: {[playerName: string]: CellInfo};
    private _gameNumbers: string[];
    private _gameStatus: GameStatusInfo;
    private _roomID: string | null;
    private _gameMode: GameMode | null;

    constructor(playerName: string) {
        this._baseURL = 'http://localhost:8080/game';
        this._playerName = playerName;
        this._cells = {};
        this._gameNumbers = [];
        this._gameStatus = { gameStatus: 'false', winner: '', winnerFormula: '' };
        this._roomID = null;
        this._gameMode = null;
        console.log("GameClient initialized with player:", playerName);
    }

    // Core game operations
    public async createRoom(): Promise<string> {
        try {
            console.log("creating game");
            const response = await fetch(`${this._baseURL}/room`, {
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

    public async leaveGame(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/room/${this._roomID}/remove/player/${this._playerName}`, {
                method: 'DELETE'
            });
            this._roomID = null;
            
            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(errorData.message);
            }

        } catch (error) {
            console.error('Error quitting game:', error);
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

    
    public async fetchGameNumbers(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/numbers/game1`);
            const data = await response.json();
            console.log("reveived numbers after fetch", data);
            this._gameNumbers = data.gameNumbers;
        } catch (error) {
            console.error('Error getting game numbers:', error);
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