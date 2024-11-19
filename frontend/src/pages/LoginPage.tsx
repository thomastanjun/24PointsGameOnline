import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameClient from '../services/GameClient';
import { GameClientContext } from '../contexts/GameClientContext';

const LoginPage = () => {
    const { setGameClient } = useContext(GameClientContext);
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim()) {
            const client = new GameClient(playerName);
            setGameClient(client);
            console.log("LoginPage Player: ", client.getPlayerName());

            navigate('/mode-selection');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;