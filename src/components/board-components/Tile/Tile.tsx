import React, { CSSProperties } from 'react';
import styles from './Tile.module.scss';
import { useSettings } from '@/components/Settings/SettingsProvider';
import { useGame } from '@/components/Game/GameProvider';
import { TileStatus, tileStatusToColorMap } from '@/utils/types';

interface TileProps {
  letter: string;
  status: string;
  size?: 's' | 'm' | 'l';
  index?: number;
  isBoardTile: boolean;
}

const Tile: React.FC<TileProps> = (props) => {
  const { letter, status, size = 'm', index = 0, isBoardTile = true } = props;

  const { settings } = useSettings();

  const { config, featureState } = useGame();

  const divRef = React.useRef(null);

  const [position, setPosition] = React.useState<[number, number]>();

  const enableFlying = isBoardTile && featureState.isFlyingTiles && status !== 'empty';

  const enableBlurring = isBoardTile && featureState.isBlurredTiles && status !== 'empty';

  const enableFloating = !isBoardTile && settings.animation;

  React.useEffect(() => {
    if (enableFlying) {
      const getRandomPosition = (): [number, number] | undefined => {
        const h = window.innerHeight - 50;
        const w = window.innerWidth - 50;
        const nh = Math.floor(Math.random() * h);
        const nw = Math.floor(Math.random() * w);
        return [nh, nw];
      };

      const moveTile = () => {
        setPosition(getRandomPosition() || undefined);
      };

      moveTile(); // Initial move
      const interval = setInterval(moveTile, 1000); // Move every second

      return () => clearInterval(interval);
    }
  }, [enableFlying]);

  const getTileColorByStatus = (status: TileStatus) => {
    if (config.allowedTileColors.includes(status)) {
      return tileStatusToColorMap[status];
    }
    return tileStatusToColorMap[TileStatus.EMPTY];
  };

  const bgColorStyle: CSSProperties = {
    backgroundColor: getTileColorByStatus(status as TileStatus),
  };

  const floatingStyle: CSSProperties = enableFloating
    ? {
        animationDelay: `${index * 0.1}s`,
        animationName: styles['grow'],
        animationDuration: '1s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
      }
    : {};

  const flyingStyle: CSSProperties =
    enableFlying && position && position[0] && position[1]
      ? {
          position: 'absolute',
          top: `${position[0]}px`,
          left: `${position[1]}px`,
          transition: 'top 2s ease-in-out, left 2s ease-in-out',
          zIndex: 100,
        }
      : {};

  const [blurringStyle, setBlurringStyle] = React.useState<CSSProperties>({});

  React.useEffect(() => {
    if (enableBlurring) {
      const timeout = setTimeout(() => {
        setBlurringStyle({
          filter: 'blur(3.5px)',
        });
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setBlurringStyle({});
    }
  }, [enableBlurring]);

  const style = { ...bgColorStyle, ...flyingStyle, ...floatingStyle, ...blurringStyle };

  return (
    <div className={`${styles.tile} ${styles[`tile-${size}`]}`} ref={divRef} style={style}>
      {letter.toUpperCase()}
    </div>
  );
};

export default Tile;
