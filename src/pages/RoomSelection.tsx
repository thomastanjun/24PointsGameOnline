
import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameClient from '../services/GameClient';
import { GameClientContext } from '../contexts/GameClientContext';
import {Rooms, RoomInfo} from '../GameDefinitions';
import { useGameExit } from '../hooks/useGameExit';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const RoomList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RoomCard = styled.div`
  padding: 15px;
  border: 1px solid #d3d6da;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background: #f4f4f4;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #6aaa64;
  color: white;
  cursor: pointer;
  
  &:hover {
    background: #5c935c;
  }
`;

const RoomSelection: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const { client } = useContext(GameClientContext);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (client) {
      interval = setInterval(async () => {
        const response = await client.fetchRooms();
        if (response.status === 'Empty') {
          setRooms([]);
          return;
        } else {
          console.log("RoomList: ", response.status);
          console.log("RoomListLength: ", response.roomList.length);
          setRooms(response.roomList);}
      }, 1000);}

      return () => clearInterval(interval);
    
  }, [client]);

  const handleRoomClick = async (roomID: string) => {
    if (!client) return;
    try {
      const response = await client.joinGame(roomID);
      navigate(`/game/multi/${roomID}`);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const createRoom = async (maxPlayer: string) => {
    if (!client) return;
    try {
      const roomID = await client.createRoom(maxPlayer);
      await client.joinGame(roomID);
      navigate(`/game/multi/${roomID}`, {
        state: { 
         mode: 'multi' } });

    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const renderRooms = () => {
    if (rooms.length === 0) {
      return <p>No rooms available</p>;
    }
    return rooms.map((room: RoomInfo) => (
      <RoomCard key={room.roomID}>
        <div>
          <h3>Room {room.roomID}</h3>
          <p>Host: {room.hostPlayer}</p>
          <p>Available Seats: {room.vacancySeats}</p>
        </div>
        <Button onClick={() => handleRoomClick(room.roomID)}>
          Join Room
        </Button>
      </RoomCard>
    ));
  };

  useGameExit(client);

  return (
    <Container>
      <h1>Game Rooms</h1>
      <Button onClick={() => createRoom("8")}>Create New Room</Button>
      
      <RoomList>
        {renderRooms()}
      </RoomList>
    </Container>
  );
};

export default RoomSelection;