export interface CellInfo {
    formula: string;
    value: string;  
    error: string;
}

export interface GameStatusInfo {
    winner: string;
    gameStatus: string;

    winnerFormula: string;
}

export interface PageInfo {
    players: {
        [playerName: string]: CellInfo;
    };
    gameNumbers: string[];
    gameStatus: GameStatusInfo;
}


