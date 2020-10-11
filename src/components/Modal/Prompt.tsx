import Button, { ButtonType } from '../UI/Button/Button';
import React, { useEffect, useState } from 'react';

import { BaseDialogProps } from '../../utils/types';
import Modal from './Modal';
import styles from './Modal.module.scss';

interface PromptDialogProps extends BaseDialogProps<string> {
    defaultValue?: string;
    okButtonText?: string;
    isRequired?: boolean;
    cancelButtonText?: string;
    errorText?: string;
}

export function PromptDialog(props: PromptDialogProps): JSX.Element | null {
    const [isOpen, setOpen] = useState(true);
    const [isError, setError] = useState<boolean>(false);
    const dialogUniqId = (~~(Math.random() * 1e8)).toString(16);

    const defaultValue = props.defaultValue !== undefined ? String(props.defaultValue) : undefined;
    const [value, setValue] = useState<string>(defaultValue);

    const close = (result: string | undefined) => {
        setOpen(false);

        if (props.onClose) {
            props.onClose(result);
        }
    };

    useEffect(() => {
        if (props.isRequired && value !== undefined) {
            value.trim() === '' ? setError(true) : setError(false);
        }
    }, [value, props]);

    return (
        <Modal
            className={styles.alert}
            isOpen={isOpen}
            labelledby={`header_${dialogUniqId}`}
            describedby={`content_${dialogUniqId}`}
            onAttemptClose={() => close(undefined)}
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
                <input
                    type="text"
                    className={!isError ? styles.promtInput : styles.promtErrorInput}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    defaultValue={value}
                    name="promtDialog"
                    autoFocus={true}
                />
                <div className={styles.promtErrorText}>
                    {(isError && props.errorText) ?? 'Value input required'}
                </div>
            </div>

            <div className={styles.modalButtonPlace}>
                <Button
                    onClick={() => {
                        if (props.isRequired && (!value || value.trim() === '')) {
                            setError(true);
                        } else {
                            close(value);
                        }
                    }}
                >
                    {props.okButtonText || 'Ok'}
                </Button>
                <Button
                    onClick={() => {
                        close(undefined);
                    }}
                    type={ButtonType.LIGHT}
                >
                    {props.cancelButtonText || 'Cancel'}
                </Button>
            </div>
        </Modal>
    );
}
