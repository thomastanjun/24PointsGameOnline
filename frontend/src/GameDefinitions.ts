export interface GameState {
    [playerName: string]: CellState;
}

interface CellState {
    formula: string;
    value: string;  
    error: string;
}

