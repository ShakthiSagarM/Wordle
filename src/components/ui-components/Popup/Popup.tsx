import React, {JSX} from "react";
import styles from "./Popup.module.scss";

interface PopupProps {
     message : JSX.Element;
     info? : JSX.Element;
     buttons : {label: string, onClick: () => void}[];
     backdrop?: boolean;
}

const Popup : React.FC<PopupProps> = (props) => {
    const {message, buttons,backdrop = false,info} = props;

    return (
        <div className={backdrop? styles[`backdrop`] : ''}>
            <div className={styles['popup']}>
                <div className={styles['popup-message']}>{message}</div>
                {info? <span className={styles['popup-info']}>{info}</span> : null}
                <div className={styles['popup-button-container']}>
                    {buttons.map((tile, index) => (
                        <button className={styles['popup-button']} key={index}
                                onClick={tile.onClick}>{tile.label}</button>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Popup;
