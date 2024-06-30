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

interface GameProps {}

const Game : React.FC<GameProps> = (props) => {
    const {openSettings} = useSettings();

    return(
        <div className={styles['main-container']}>
            <div className={styles['game']}>
                <WordleTitle/>
                <Timer/>
                <Board />
                <GiveUpButton/>
                <Keyboard/>
                <GameOverPopup/>
                <CountDown/>
                <PulsingEffect/>
                <button className={styles['settings-button']} onClick={openSettings}>
                    <SettingsIcon className={styles['settings-icon']}/>
                </button>
            </div>
        </div>

    );
}

export default Game;

const WordleTitle = () => {

    const {featureState} = useGame();
    const wordle = 'wordle'.toString()
    const rowData = wordle.split('').map((letter, index) => ({letter, status: 'correct'}));

    if (!featureState.showWordleTitle){
        return null;
    }
    return (
        <div className={styles['title-row']}>
            <Row rowIndex={0} rowData={rowData} animated={true} columnCount={rowData.length} isBoardRow={false}/>

        </div>
    )

}


