import React from "react";

import styles from "./Board.module.scss";

import Row from "@/components/board-components/Row/Row";
import {useGame} from "@/components/Game/GameProvider";

interface BoardProps {}

const Board : React.FC<BoardProps> = (props) => {
    const {board, handleBoardKeyPress } = useGame();

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleBoardTouch = () => {
        if (inputRef.current) {
            if ("focus" in inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    React.useEffect(() => {
        if (inputRef.current) {
            if ("focus" in inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, []);


    return(
        <div className={styles['board']} onClick={handleBoardTouch} >
            <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                tabIndex={0}
                className={styles['hidden-input']}
                inputMode={"text"}
                onKeyPress={handleBoardKeyPress}
            />
            {board.map((row, rowIndex) => (
                <Row key={rowIndex} rowIndex={rowIndex} rowData={row}/>
            ))}
        </div>
    );
}

export default Board;
