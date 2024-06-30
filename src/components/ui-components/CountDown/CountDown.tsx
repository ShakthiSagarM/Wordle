import React from "react";
import styles from "./CountDown.module.scss";
import { useGame } from "@/components/Game/GameProvider";
import {useSettings} from "@/components/Settings/SettingsProvider";

const CountDown: React.FC = () => {
    const {config, timeLeft, featureState, isGameOver } = useGame();
    const {settings} = useSettings();


    const numbers = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten"
    ];

    const timeLeftInSec= timeLeft/1000;


    React.useEffect(() => {
        const directions = [
            // { start: [-100, 0], end: [100, 0] },    // Left to Right
            // { start: [100, 0], end: [-100, 0] },    // Right to Left
            { start: [0, -100], end: [0, 100] },    // Top to Bottom
            // { start: [0, 100], end: [0, -100] },    // Bottom to Top
            // { start: [-100, -100], end: [100, 100] }, // Top-Left to Bottom-Right
            // { start: [100, 100], end: [-100, -100] }, // Bottom-Right to Top-Left
            // { start: [100, -100], end: [-100, 100] }, // Top-Right to Bottom-Left
            // { start: [-100, 100], end: [100, -100] }  // Bottom-Left to Top-Right
        ];

        const setRandomSpawnPosition = () => {
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            const { start, end } = randomDirection;

            document.documentElement.style.setProperty('--spawn-pos-x', `${start[0]}vw`);
            document.documentElement.style.setProperty('--spawn-pos-y', `${start[1]}vh`);
            document.documentElement.style.setProperty('--despawn-pos-x', `${end[0]}vw`);
            document.documentElement.style.setProperty('--despawn-pos-y', `${end[1]}vh`);
        };


        setRandomSpawnPosition();

        const interval = setInterval(setRandomSpawnPosition, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);


    if (!featureState.showCountDown || timeLeft >  config.countDownStartFrom || timeLeft === 0 || isGameOver) {
        return null;
    }
    return (
        <div className={styles['countdown-container']}>
            <div className={styles['countdown-text']}>
                {numbers[timeLeftInSec].toUpperCase()}
            </div>
        </div>
    );
};

export default CountDown;
