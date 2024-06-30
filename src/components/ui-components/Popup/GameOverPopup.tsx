import React from "react";
import {copyToClipboard, getResult} from "@/utils/utils";
import {useGame} from "@/components/Game/GameProvider";
import Popup from "@/components/ui-components/Popup/Popup";
import {useToast} from "@/components/ui-components/Toast/ToastProvider";
import Row from "@/components/board-components/Row/Row";
import {GameStatus} from "@/utils/types";

interface GameOverPopupProps {}

const GameOverPopup : React.FC<GameOverPopupProps> = (props) => {
    const {board, targetWord,isGameOver, currentGameStatus, resetGame} = useGame();
    const {addToast} = useToast();
    const results = isGameOver ? getResult(board) : '';
    const message = (currentGameStatus === GameStatus.Won ? 'You won!' : currentGameStatus === GameStatus.Lost? 'You lost!' : 'Time up!') + ' The word was \n \n' ;

    const popupButtons = [
        {
            label: 'Play Again',
            onClick: ()=>{
                resetGame();
            }
        },
        {
            label: 'Share Results',
            onClick: () => {
                copyToClipboard(results);
                addToast('Wordle Mosaic copied to clipboard.' , 'success', 'm')
            }
        }
    ];

    const targetWordRow =  (
        <Row
            rowIndex={0}
            rowData={targetWord.split('').map((letter, index) => ({ letter, status: 'correct' }))}
            columnCount={targetWord.length}
            floating={true}
            isBoardRow={false}
        />
    )

    const popupMessage = (
        <>
            {message}
            {targetWordRow}
        </>
    );

    return (
        <>
            {isGameOver && (
                <Popup message={popupMessage} info={results} buttons={popupButtons} backdrop={true}/>
            )}
        </>
    );
}

export default GameOverPopup;
