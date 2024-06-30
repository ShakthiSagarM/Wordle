import React from 'react';
import styles from './GiveUpButton.module.scss';
import { useGame } from '@/components/Game/GameProvider';

const GiveUpButton: React.FC = () => {
  const { config, giveUp, featureState, timeLeft } = useGame();

  if (!featureState.showGiveUpButton || timeLeft > config.giveUpButtonAppearFrom) {
    return null;
  }

  return (
    <button className={`${styles['give-up-button']}`} onClick={giveUp}>
      {' '}
      Give Up?
    </button>
  );
};

export default GiveUpButton;
