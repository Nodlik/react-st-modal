import Button, { ButtonType } from '../Button/Button';
import React, { useEffect, useRef, useState } from 'react';

import { BaseDialogProps } from './types';
import Modal from './Modal';
import styles from './Modal.module.scss';

interface PromptDialogProps extends BaseDialogProps {
    defaultValue?: string;
    okButtonText?: string;
    isRequired?: boolean;
    cancelButtonText?: string;
    errorText?: string;
}

export function PromptDialog(props: PromptDialogProps): JSX.Element | null {
    const [isOpen, setOpen] = useState(true);
    const [isError, setError] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.defaultValue);

    const buttonRef = useRef<HTMLButtonElement>();

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

            <div className={styles.modalContent}>
                <input
                    type="text"
                    className={!isError ? styles.promtInput : styles.promtErrorInput}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    defaultValue={value}
                    name="promtDialog"
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
                    ref={buttonRef}
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
