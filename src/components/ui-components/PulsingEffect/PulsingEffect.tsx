import React from "react";
import styles from "./PulsingEffect.module.scss";
import {useGame} from "@/components/Game/GameProvider";

const PulsingEffect: React.FC = () => {
    const { config  ,featureState, timeLeft} = useGame();

    if (!featureState.showPulsingEffect || timeLeft > config.pulsingEffectStartFrom || timeLeft <=0){
        return null;
    }

    return (
        <div className={styles['pulsing-effect']}></div>
    )
};

export default PulsingEffect;
