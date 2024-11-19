import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  
import ModeSelection from './pages/ModeSelection';
import RoomSelection from './pages/RoomSelection';
import GamePage from './pages/GamePage'; 
import { GameClientProvider } from './contexts/GameClientContext';

function App() {
  return (
    <BrowserRouter>
     <GameClientProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mode-selection" element={<ModeSelection />} />
        <Route path="/rooms" element={<RoomSelection />} />
        <Route path="/game/single" element={<GamePage />} />
        <Route path="/game/multi/:roomId" element={<GamePage />} />
      </Routes>
      </GameClientProvider>
    </BrowserRouter>
  );
}

export default App;
