import Button, { ButtonType } from '../UI/Button/Button';
import React, { useState } from 'react';

import { BaseDialogProps } from '../../utils/types';
import Modal from './Modal';
import styles from './Modal.module.scss';

interface ConfirmDialogProps extends BaseDialogProps<string> {
    okButtonText?: string;
    cancelButtonText?: string;
    body?: string | JSX.Element;
}

export const enum ConfirmDialogResult {
    OK = 'ok',
    CANCEL = 'cancel',
}

export function ConfirmDialog(props: ConfirmDialogProps): JSX.Element {
    const [isOpen, setOpen] = useState(true);
    const dialogUniqId = (~~(Math.random() * 1e8)).toString(16);

    const close = (result: string) => {
        setOpen(false);

        if (props.onClose) {
            props.onClose(result);
        }
    };

    return (
        <Modal
            className={styles.alert}
            isOpen={isOpen}
            labelledby={`header_${dialogUniqId}`}
            describedby={`content_${dialogUniqId}`}
            onAttemptClose={() => close(ConfirmDialogResult.CANCEL)}
            onCompletelyHidden={() => {
                if (props.onCompletelyHidden) {
                    props.onCompletelyHidden();
                }
            }}
        >
            {props.title && (
                <div className={styles.modalTitle} id={`header_${dialogUniqId}`}>
                    {props.title}
                </div>
            )}
            <div className={styles.modalContent} id={`content_${dialogUniqId}`}>
                {props.body}
            </div>
            <div className={styles.modalButtonPlace}>
                <Button
                    onClick={() => {
                        close(ConfirmDialogResult.OK);
                    }}
                >
                    {props.okButtonText || 'Ok'}
                </Button>
                <Button
                    onClick={() => {
                        close(ConfirmDialogResult.CANCEL);
                    }}
                    autoFocus={true}
                    type={ButtonType.LIGHT}
                >
                    {props.cancelButtonText || 'Cancel'}
                </Button>
            </div>
        </Modal>
    );
}
