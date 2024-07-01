import React, { useMemo } from 'react';
import styles from './PulsingEffect.module.scss';
import { useGame } from '@/components/Game/GameProvider';

const PulsingEffect: React.FC = () => {
  const { config, featureState, timeLeft, isGameOver } = useGame();

  const pulsingSize = useMemo(() => {
    const maxSize = 20;
    const minSize = 5;
    const sizeRange = maxSize - minSize;
    const adjustedSize = minSize + sizeRange * (1 - timeLeft / config.pulsingEffectStartFrom);
    return `${adjustedSize}rem`;
  }, [timeLeft, config.pulsingEffectStartFrom]);

  if (!featureState.showPulsingEffect || timeLeft > config.pulsingEffectStartFrom || timeLeft <= 0 || isGameOver) {
    return null;
  }

  return (
    <div className={styles['pulsing-effect']} style={{ '--pulsing-size': pulsingSize } as React.CSSProperties}></div>
  );
};

export default PulsingEffect;
