import { DialogContext, DialogContextType } from '../../context/DialogContextProvider';
import React, { useContext, useEffect } from 'react';

import { BaseDialogProps } from '../../utils/types';
import Modal from './Modal';
import styles from './Modal.module.scss';

export interface DialogProps<T> extends BaseDialogProps<T> {
    children?: React.ReactNode;
    showCloseIcon?: boolean;
    className?: string;
    onAfterClose?: (result?: T) => void;
    onAfterOpen?: () => void;
    isCanClose?: boolean;
    isOpen?: boolean;
    isStatic?: boolean;
    isFocusLock?: boolean;

    defaultBodyOverflow?: string;
    isBodyScrollLocked?: boolean;
    replaceScrollBar?: boolean;
    scrollBarPlaceholderColor?: string;
}

export default function Dialog<T>(props: DialogProps<T>): JSX.Element {
    const onClose = props.onClose;
    const onAfterClose = props.onAfterClose;

    const dialogUniqId = (~~(Math.random() * 1e8)).toString(16);

    const isCanClose = props.isCanClose ?? true;

    const { dialogState, setDialogState } = useContext<DialogContextType>(DialogContext);

    useEffect(() => {
        setDialogState({
            isOpen: props.isOpen,
            isForce: false,
        });
    }, [props.isOpen, setDialogState]);

    const close = () => {
        setDialogState({ isOpen: false, result: undefined, isForce: true });
    };

    useEffect(() => {
        if (!dialogState.isOpen && dialogState.isForce) {
            if (onClose) {
                onClose(dialogState.result as T);
            }
            if (onAfterClose) {
                onAfterClose(dialogState.result as T);
            }
        }
        if (dialogState.isOpen && props.onAfterOpen) {
            props.onAfterOpen();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogState]);

    const onAttemptClose = () => {
        if (isCanClose) {
            onAfterClose ? onAfterClose(dialogState.result as T) : close();
        }
    };

    return (
        <Modal
            className={[styles.dialog, props.className].join(' ')}
            labelledby={`header_${dialogUniqId}`}
            describedby={`content_${dialogUniqId}`}
            isOpen={dialogState.isOpen}
            isStatic={props.isStatic}
            isFocusLock={props.isFocusLock}
            defaultBodyOverflow={props.defaultBodyOverflow}
            isBodyScrollLocked={props.isBodyScrollLocked}
            replaceScrollBar={props.replaceScrollBar}
            scrollBarPlaceholderColor={props.scrollBarPlaceholderColor}
            onAttemptClose={onAttemptClose}
            onCompletelyHidden={() => {
                if (props.onCompletelyHidden) {
                    props.onCompletelyHidden();
                }
            }}
        >
            {props.showCloseIcon && (
                <button
                    className={['stf__dialogClose', styles.modalCloseIcon].join(' ')}
                    aria-label="Close"
                    onClick={() => {
                        onAfterClose ? onAfterClose(dialogState.result as T) : close();
                    }}
                >
                    <CloseIcon />
                </button>
            )}
            {props.title && (
                <h3 className={styles.modalTitle} id={`header_${dialogUniqId}`}>
                    {props.title}
                </h3>
            )}
            <div id={`content_${dialogUniqId}`} className={styles.modalBody}>
                {props.children}
            </div>
        </Modal>
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
