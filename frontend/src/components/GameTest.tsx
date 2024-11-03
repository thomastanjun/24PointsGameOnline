import React, { useState, useEffect } from 'react';
import GameClient from '../services/GameClient';

const GameTest: React.FC = () => {
    const [gameClient] = useState(new GameClient());
    const [formulaString, setFormulaString] = useState('');
    const [resultString, setResult] = useState('0');
    const [gameNumbers, setGameNumbers] = useState<string[]>([]);

    // Update all display values
    function updateDisplayValues(): void {
        setFormulaString(gameClient.getFormula());
        setResult(String(gameClient.getResult()));
        setGameNumbers(gameClient.getGameNumbersString());
    }

    // Udapte display values every 50ms
    useEffect(() => {
        const interval = setInterval(() => {
            updateDisplayValues();
        }, 50);
        return () => clearInterval(interval);
    });

    // Initial load of game numbers
    useEffect(() => {
        loadInitialGameNumbers();
    }, []);

    const loadInitialGameNumbers = async () => {
        try {
            await gameClient.fetchGameNumbers();
            updateDisplayValues();
        } catch (error) {
            console.error('Error loading initial numbers:', error);
        }
    };

    // Handle number/operator clicks
    const onButtonClick = async (value: string) => {
        try {
            await gameClient.addToken(value);
            updateDisplayValues();
        } catch (error) {
            console.error('Error adding token:', error);
        }
    };

    // Handle control buttons
    const onCommandButtonClick = async (command: string) => {
        try {
            switch (command) {
                case 'New Game':
                    await gameClient.startNewGame();
                    await gameClient.fetchGameState();
                    break;
                case 'Clear':
                    await gameClient.clearFormula();
                    break;
                case 'Undo':
                    await gameClient.removeToken();
                    break;
            }
            updateDisplayValues();
        } catch (error) {
            console.error('Error executing command:', error);
        }
    };

    return (
        <div>
            <h1>24 Game Test</h1>
            
            {/* Game Numbers Display */}
            <div>
                <h2>Game Numbers:</h2>
                {gameNumbers.map((num, index) => (
                    <button key={index} onClick={() => onButtonClick(num)}>
                        {num}
                    </button>
                ))}
            </div>

            {/* Formula and Result Display */}
            <div>
                <h2>Formula: {formulaString}</h2>
                <h2>Result: {resultString}</h2>
            </div>

            {/* Operators */}
            <div>
                {['+', '-', '*', '/'].map((op) => (
                    <button key={op} onClick={() => onButtonClick(op)}>
                        {op}
                    </button>
                ))}
            </div>
            <div>
                {/* Parentheses */}
                <button onClick={() => onButtonClick('(')}>(</button>
                <button onClick={() => onButtonClick(')')}>)</button>
            </div>

            {/* Control Buttons */}
            <div>
                <button onClick={() => onCommandButtonClick('New Game')}>New Game</button>
                <button onClick={() => onCommandButtonClick('Undo')}>Undo</button>
                <button onClick={() => onCommandButtonClick('Clear')}>Clear</button>
            </div>
        </div>
    );
};

export default GameTest;