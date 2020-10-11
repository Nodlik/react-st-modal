import React, { useState } from 'react';

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
    const dialogUniqId = (~~(Math.random() * 1e8)).toString(16);

    const close = () => {
        setOpen(false);

        if (props.onClose) {
            props.onClose();
        }
    };
    return (
        <Modal
            className={styles.alert}
            isOpen={isOpen}
            labelledby={`header_${dialogUniqId}`}
            describedby={`content_${dialogUniqId}`}
            onAttemptClose={close}
            onCompletelyHidden={() => {
                if (props.onCompletelyHidden) {
                    props.onCompletelyHidden();
                }
            }}
        >
            {props.title && (
                <h3 className={styles.modalTitle} id={`header_${dialogUniqId}`}>
                    {props.title}
                </h3>
            )}
            <div className={styles.modalContent} id={`content_${dialogUniqId}`}>
                {props.body}
            </div>
            <div className={styles.modalButtonPlace}>
                <Button onClick={close} autoFocus={true}>
                    {props.buttonText || 'Ok'}
                </Button>
            </div>
        </Modal>
    );
}
