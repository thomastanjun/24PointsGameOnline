import { PageInfo, CellInfo, GameStatusInfo } from '../GameDefinitions';

interface ErrorResponse {
    message: string;
    code: string;
    timestamp: number;
}

class GameClient {
    private _baseURL: string;
    private _playerName: string; 
    private _cells: {[playerName: string]: CellInfo};
    private _gameNumbers: string[];
    private _gameStatus: GameStatusInfo;

    constructor(playerName: string) {
        this._baseURL = 'http://localhost:8080/game';
        this._playerName = playerName;
        this._cells = {};
        this._gameNumbers = [];
        this._gameStatus = { gameStatus: 'false', winner: '', winnerFormula: '' };
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

    public async leaveGame(): Promise<void> {
        try {
            const response = await fetch(`${this._baseURL}/player/${this._playerName}`, {
                method: 'DELETE'
            });
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
            console.log("reveived data after remove", data);
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
            const response = await fetch(`${this._baseURL}/newgame/game1`, {
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
            const response = await fetch(`${this._baseURL}/state/game1`);
            const data = await response.json();
            this._updateGameState(data);
        } catch (error) {
            console.error('Error fetching game state:', error);
            throw error;
        }
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

    private _updateGameState(data: PageInfo): void {
        this._cells = data.players;
        this._gameNumbers = data.gameNumbers;
        this._gameStatus = data.gameStatus;
    }

}

export default GameClient;