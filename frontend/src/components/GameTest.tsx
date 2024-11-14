import React, { useState, useEffect } from 'react';
import GameClient from '../services/GameClient';

const GameTest: React.FC = () => {
    const [playerName, setPlayerName] = useState('');
    const [gameClient, setGameClient] = useState<GameClient | null>(null);
    const [formula, setFormula] = useState('');
    const [result, setResult] = useState('0');
    const [gameNumbers, setGameNumbers] = useState<string[]>([]);
    const [winner, setWinner] = useState<string>('');
    const [winnerFormula, setWinnerFormula] = useState<string>('');
    const [status, setStatus] = useState<string>('false');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim()) {
            try {
                const client = new GameClient(playerName);
                await client.joinGame();  
                await client.fetchGameNumbers();
                setGameClient(client);
                setIsLoggedIn(true);
                updateDisplay(client);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message.includes("Player already active")) {
                        alert('This player name is already in use. Please choose another name.');
                    } else {
                        alert(`Failed to join game: ${error.message}`);
                    }
                }
            }
        } else {
            alert('Please enter your name');
        }
    };

    const updateDisplay = (client: GameClient) => {
        setFormula(client.getCurrentPlayerFormula());
        setResult(client.getCurrentPlayerResult());
        setGameNumbers(client.getGameNumbersString());
        setStatus(client.getGameStatus());
        if (client.isGameFinished()) {
            setWinner(client.getWinner());
            setWinnerFormula(client.getWinnerFormula());
        }
        //setOtherPlayers(client.getOtherPlayersStatus());
    };

    useEffect (() => {
        if (gameClient) {
            const interval = setInterval( async() => {
                await gameClient.fetchGamePage();
                updateDisplay(gameClient);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [gameClient, isLoggedIn]);

    const resetGameState = () => {
        setPlayerName('');
        setGameClient(null);
        setFormula('');
        setResult('0');
        setGameNumbers([]);
        setIsLoggedIn(false);
    };

    const handleLogout = async () => {
        if (!gameClient) return;

        try {
            await gameClient.leaveGame();
            resetGameState();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleTokenClick = async (token: string) => {
        if (!gameClient) return;
        try {
            await gameClient.addToken(token);
            updateDisplay(gameClient);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemove = async () => {
        if (!gameClient) return;
        try {
            await gameClient.removeToken();
            updateDisplay(gameClient);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleClear = async () => {
        if (!gameClient) return;
        try {
            await gameClient.clearFormula();
            updateDisplay(gameClient);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                // Login Form
                <form onSubmit={handleLogin}>
                    <h2>Enter Your Name to Play</h2>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <button type="submit">Join Game</button>
                </form>
            ) : (
                // Game Interface
                <div>
                    <h1>24 Game</h1>
                    <div>Player: {playerName}</div>
                    <div>Status: {status} </div>
                    <div>Winner: {winner} </div>
                    <div>WinnerFormula: {winnerFormula} </div>

                    {/* Show winner if game is completed */}
                    {gameClient?.isGameFinished() && (
                        <div className="winner-info">
                            <h2>Winner: {winner}</h2>
                            <p>Winning Formula: {winnerFormula}</p>
                        </div>
                    )}
                    
                    {/* Game Numbers Display */}
                    <div>
                        <h2>Game Numbers:</h2>
                        {gameNumbers.map((num, index) => (
                            <button key={index} onClick={() => handleTokenClick(num)}>
                                {num}
                            </button>
                        ))}
                    </div>

                    {/* Current Player's Formula and Result */}
                    <div>
                        <h2>Your Formula: {formula}</h2>
                        <h2>Result: {result}</h2>
                    </div>
                    
                    
                    {/* Operators */}
                    <div>
                        {['+', '-', '*', '/', '(', ')'].map((op) => (
                            <button key={op} onClick={() => handleTokenClick(op)}>
                                {op}
                            </button>
                        ))}
                    </div>

                    {/* Control Buttons */}
                    <div>
                        <button onClick={handleClear}>Clear</button>
                        <button onClick={handleRemove}>Undo</button>
                        <button onClick={handleLogout}>Leave Game</button> 
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameTest;