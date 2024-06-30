import React from "react";
import Board from "@/components/board-components/Board/Board";
import styles from "./Game.module.scss";
import Keyboard from "@/components/ui-components/Keyboard/Keyboard";

import {useSettings} from "@/components/Settings/SettingsProvider";
import SettingsIcon from '../../../public/settings.svg'
import Timer from "@/components/ui-components/Timer/Timer";
import GameOverPopup from "@/components/ui-components/Popup/GameOverPopup";
import Row from "@/components/board-components/Row/Row";
import {useGame} from "@/components/Game/GameProvider";
import CountDown from "@/components/ui-components/CountDown/CountDown";
import GiveUpButton from "@/components/ui-components/GiveUpButton/GiveUpButton";
import PulsingEffect from "@/components/ui-components/PulsingEffect/PulsingEffect";
import TopNavBar from "@/components/ui-components/TopNavBar/TopNavBar.tsx";

interface GameProps {}

const Game : React.FC<GameProps> = (props) => {
    const {openSettings} = useSettings();

    return(
        <div className={styles['main-container']}>
            <TopNavBar>
                <button className={styles['settings-button']} onClick={openSettings}>
                    <SettingsIcon className={styles['settings-icon']}/>
                </button>
                <HurdleTitle/>
            </TopNavBar>
            <div className={styles['game']}>
                <Timer/>
                <Board/>
                <GiveUpButton/>
                <Keyboard/>
                <GameOverPopup/>
                <CountDown/>
                <PulsingEffect/>
            </div>
        </div>

    );
}

export default Game;

const HurdleTitle = () => {

    const {featureState} = useGame();
    const wordle = 'hurdle'.toString()
    const rowData = wordle.split('').map((letter, index) => ({letter, status: 'correct'}));

    if (!featureState.showHurdleTitle){
        return null;
    }
    return (
        <div className={styles['title-row']}>
            <Row rowIndex={0} rowData={rowData} columnCount={rowData.length} isBoardRow={false} size={'s'}/>
        </div>
    )

}


