import React from 'react';
import { useContext } from 'react';
import { GameClientContext } from '../contexts/GameClientContext';

import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GameClient from '../services/GameClient';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  color: #1a1a1b;
  margin-bottom: 30px;
`;

const ModeButton = styled.button`
  width: 200px;
  padding: 20px;
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
  background: white;
  border: 2px solid #d3d6da;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f4f4f4;
    transform: translateY(-2px);
  }
`;

const ModeDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;


const ModeSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location state: ", location.state);
  
  const { client } = useContext(GameClientContext);


  const handleSingleMode = async() => {
    console.log("ModeSelection Player: ", client?.getPlayerName());
    if (!client) {
      return;
    }
    const roomID = await client.createRoom();
    await client.joinGame(roomID);
    navigate('/game/single', {
       state: { 
        mode: 'single' } });
  };

  const handleMultiMode = (isSinglePlayer: boolean) => {
    console.log("ModeSelection Player: ", client?.getPlayerName());
    navigate('/game/single', {
       state: { 
        mode: 'single' } });
  };

  return (
    <Container>
      <Title>Select Game Mode</Title>
      <div>
        <ModeButton onClick={() => handleSingleMode()}>
          Single Player
          <ModeDescription>Practice by yourself</ModeDescription>
        </ModeButton>
        
        <ModeButton onClick={() => handleMultiMode(false)}>
          Multiplayer
          <ModeDescription>Compete with other players</ModeDescription>
        </ModeButton>
      </div>
    </Container>
  );
};

export default ModeSelection;