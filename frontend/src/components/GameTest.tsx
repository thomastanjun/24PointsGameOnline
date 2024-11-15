import React, { useState, useEffect } from 'react';
import GameClient from '../services/GameClient';
import {
    NumberButton,
    OperatorButton,
    ControlButton,
    NumbersGrid,
    OperatorGrid,
    ButtonGroup,
    QuitButton,
} from './GameButtons';
import {
    Container,
    Header,
    Title,
    GameBoard,
    FormulaDisplay,
    ResultDisplay,
    LoginForm,
    Input,
    WinnerDisplay,
    WinnerFormula,
    PlayerName,
    GameControls
} from './GameStyles';

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
        setWinner(client.getWinner());
        setWinnerFormula(client.getWinnerFormula());
        
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

    const resetGameStatus = () => {
        setWinner('');
        setWinnerFormula('');
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

    const handleNewGame = async () => {
        if (!gameClient) return;
        try {
            await gameClient.startNewGame();
            resetGameStatus();
            updateDisplay(gameClient);
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
        <Container>
            {!isLoggedIn ? (
                <LoginForm onSubmit={handleLogin}>
                    <Title>24 Game</Title>
                    <Input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <ControlButton type="submit">Join Game</ControlButton>
                </LoginForm>
            ) : (
                <>
                    <Header>
                        <Title>24 Game</Title>
                        <PlayerName>Player: {playerName}</PlayerName>
                        CurrentWinner: {winner}
                        <QuitButton onClick={handleLogout}>
                            Quit Game
                        </QuitButton>
                    </Header>

                    {winner && (
                        <WinnerDisplay>
                            <h2>We have a winner!</h2>
                            <div>Player: {winner}</div>
                            <WinnerFormula>
                                Winning Formula: {winnerFormula}
                            </WinnerFormula>
                        </WinnerDisplay>
                    )}

                    <GameBoard>
                        <div>Player: {playerName}</div>
                        
                        <NumbersGrid>
                            {gameNumbers.map((num, index) => (
                                <NumberButton 
                                    key={index} 
                                    onClick={() => handleTokenClick(num)}
                                >
                                    {num}
                                </NumberButton>
                            ))}
                        </NumbersGrid>

                        <FormulaDisplay>
                            {formula || 'Start building your formula'}
                        </FormulaDisplay>

                        <ResultDisplay>
                            Result: {result}
                        </ResultDisplay>
                        
                        <OperatorGrid>
                            {['+', '-', '*', '/', '(', ')'].map((op) => (
                                <OperatorButton 
                                    key={op} 
                                    onClick={() => handleTokenClick(op)}
                                >
                                    {op}
                                </OperatorButton>
                            ))}
                        </OperatorGrid>

                        <ButtonGroup>
                            <ControlButton
                                onClick={handleClear}
                            >
                                Clear
                            </ControlButton>
                            <ControlButton
                                onClick={handleRemove}
                            >
                                Undo
                            </ControlButton>
                            <ControlButton
                                onClick={handleNewGame}
                            >
                                New Game
                            </ControlButton>
                        
                        </ButtonGroup>
                    </GameBoard>
                </>
            )}
        </Container>
    );
};


export default GameTest;