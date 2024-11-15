import styled from 'styled-components';

export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

export const Header = styled.header`
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #d3d6da;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: #1a1a1b;
`;

export const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const FormulaDisplay = styled.div`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
  background: #f6f7f8;
`;

export const ResultDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1b;
  text-align: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  width: 200px;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 16px;
`;


export const WinnerDisplay = styled.div`
  background: #6aaa64;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const WinnerFormula = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

export const PlayerName = styled.div`
  font-size: 18px;
  color: #1a1a1b;
  margin-bottom: 10px;
`;

export const GameControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #d3d6da;
`;

