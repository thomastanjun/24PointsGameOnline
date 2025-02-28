import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameClient from '../services/GameClient';
import { GameClientContext } from '../contexts/GameClientContext';
import { useGameLogic } from '../hooks/useGameLogic';
import { useGameExit } from '../hooks/useGameExit';


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
    GameAreaSingle,
    CurrentPlayerAreaSingle,
    FormulaDisplay,
    ResultDisplay,
    WinnerDisplay,
    WinnerFormula,
    PlayerName,
    GameTimer
} from '../components/GameStyles';



const GamePageSingle: React.FC = () => {
    const {
        client,
        playerName,
        formula,
        result,
        gameNumbers,
        winner,
        winnerFormula,
        gameTime,
        isCountingDown,
        count,
        handleTokenClick,
        handleRemove,
        handleClear,
        handleNewGame,
        handleLogout,

    } = useGameLogic();

    const navigate = useNavigate();


    useGameExit(client);

    return (
        <Container>
                <>
                    <Header>
                        <Title>24 Game - Singleplayer</Title>
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
                                Winning Solution: {winnerFormula}
                            </WinnerFormula>
                            <div>Time: {gameTime}</div>
                        </WinnerDisplay>
                    )}

                    <GameAreaSingle>
                        <CurrentPlayerAreaSingle>
                            <NumbersGrid>
                                {isCountingDown ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-4xl font-bold">{count}</div>
                                    </div>
                                ) : (
                                    gameNumbers.map((num, index) => (
                                    <NumberButton 
                                    key={index} 
                                    onClick={() => handleTokenClick(num)}
                                    >
                                    {num}
                                    </NumberButton>
                                ))
                                )}
       
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
                        </CurrentPlayerAreaSingle>
                    </GameAreaSingle>
                </>
            
        </Container>
    );
};

export default GamePageSingle;