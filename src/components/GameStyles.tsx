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
  max-width: 1200px;
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

export const GameAreaSingle = styled.div`
  display: flex;
  Justrify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

export const GameAreaMulti = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;  
  gap: 20px;
  margin-top: 20px;
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
  padding: 20px;
  border-right: 2px solid #d3d6da;
`;

export const OtherPlayersArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PlayerCard = styled.div`
  padding: 15px;
  border: 1px solid #d3d6da;
  border-radius: 8px;
  background: #f8f9fa;
`;

export const PlayerHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1b;
  margin-bottom: 10px;
`;
