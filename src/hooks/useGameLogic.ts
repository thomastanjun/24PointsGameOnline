import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameClientContext } from '../contexts/GameClientContext';
import GameClient from '../services/GameClient';

export const useGameLogic = () => {
    const navigate = useNavigate();
    const { client } = useContext(GameClientContext);
    
    const [playerName, setPlayerName] = useState(client?.getPlayerName() || '');
    const [formula, setFormula] = useState(client?.getCurrentPlayerFormula() || '');
    const [result, setResult] = useState(client?.getCurrentPlayerResult() || '0+default');
    const [error, setError] = useState(client?.getCurrentPlayerError() || 'default error');
    const [otherPlayers, setOtherPlayers] = useState<{ [playerName: string]: { formula: string, value: string } }>({});
    const [gameNumbers, setGameNumbers] = useState<string[]>(client?.getGameNumbersString() || []);
    const [usedButtonIndices, setUsedButtonIndices] = useState<number[]>([]);
    const [tokenHistory, setTokenHistory] = useState<number[]>([]);
    const [winner, setWinner] = useState<string>('');
    const [winnerFormula, setWinnerFormula] = useState<string>('');
    const [gameTime, setGameTime] = useState<number>(0);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [count, setCount] = useState(3);

    const updateDisplay = (client: GameClient) => {
        setFormula(client.getCurrentPlayerFormula());
        setError(client.getCurrentPlayerError());
        setResult(client.getCurrentPlayerResult() + client.getCurrentPlayerError());
        setGameNumbers(client.getGameNumbersString());
        setOtherPlayers(client.getOtherPlayers());
        setWinner(client.getWinner());
        setWinnerFormula(client.getWinnerFormula());
    };

    const handleTokenClick = async (token: string) => {
        if (!client) return;

        try {
            await client.addToken(token);
            updateDisplay(client);
            setTokenHistory(prev => [...prev, -1]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNumberTokenClick = async (token: string, index: number) => {
        if (!client) return;

        try {
            await client.addToken(token);
            updateDisplay(client);
            setUsedButtonIndices(prev => [...prev, index]);
            setTokenHistory(prev => [...prev, index]);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemove = async () => {
        if (!client) return;
        try {
            await client.removeToken();
            updateDisplay(client);
            setTokenHistory( prev => {
                if (prev.length === 0) return prev;

                const newHistory = prev.slice(0, -1);
                const lastToken = prev[prev.length - 1];

                if (lastToken > -1) {
                    setUsedButtonIndices(prev => prev.filter(i => i !== lastToken));
                }

                return newHistory;
            }

            )
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = async () => {
        if (!client) return;
        try {
            await client.clearFormula();
            updateDisplay(client);
            setUsedButtonIndices([]);
            setTokenHistory([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNewGame = async () => {
        if (!client) return;
        try {
            await client.startNewGame();
            updateDisplay(client);
            setUsedButtonIndices([]);
            setTokenHistory([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = async () => {
        if (!client) return;
        try {
            await client.exitGame();
            client.resetClient();
            navigate('/mode-selection');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCountingDown && count > 1) {
            timer = setTimeout(() => setCount(prev => prev - 1), 1000);
        } else if (count === 1) {
            timer = setTimeout(() => {
                setIsCountingDown(false);
                setCount(3); 
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [count, isCountingDown]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isCountingDown && !winner) {
            interval = setInterval(() => {
                    setGameTime(prev => prev + 0.01);
            },10);
        }
        return () => clearInterval(interval);
    });

    return {
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
        gameTime,
        isCountingDown,
        count,
        updateDisplay,
        handleTokenClick,
        handleNumberTokenClick,
        handleRemove,
        handleClear,
        handleNewGame,
        handleLogout
    }
}