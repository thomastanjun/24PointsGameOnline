import { GameState } from '../GameDefinitions';

interface ErrorResponse {
    message: string;
    code: string;
    timestamp: number;
}

class GameClient {
    private _baseURL: string;
    private _gameState: GameState;
    private _playerName: string; 
    private _gameNumbers: string[];

    constructor(playerName: string) {
        this._baseURL = 'http://localhost:8080/game';
        this._gameState = {};
        this._playerName = playerName;
        this._gameNumbers = [];
    }

    // Core game operations
    public async joinGame(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/player/${this._playerName}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error joining game:', error);
            throw error;
        }
    }

    public async addToken(token: string): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/add/token/${this._playerName}`, {
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
            const response = await fetch(`${this._baseURL}/remove/token/${this._playerName}`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._updateGameState(data);
            console.log("reveived data after remove", this._gameState);
        } catch (error) {
            console.error('Error removing token:', error);
            throw error;
        }
    }

    public async clearFormula(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/clear/formula/${this._playerName}`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._updateGameState(data);
            console.log("reveived data after clear", this._gameState);
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
            const response = await fetch(`${this._baseURL}/newgame/game1`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._gameNumbers = data.gameNumbers;
        } catch (error) {
            console.error('Error starting new game:', error);
            throw error;
        }
    }

    public async fetchGameState(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/state/game1`);
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error fetching game state:', error);
            throw error;
        }
    }

    public getCurrentPlayerFormula(): string {
        return this._gameState[this._playerName]?.formula || '';
    }

    public getCurrentPlayerResult(): string {
        return this._gameState[this._playerName]?.value || '0';
    }

    public getCurrentPlayerError(): string {
        return this._gameState[this._playerName]?.value || '';
    }

    public getGameNumbersString(): string[] {
        return this._gameNumbers;
    }

    private _updateGameState(data: any): void {
        this._gameState = data;
    }

}

export default GameClient;