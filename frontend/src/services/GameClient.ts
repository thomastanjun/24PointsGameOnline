
import { GameState } from '../GameDefinitions';

class GameClient {
    private _baseURL: string;
    private _gameState: GameState;

    constructor() {
        this._baseURL = 'http://localhost:8080/game';
        this._gameState = {
            formula: '',
            value: 0,
            error: '',
            gameNumbers: []
        };
    }

    // Core game operations
    public async addToken(token: string): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/add/token/game1`, {
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
            const response = await fetch(`${this._baseURL}/remove/token/game1`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error removing token:', error);
            throw error;
        }
    }

    public async clearFormula(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/clear/formula/game1`, {
                method: 'PUT'
            });
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error clearing formula:', error);
            throw error;
        }
    }

    
    public async fetchGameNumbers(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/numbers/game1`);
            const data = await response.json();
            this._updateGameNumbers(data);
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
            this._updateGameNumbers(data);
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

    // State getters
    public getFormula(): string {
        return this._gameState.formula;
    }

    public getResult(): number {
        return this._gameState.value;
    }

    public getGameNumbersString(): string[] {
        return this._gameState.gameNumbers;
    }

    public getError(): string {
        return this._gameState.error;
    }

    private _updateGameState(data: any): void {
        this._gameState = {
            formula: data.formula || '',
            value: data.value || 0,
            error: data.error || '',
            gameNumbers: this._gameState.gameNumbers
        };
    }

    private _updateGameNumbers(data: any): void {
        if (data.gameNumbers) {
            this._gameState = {
                ...this._gameState,  
                gameNumbers: data.gameNumbers
            };
        }
    }

}

export default GameClient;