import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameClient from '../services/GameClient';
import { GameClientContext } from '../contexts/GameClientContext';


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
    GameArea,
    CurrentPlayerArea,
    OtherPlayersArea,
    PlayerCard,
    PlayerHeader,
    FormulaDisplay,
    ResultDisplay,
    LoginForm,
    Input,
    WinnerDisplay,
    WinnerFormula,
    PlayerName,
    GameControls
} from '../components/GameStyles';

import { RoomInfo } from '../GameDefinitions';


const GamePage: React.FC = () => {
    const navigate = useNavigate();
    const { client } = useContext(GameClientContext);
    console.log("a new render");

    const [playerName, setPlayerName] = useState(client?.getPlayerName() || '');
    const [formula, setFormula] = useState(client?.getCurrentPlayerFormula() || '');
    const [result, setResult] = useState(client?.getCurrentPlayerResult() || '0');
    const [gameNumbers, setGameNumbers] = useState<string[]>(client?.getGameNumbersString() || []); 
    const [winner, setWinner] = useState<string>('');
    const [winnerFormula, setWinnerFormula] = useState<string>('');
    const [status, setStatus] = useState<string>('false');

    const updateDisplay = (client: GameClient) => {
        setFormula(client.getCurrentPlayerFormula());
        setResult(client.getCurrentPlayerResult());
        setGameNumbers(client.getGameNumbersString());
        setStatus(client.getGameStatus());


        if (client.getWinner()) {
            setWinner(client.getWinner());
            setWinnerFormula(client.getWinnerFormula());
        }
    };

    const handleLogout = async () => {
        if (!client) return;
        try {
            await client.leaveGame();
            resetGameState();
            client.resetClient();
            navigate('/mode-selection');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    
    const resetGameState = () => {
        setPlayerName('');
        setFormula('');
        setResult('0');
        setGameNumbers([]);
        setWinner('');
        setWinnerFormula('');
    };
    

    const handleNewGame = async () => {
        if (!client) return;
        try {
            await client.startNewGame();
            setWinner('');
            setWinnerFormula('');
            updateDisplay(client);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleTokenClick = async (token: string) => {
        if (!client) return;
        try {
            await client.addToken(token);
            updateDisplay(client);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemove = async () => {
        if (!client) return;
        try {
            await client.removeToken();
            updateDisplay(client);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleClear = async () => {
        if (!client) return;
        try {
            await client.clearFormula();
            updateDisplay(client);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <Container>
                <>
                    <Header>
                        <Title>24 Game</Title>
                        <PlayerName>Player: {playerName}</PlayerName>
                        <QuitButton onClick={handleLogout}>Quit Game</QuitButton>
                    </Header>

                    {winner && (
                        <WinnerDisplay>
                            <h2>You Solved It!</h2>
                            <div>Player: {winner}</div>
                            <WinnerFormula>
                                Winning Formula: {winnerFormula}
                            </WinnerFormula>
                        </WinnerDisplay>
                    )}

                    <GameArea>
                        <CurrentPlayerArea>
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
                        </CurrentPlayerArea>

                        <OtherPlayersArea>
                            {client && Object.entries(client['_cells'])
                                .filter(([name]) => name !== playerName)
                                .map(([name, cell]) => (
                                    <PlayerCard key={name}>
                                        <PlayerHeader>{name}</PlayerHeader>
                                        <FormulaDisplay>{cell.formula || 'No formula yet'}</FormulaDisplay>
                                        <ResultDisplay>Result: {cell.value || '0'}</ResultDisplay>
                                    </PlayerCard>
                                ))}
                        </OtherPlayersArea>
                    </GameArea>
                </>
            
        </Container>
    );
};

export default GamePage;