import words from '@/utils/words';
import { Feature, FeatureState, featureStateKeys, initialFeatureState, Settings, TileStatus } from '@/utils/types';

export const getResult = (board: { letter: string; status: string }[][]) => {
  return board
    .map((row) =>
      row
        .map((tile) => {
          switch (tile.status) {
            case TileStatus.CORRECT:
              return `🟩`;
            case TileStatus.PRESENT:
              return `🟧`;
            case TileStatus.ABSENT:
              return `🟥`;
            default:
              return ``;
          }
        })
        .join('')
    )
    .join('\n');
};

export const copyToClipboard = (text: string) => {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
};

export const getTargetWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

export const getEmptyBoard = () => {
  return Array(6)
    .fill('')
    .map(() => Array(5).fill({ letter: '', status: TileStatus.EMPTY }));
};

export const getEmptyKeyBoard = (): Record<string, TileStatus> => {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i).toLowerCase()).reduce(
    (acc: Record<string, TileStatus>, key) => {
      acc[key] = TileStatus.EMPTY;
      return acc;
    },
    {}
  );
};

export const getDefaultSettings = (): Settings => {
  return { theme: 'dark', animation: false, difficulty: 'normal' };
};
