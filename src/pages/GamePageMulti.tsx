import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameClient from '../services/GameClient';
import { GameClientContext } from '../contexts/GameClientContext';
import { useGameExit } from '../hooks/useGameExit';
import { useGameLogic } from '../hooks/useGameLogic';


import {
    NumberButton,
    OperatorButton,
    ControlButton,
    NumbersGrid,
    OperatorGrid,
    ButtonGroup,
    QuitButton,
} from '../components/GameButtons';

import {
    Container,
    Header,
    Title,
    GameAreaMulti,
    CurrentPlayerAreaMulti,
    OtherPlayersArea,
    PlayerCard,
    PlayerHeader,
    FormulaDisplay,
    ResultDisplay,
    Input,
    WinnerDisplay,
    WinnerFormula,
    PlayerName,
    GameTimer,
    RevealingNumber
} from '../components/GameStyles';

import { RoomInfo } from '../GameDefinitions';


const GamePageMulti: React.FC = () => {
    const navigate = useNavigate();
    const {
        client,
        playerName,
        formula,
        result,
        error,
        otherPlayers,
        gameNumbers,
        usedButtonIndices,
        winner,
        winnerFormula,
        updateDisplay,
        handleTokenClick,
        handleNumberTokenClick,
        handleRemove,
        handleClear,
        handleNewGame,
        handleLogout,

    } = useGameLogic();

    const [timerActive, setTimerActive] = useState(false);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [count, setCount] = useState(3);
    const [gameTime, setGameTime] = useState<number>(0);
    const [revealedNumbers, setRevealedNumbers] = useState<boolean[]>([false, false, false, false]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && !winner) {
            interval = setInterval(() => {
                setGameTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, winner]);

    useEffect(() => {
        let pollingInterval: NodeJS.Timeout;
        
        const fetchGameState = async () => {
          if (!client) return;
          
          try {
            await client.fetchGamePage();
            updateDisplay(client);
          } catch (error) {
            console.error('Error fetching game state:', error);
          }
        };
        
        if (client) {
          // Initial fetch
          fetchGameState();
          
          pollingInterval = setInterval(fetchGameState, 100);
        }
        
        return () => {
          if (pollingInterval) {
            clearInterval(pollingInterval);
          }
        };
      }, [client]);
    
    // Countdown effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCountingDown && count > 0) {
            timer = setTimeout(() => setCount(count - 1), 1000);
        } else if (isCountingDown && count === 0) {
            // Start revealing numbers one by one
            timer = setTimeout(() => {
                let delay = 0;
                const revealIntervals: NodeJS.Timeout[] = [];
                
                for (let i = 0; i < 4; i++) {
                    const revealTimer = setTimeout(() => {
                        setRevealedNumbers(prev => {
                            const newState = [...prev];
                            newState[i] = true;
                            return newState;
                        });
                        
                        // When all numbers are revealed, end countdown and start timer
                        if (i === 3) {
                            setTimeout(() => {
                                setIsCountingDown(false);
                                setCount(3);
                                setRevealedNumbers([false, false, false, false]);
                                setTimerActive(true);
                            }, 500);
                        }
                    }, delay);
                    
                    revealIntervals.push(revealTimer);
                    delay += 400; // 400ms between each number reveal
                }
                
                return () => {
                    revealIntervals.forEach(clearTimeout);
                };
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [isCountingDown, count]);


    useGameExit(client);



    return (
        <Container>
                    <Header>
                        <Title>24 Game - Multiplayer</Title>
                        <PlayerName>Player: {playerName}</PlayerName>
                        <GameTimer>
                            {gameTime}
                        </GameTimer>
                        <QuitButton onClick={handleLogout}>Quit Game</QuitButton>
                    </Header>

                    {winner && (
                        <WinnerDisplay>
                            <h2>Game Solved!</h2>
                            <div>Winner: {winner}</div>
                            <WinnerFormula>
                                Solution: {winnerFormula}
                            </WinnerFormula>
                            <div>Time: {gameTime}</div>
                        </WinnerDisplay>
                    )}

                    <GameAreaMulti>
                        <CurrentPlayerAreaMulti>
                            {isCountingDown ? (
                                <div style = {{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    height: '300px'
                                }}>
                                    {count}
                                </div>
                            ) : (
                                <>
                                    <NumbersGrid>
                                        {gameNumbers.map((num, index) => (
                                                <NumberButton 
                                                    key={index} 
                                                    onClick={() => handleNumberTokenClick(num, index)}
                                                    disabled={usedButtonIndices.includes(index)}
                                                    style={{
                                                        backgroundColor: usedButtonIndices.includes(index) ? '#e0e0e0' : 'white',
                                                        color: usedButtonIndices.includes(index) ? '#999' : '#333',
                                                        cursor: usedButtonIndices.includes(index) ? 'not-allowed' : 'pointer'
                                                    }}
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
                                        <ControlButton onClick={handleClear}>
                                            Clear
                                        </ControlButton>
                                        <ControlButton onClick={handleRemove}>
                                            Undo
                                        </ControlButton>
                                        <ControlButton onClick={handleNewGame}>
                                            New Game
                                        </ControlButton>
                                    </ButtonGroup>
                                </>
                            )}
                        </CurrentPlayerAreaMulti>

                        <OtherPlayersArea>
                            <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Other Players</h3>
                            {Object.entries(otherPlayers).filter(([name]) => name !== playerName).length > 0 ? (
                                Object.entries(otherPlayers).filter(([name]) => name !== playerName)
                                .map(([name, cell]) => (
                                    <PlayerCard key={name}>
                                        <PlayerHeader>{name}</PlayerHeader>
                                        <FormulaDisplay>{cell.formula || 'No formula yet'}</FormulaDisplay>
                                        <ResultDisplay>Result: {cell.value || '0'}</ResultDisplay>
                                    </PlayerCard>
                                ))
                            ) :(
                                    <PlayerCard>
                                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                            No other players in this Room
                                        </div>
                                    </PlayerCard>
                                )}
                        </OtherPlayersArea>
                    </GameAreaMulti>
            
        </Container>
    );
};

export default GamePageMulti;