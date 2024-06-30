import React from "react";

import styles from "./Board.module.scss";

import Row from "@/components/board-components/Row/Row.tsx";
import {useGame} from "@/components/Game/GameProvider";

interface BoardProps {}

const Board : React.FC<BoardProps> = (props) => {
    const {board, handleBoardKeyPress } = useGame();

    const divRef = React.useRef(null);
    React.useEffect(() => {
        if (divRef.current) {
            divRef.current.focus();
        }
    }, [board]);

    return(
        <div className={styles['board']} tabIndex={0}  ref={divRef} onKeyDown={handleBoardKeyPress}>
            {board.map((row, rowIndex) => (
                <Row key={rowIndex} rowIndex={rowIndex} rowData={row}/>
            ))}
        </div>
    );
}

export default Board;
