import Button, { ButtonType } from '../Button/Button';
import React, { useEffect, useRef, useState } from 'react';

import { BaseDialogProps } from './types';
import Modal from './Modal';
import styles from './Modal.module.scss';

interface ConfirmDialogProps extends BaseDialogProps {
    okButtonText?: string;
    cancelButtonText?: string;
}

export const enum ConfirmDialogResult {
    OK = 'ok',
    CANCEL = 'cancel',
}

export function ConfirmDialog(props: ConfirmDialogProps): JSX.Element | null {
    const [isOpen, setOpen] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>();

    const close = (result: string) => {
        setOpen(false);

        if (props.onClose) {
            props.onClose(result);
        }
    };

    useEffect(() => {
        buttonRef.current?.focus();
    }, []);

    return (
        <Modal
            className={styles.alert}
            isOpen={isOpen}
            onCompletelyHidden={() => {
                if (props.onCompletelyHidden) {
                    props.onCompletelyHidden();
                }
            }}
        >
            {props.title && <div className={styles.modalTitle}>{props.title}</div>}
            <div className={styles.modalContent}>{props.body}</div>
            <div className={styles.modalButtonPlace}>
                <Button
                    onClick={() => {
                        close(ConfirmDialogResult.OK);
                    }}
                    ref={buttonRef}
                >
                    {props.okButtonText || 'Ok'}
                </Button>
                <Button
                    onClick={() => {
                        close(ConfirmDialogResult.CANCEL);
                    }}
                    type={ButtonType.LIGHT}
                >
                    {props.cancelButtonText || 'Cancel'}
                </Button>
            </div>
        </Modal>
    );
}
