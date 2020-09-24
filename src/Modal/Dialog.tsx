import React, { useEffect, useState } from 'react';

import Modal from './Modal';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

function getDialogPlace(): HTMLElement {
    let result = document.getElementById('stfMountedDialogPlace');

    if (!result) {
        result = document.createElement('div');
        result.setAttribute('id', 'stfMountedDialogPlace');
        document.body.appendChild(result);
    }

    return result;
}

interface DialogProps {
    children?: React.ReactNode;
    showCloseIcon?: boolean;
    closeAction?: () => void;
    title?: string;
    isOpen?: boolean;
}

export default function Dialog(props: DialogProps): JSX.Element {
    const [isHidden, setIsHidden] = useState(props.isOpen);

    useEffect(() => {
        setIsHidden(props.isOpen);
    }, [props.isOpen]);

    const close = () => {
        setIsHidden(false);
    };

    return ReactDOM.createPortal(
        <Modal className={styles.alert} isOpen={isHidden} isStatic={true}>
            {props.showCloseIcon && (
                <button className={styles.modalCloseIcon} onClick={props.closeAction || close}>
                    <CloseIcon />
                </button>
            )}
            {props.title && <div className={styles.modalTitle}>{props.title}</div>}
            <div className={styles.modalContent}>{props.children}</div>
        </Modal>,
        getDialogPlace()
    );
}

function CloseIcon() {
    return (
        <svg height="512px" viewBox="0 0 512 512" width="512px">
            <path
                d={
                    'M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  ' +
                    'c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9' +
                    'c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z'
                }
            />
        </svg>
    );
}
