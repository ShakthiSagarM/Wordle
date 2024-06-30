import React from 'react';
import styles from './Toast.module.scss';
import {useToast} from "@/components/ui-components/Toast/ToastProvider";
import CloseIcon from '../../../../public/close.svg'

const Toast: React.FC = () => {
    const { toasts,removeToast } = useToast();
    return (
        <div className={styles['toast-container']}>
            {toasts.map(toast => (
                <div key={toast.id} className={`${styles.toast} ${styles[`toast-${toast.type}`]} ${styles[`toast-${toast.size}`]}`}>
                    {toast.message}
                    <button className={styles['toast-close-button']} onClick={() => removeToast(toast.id)}>
                        <CloseIcon/>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;
