import styled from 'styled-components';

// Game number buttons
export const NumberButton = styled.button`
  width: 60px;
  height: 60px;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 24px;
  font-weight: bold;
  background: white;
  color: #1a1a1b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f4f4f4;
  }
`;

// Operator buttons (+, -, *, /, (, ))
export const OperatorButton = styled.button`
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  background: #818384;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #6e6e6e;
  }
`;

// Control buttons (Clear, Undo, New Game, Quit)
export const ControlButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  background: #6aaa64;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  transition: all 0.2s;

  &:hover {
    background: #5c935c;
  }
`;

// Button container layouts
export const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;
  margin-bottom: 5px;
`;

export const OperatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  justify-items: center;
  margin-bottom: 10px;
`;

export const QuitButton = styled(ControlButton)`
  background: #dc3545;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  padding: 8px 16px;

  &:hover {
    background: #c82333;
  }
`;


export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin: 15px 0;
  justify-content: center;

  ${ControlButton} {
    flex: 1;
    max-width: 120px;  // Prevent buttons from getting too wide
  }
`;

