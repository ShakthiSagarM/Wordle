import React from "react";

import styles from "./Row.module.scss";

import Tile from "@/components/board-components/Tile/Tile.tsx";
import {useSettings} from "@/components/Settings/SettingsProvider";

interface RowProps {
    rowIndex: number;
    rowData: { letter: string, status: string }[];
    columnCount?: number;
    isBoardRow? : boolean;
}

const Row: React.FC<RowProps> = (props) => {
    const {settings} = useSettings();

    const { rowIndex, rowData, columnCount = 5  , isBoardRow = true} = props;

    const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, auto)` }

    return (
        <div key={rowIndex} className={styles['row']} style={gridStyle}
        >
            {rowData.map((tile, colIndex) => (
                <Tile key={colIndex} letter={tile.letter} status={tile.status} index={colIndex}  isBoardTile={isBoardRow}/>
            ))}
        </div>
    );
}

export default Row;
