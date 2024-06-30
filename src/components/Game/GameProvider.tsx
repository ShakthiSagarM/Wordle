import React, { createContext, ReactNode, useContext } from 'react';
import { getEmptyBoard, getEmptyKeyBoard, getTargetWord } from '@/utils/utils';
import { useSettings } from '@/components/Settings/SettingsProvider';
import words from '@/utils/words';
import { useToast } from '@/components/ui-components/Toast/ToastProvider';
import {
  difficultyConfig,
  DifficultyLevelConfig,
  Feature,
  FeatureState,
  featureStateKeys,
  GameStatus,
  initialFeatureState,
  TileStatus,
} from '@/utils/types';

interface GameContextProps {
  config: DifficultyLevelConfig;

  targetWord: string;

  board: { letter: string; status: string }[][];
  handleBoardKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  keyBoardData: Record<string, string>;

  currentGameStatus: GameStatus;

  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;

  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;

  featureState: FeatureState;

  giveUp: () => void;

  resetGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { settings } = useSettings();

  const [config, setConfig] = React.useState<DifficultyLevelConfig>(difficultyConfig[settings.difficulty]);

  React.useEffect(() => {
    setConfig(difficultyConfig[settings.difficulty]);
  }, [settings.difficulty]);

  const { addToast } = useToast();

  const [targetWord, setTargetWord] = React.useState<string>(getTargetWord());

  // board
  const [board, setBoard] = React.useState(getEmptyBoard());
  const [currRow, setCurrRow] = React.useState<number>(0);
  const [currCol, setCurrCol] = React.useState<number>(0);

  // game status
  const [currentGameStatus, updateCurrentGameStatus] = React.useState<GameStatus>(GameStatus.Started);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

  // keyboard
  const [keyBoardData, setKeyBoardData] = React.useState<Record<string, TileStatus>>(getEmptyKeyBoard());

  // timer
  const [timeLimit, setTimeLimit] = React.useState<number>(config.timeLimit);
  const [timeLeft, setTimeLeft] = React.useState<number>(timeLimit);

  //feature state
  const [featureState, setFeatureState] = React.useState<FeatureState>(initialFeatureState);

  React.useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  React.useEffect(() => {
    if (timeLeft <= 0 && timeLimit !== 0) {
      updateCurrentGameStatus(GameStatus.TimeUp);
    }
  }, [timeLeft, timeLimit]);

  React.useEffect(() => {
    if (
      currentGameStatus === GameStatus.Won ||
      currentGameStatus === GameStatus.TimeUp ||
      currentGameStatus === GameStatus.Lost
    ) {
      setIsGameOver(true);
      setCurrRow(0);
      setCurrCol(0);
    } else {
      setIsGameOver(false);
    }
  }, [currentGameStatus]);

  const toggleFeaturesOnDifficultyLevels = (features: Feature[]) => {
    let newFeatureState: FeatureState = initialFeatureState;

    features.forEach((feature) => {
      const stateKey = featureStateKeys[feature];
      if (stateKey) {
        newFeatureState = {
          ...newFeatureState,
          [stateKey]: true,
        };
      }
    });
    setFeatureState(newFeatureState);
  };

  React.useEffect(() => {
    toggleFeaturesOnDifficultyLevels(config.features);
    setTimeLimit(config.timeLimit);
    resetGame();
  }, [config]);

  const resetGame = () => {
    setTargetWord(getTargetWord());
    setBoard(getEmptyBoard());
    setKeyBoardData(getEmptyKeyBoard());
    updateCurrentGameStatus(GameStatus.Started);
    setCurrCol(0);
    setCurrRow(0);
    setTimeLeft(timeLimit);
  };

  const giveUp = () => {
    updateCurrentGameStatus(GameStatus.Lost);
  };

  React.useEffect(() => {
    const newKeysData = { ...keyBoardData };
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status !== 'empty') {
          newKeysData[tile.letter] = tile.status;
        }
      });
    });
    setKeyBoardData(newKeysData);
  }, [board]);

  const handleBoardKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if (currentGameStatus === GameStatus.Started) {
      if (key >= 'a' && key <= 'z') {
        if (currCol < 5) {
          const newBoard = [...board];
          newBoard[currRow][currCol] = { letter: key, status: 'empty' };
          setBoard(newBoard);
          setCurrCol(currCol + 1);
        }
      } else if (key === 'Backspace') {
        if (currCol > 0) {
          const newBoard = [...board];
          newBoard[currRow][currCol - 1] = { letter: '', status: TileStatus.EMPTY };
          setBoard(newBoard);
          setCurrCol(currCol - 1);
        }
      } else if (key === 'Enter') {
        if (currCol === 5) {
          const newBoard = [...board];
          const guess = newBoard[currRow].map((tile) => tile.letter).join('');
          if (!words.includes(guess)) {
            addToast('Please enter a valid word!', 'error', 'm');
            return;
          }
          for (let i = 0; i < 5; i++) {
            if (guess[i] === targetWord[i]) {
              newBoard[currRow][i].status = TileStatus.CORRECT;
            } else if (targetWord.includes(guess[i])) {
              newBoard[currRow][i].status = TileStatus.PRESENT;
            } else {
              newBoard[currRow][i].status = TileStatus.ABSENT;
            }
          }
          setBoard(newBoard);
          setCurrRow(currRow + 1);
          setCurrCol(0);

          if (guess === targetWord) {
            updateCurrentGameStatus(GameStatus.Won);
            setCurrCol(0);
            setCurrRow(0);
          } else if (currRow === 5) {
            updateCurrentGameStatus(GameStatus.Lost);
            setCurrCol(0);
            setCurrRow(0);
          }
        }
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        config,
        targetWord,
        board,
        handleBoardKeyPress,
        keyBoardData,
        featureState,
        currentGameStatus,
        isGameOver,
        setIsGameOver,
        timeLeft,
        setTimeLeft,
        giveUp,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
