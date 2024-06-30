import React from "react";
import styles from "./Timer.module.scss";
import { useGame } from "@/components/Game/GameProvider";

const Timer: React.FC = () => {
    const { config,isGameOver, timeLeft, setTimeLeft, featureState } = useGame();

    React.useEffect(() => {
        if (!featureState.showTimer){
            return ;
        }
        if (timeLeft <= 0) {
            setTimeLeft(0);
            return;
        }

        if (!isGameOver) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1000);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeLeft, isGameOver, setTimeLeft]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    if (!featureState.showTimer){
        return null;
    }

    return (
        <div className={`${styles['timer']} ${timeLeft <= config.timerWarningStartFrom ? styles['timer-warning'] : ""}`}>
            {formatTime(timeLeft)}
        </div>
    );
};

export default Timer;
