import React from 'react';
import Tile from '@/components/board-components/Tile/Tile.tsx';
import styles from './Keyboard.module.scss';
import { useGame } from '@/components/Game/GameProvider';

interface KeyboardProps {}

const Keyboard: React.FC<KeyboardProps> = () => {
  const { keyBoardData, featureState } = useGame();

  const rowKeyValuesArray: { key: string; value: string }[][] = [
    [
      { key: 'q', value: 'q' },
      { key: 'w', value: 'w' },
      { key: 'e', value: 'e' },
      { key: 'r', value: 'r' },
      { key: 't', value: 't' },
      { key: 'y', value: 'y' },
      { key: 'u', value: 'u' },
      { key: 'i', value: 'i' },
      { key: 'o', value: 'o' },
      { key: 'p', value: 'p' },
    ],
    [
      { key: 'a', value: 'a' },
      { key: 's', value: 's' },
      { key: 'd', value: 'd' },
      { key: 'f', value: 'f' },
      { key: 'g', value: 'g' },
      { key: 'h', value: 'h' },
      { key: 'j', value: 'j' },
      { key: 'k', value: 'k' },
      { key: 'l', value: 'l' },
    ],
    [
      { key: '↲', value: 'Enter' },
      { key: 'z', value: 'z' },
      { key: 'x', value: 'x' },
      { key: 'c', value: 'c' },
      { key: 'v', value: 'v' },
      { key: 'b', value: 'b' },
      { key: 'n', value: 'n' },
      { key: 'm', value: 'm' },
      { key: '⌫', value: 'Backspace' },
    ],
  ];

  return (
    <div className={styles['keyboard']}>
      {rowKeyValuesArray.map((rowKeyValues, index) => (
        <div key={index} className={styles[`keyboard-row-${index}`]}>
          {rowKeyValues.map((rowKeyValue, index) => (
            <Tile
              key={index}
              letter={rowKeyValue.key}
              value={rowKeyValue.value}
              status={keyBoardData[rowKeyValue.key]}
              isBoardTile={false}
              isKeyBoardTile={true}
              showColors={featureState.showKeyBoardColors}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
