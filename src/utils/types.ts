export interface Settings {
    theme: Theme;
    animation: boolean;
    difficulty: DifficultyLevel;
}

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    size?: ToastSize;
}

export const themes = ['light', 'dark'] as const;
export type Theme = typeof themes[number];

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastSize = 's' | 'm' | 'l';

export enum GameStatus {
    Started = "started",
    Won = "won",
    Lost = "lost",
    TimeUp = "time-up",
    Waiting = "waiting",
}

export enum TileStatus {
    PRESENT = 'present',
    CORRECT = 'correct',
    ABSENT = 'absent',
    EMPTY = 'empty',
}

export const tileStatusToColorMap: Record<TileStatus, string> = {
    [TileStatus.PRESENT]: "orange",
    [TileStatus.CORRECT]: "green",
    [TileStatus.ABSENT]: "red",
    [TileStatus.EMPTY]: "grey",
};

export const getInMilliSeconds = (seconds : number) =>{
    return seconds * 1000;
}

export type Feature = 'countDown' | 'keyBoard' | 'hurdleTitle' | 'timer' | 'flyingTiles' | 'giveUpButton' | 'pulsingEffect' | 'blurredTiles';

export type FeatureState = {
    showCountDown: boolean;
    showKeyBoard: boolean;
    showHurdleTitle: boolean;
    showTimer: boolean;
    isFlyingTiles: boolean;
    showGiveUpButton: boolean;
    showPulsingEffect: boolean;
    isBlurredTiles: boolean;
};

export const featureStateKeys: Record<Feature, keyof FeatureState> = {
    countDown: 'showCountDown',
    keyBoard: 'showKeyBoard',
    hurdleTitle: 'showHurdleTitle',
    timer: 'showTimer',
    flyingTiles: 'isFlyingTiles',
    giveUpButton: 'showGiveUpButton',
    pulsingEffect: 'showPulsingEffect',
    blurredTiles: 'isBlurredTiles',
};

export const initialFeatureState: FeatureState = {
    showCountDown: false,
    showKeyBoard: false,
    showHurdleTitle: false,
    showTimer: false,
    isFlyingTiles: false,
    showGiveUpButton: false,
    showPulsingEffect: false,
    isBlurredTiles: false,
};

export const difficultyLevels = ['easy', 'normal', 'hard','nightmare', 'hell'] as const;

export type DifficultyLevel = typeof difficultyLevels[number];

export type DifficultyLevelConfig = {
    features: Feature[];
    allowedTileColors: TileStatus[];
    timeLimit: number;
    timerWarningStartFrom: number;
    countDownStartFrom: number;
    giveUpButtonAppearFrom: number;
    pulsingEffectStartFrom: number;
}

export const difficultyConfig: Record<DifficultyLevel, DifficultyLevelConfig > = {
    easy: {
        features: ['hurdleTitle', 'keyBoard', 'giveUpButton'],
        allowedTileColors: [TileStatus.PRESENT, TileStatus.ABSENT, TileStatus.EMPTY, TileStatus.CORRECT],
        timeLimit: getInMilliSeconds( 0), //no time limit
        timerWarningStartFrom : getInMilliSeconds( 0),
        countDownStartFrom : getInMilliSeconds(0),
        giveUpButtonAppearFrom : getInMilliSeconds(0),
        pulsingEffectStartFrom : getInMilliSeconds(0),
    },
    normal: {
        features: ['keyBoard', 'hurdleTitle', 'timer','giveUpButton'],
        allowedTileColors: [TileStatus.PRESENT, TileStatus.ABSENT, TileStatus.EMPTY, TileStatus.CORRECT],
        timeLimit: getInMilliSeconds(180),
        timerWarningStartFrom : getInMilliSeconds( 30),
        countDownStartFrom : getInMilliSeconds(0),
        giveUpButtonAppearFrom : getInMilliSeconds(60),
        pulsingEffectStartFrom : getInMilliSeconds(0),
    },
    hard: {
        features: ['hurdleTitle', 'timer', 'giveUpButton'],
        timeLimit: getInMilliSeconds(60),
        allowedTileColors: [TileStatus.PRESENT, TileStatus.EMPTY, TileStatus.CORRECT],
        timerWarningStartFrom : getInMilliSeconds( 15),
        countDownStartFrom : getInMilliSeconds(0),
        giveUpButtonAppearFrom : getInMilliSeconds(30),
        pulsingEffectStartFrom : getInMilliSeconds(0),
    },
    nightmare:{
        features: ['hurdleTitle','timer', 'giveUpButton', 'blurredTiles', 'pulsingEffect'],
        allowedTileColors: [TileStatus.PRESENT, TileStatus.EMPTY, TileStatus.CORRECT],
        timeLimit: getInMilliSeconds(30),
        timerWarningStartFrom : getInMilliSeconds( 15),
        countDownStartFrom : getInMilliSeconds(0),
        giveUpButtonAppearFrom : getInMilliSeconds(10),
        pulsingEffectStartFrom : getInMilliSeconds(10),
    },
    hell: {
        features: ['countDown', 'timer', 'flyingTiles', 'pulsingEffect', 'blurredTiles', 'giveUpButton'],
        allowedTileColors: [TileStatus.PRESENT, TileStatus.EMPTY, TileStatus.CORRECT],
        timeLimit: getInMilliSeconds(30),
        timerWarningStartFrom : getInMilliSeconds( 30),
        countDownStartFrom : getInMilliSeconds(10),
        giveUpButtonAppearFrom : getInMilliSeconds( 10),
        pulsingEffectStartFrom : getInMilliSeconds(15),
    },
};


