import React, { useEffect, useRef, useState } from 'react';

import { BaseDialogProps } from '../../utils/types';
import Button from '../UI/Button/Button';
import Modal from './Modal';
import styles from './Modal.module.scss';

interface AlertDialogProps extends BaseDialogProps<void> {
    buttonText?: string;
    body?: string | JSX.Element;
}

export function AlertDialog(props: AlertDialogProps): JSX.Element | null {
    const [isOpen, setOpen] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>();

    const close = () => {
        setOpen(false);

        if (props.onClose) {
            props.onClose();
        }
    };

    useEffect(() => {
        buttonRef.current?.focus();
    }, []);

    return (
        <Modal
            className={styles.alert}
            isOpen={isOpen}
            onAttemptClose={close}
            onCompletelyHidden={() => {
                if (props.onCompletelyHidden) {
                    props.onCompletelyHidden();
                }
            }}
        >
            {props.title && <div className={styles.modalTitle}>{props.title}</div>}
            <div className={styles.modalContent}>{props.body}</div>
            <div className={styles.modalButtonPlace}>
                <Button onClick={close} ref={buttonRef}>
                    {props.buttonText || 'Ok'}
                </Button>
            </div>
        </Modal>
    );
}
