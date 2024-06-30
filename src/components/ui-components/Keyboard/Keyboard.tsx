import React from 'react';
import Tile from '@/components/board-components/Tile/Tile.tsx';
import styles from './Keyboard.module.scss';
import { useGame } from '@/components/Game/GameProvider';
import { useSettings } from '@/components/Settings/SettingsProvider';

interface KeyboardProps {}

const Keyboard: React.FC<KeyboardProps> = (props) => {
  const { keyBoardData, featureState } = useGame();

  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  if (!featureState.showKeyBoard) {
    return null;
  }

  return (
    <div className={styles['keyboard']}>
      {rows.map((rowKeys, index) => (
        <div key={index} className={styles[`keyboard-row-${index}`]}>
          {rowKeys.map((key, index) => (
            <Tile key={index} letter={key} status={keyBoardData[key]} isBoardTile={true} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
