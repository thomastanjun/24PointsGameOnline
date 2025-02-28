import styled from 'styled-components';


//Login Page
export const LoginContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 20px;
`;

export const GameTitle = styled.h1`
    font-size: 4rem;
    color: #fff;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const SubTitle = styled.p`
    font-size: 1.2rem;
    color: #e2e8f0;
    margin-bottom: 2rem;
`;

export const Card = styled.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
`;

export const WelcomeText = styled.h2`
    text-align: center;
    color: #2d3748;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Label = styled.label`
    color: #4a5568;
    font-size: 0.9rem;
`;

export const LoginInput = styled.input`
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #4299e1;
    }
`;

export const SubmitButton = styled.button`
    background: #4299e1;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;

    &:hover {
        background: #3182ce;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const GameRules = styled.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
`;

export const RulesTitle = styled.h3`
    color: #2d3748;
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

export const RulesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Rule = styled.p`
    color: #4a5568;
    font-size: 0.9rem;
`;

// Online Players Number Display

export const OnlinePlayersBox = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const OnlineDot = styled.div`
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;

export const OnlineCount = styled.span`
    color: #1f2937;
    font-weight: 500;
`;

//




export const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #2a2a2a;
`;

export const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const FormulaDisplay = styled.div`
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  font-size: 18px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #e0e0e0;
  color: #333;
  word-break: break-word;
  margin: 10px 0;
`;

export const ResultDisplay = styled.div`
  background: #e6f7ff;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: 1px solid #91d5ff;
  color: #0050b3;
  margin: 5px 0 15px 0;
`;

export const Input = styled.input`
  padding: 10px;
  width: 200px;
  border: 2px solid #d3d6da;
  border-radius: 4px;
  font-size: 16px;
`;


export const WinnerDisplay = styled.div`
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h2 {
      color: #52c41a;
      margin-top: 0;
      margin-bottom: 16px;
  }

  div {
      margin-bottom: 8px;
  }
`;

export const WinnerFormula = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 12px 0;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  color: #333;
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

export const GameAreaSingle = styled.div`
  display: flex;
  Justrify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

export const GameAreaMulti = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  padding: 0;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
  }
`;


export const CurrentPlayerAreaSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CurrentPlayerAreaMulti = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

export const OtherPlayersArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
`;

export const OtherPlayersHeader = styled.h3`
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
  color: #333;
`;


export const PlayerCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PlayerHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  color: #1a1a1a;
`;

export const GameTimer = styled.div`
    background: #f0f0f0;
    color: #333;
    padding: 8px 16px;
    border-radius: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
`;
export const CountdownOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 6rem;
  font-weight: bold;
  color: #0066cc;
  animation: pulse 1s infinite;

  @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
  }
`;

export const RevealingNumber = styled.div<{ delay: number, isRevealed: boolean }>`
    animation: ${props => props.isRevealed ? 'flipIn 0.5s ease-out forwards' : 'none'};
    animation-delay: ${props => props.delay}s;
    opacity: ${props => props.isRevealed ? 1 : 0};
    transform: rotateY(90deg);
    
    @keyframes flipIn {
        from { transform: rotateY(90deg); opacity: 0; }
        to { transform: rotateY(0deg); opacity: 1; }
    }
`;