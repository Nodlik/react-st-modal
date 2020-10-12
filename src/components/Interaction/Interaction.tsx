import { ConfirmDialog, ConfirmDialogResult } from '../Modal/Confirm';

import { AlertDialog } from '../Modal/Alert';
import Dialog from '../Modal/Dialog';
import DialogContextProvider from '../../context/DialogContextProvider';
import { DialogElement } from '../../utils/types';
import { PromptDialog } from '../Modal/Prompt';
import React from 'react';
import ReactDOM from 'react-dom';
import { appendToBody } from '../../utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showModal<T>(Dialog: DialogElement<T>, dialogProps?: any): Promise<T> {
    const rootElement = appendToBody('stfDialogPlace');
    const dialogPlace = document.createElement('div');
    dialogPlace.classList.add('stf__modalDialogsPlace');

    rootElement.appendChild(dialogPlace);

    return new Promise<T>((resolve) => {
        const activeElement = document.activeElement as HTMLElement;

        const dialogClose = (result: T) => {
            resolve(result);

            if (activeElement) {
                if (rootElement.childNodes.length === 1) {
                    activeElement.focus();
                }
            }
        };

        const dialogHidden = () => {
            ReactDOM.render(undefined, dialogPlace);
            dialogPlace.remove();
        };

        ReactDOM.render(
            <DialogContextProvider>
                <Dialog {...dialogProps} onClose={dialogClose} onCompletelyHidden={dialogHidden} />
            </DialogContextProvider>,
            dialogPlace
        );
    });
}

export function Alert(
    body: string | JSX.Element,
    title?: string,
    buttonText?: string
): Promise<void> {
    return showModal<void>(AlertDialog, {
        body,
        title,
        buttonText,
    });
}

export interface PromptConfig {
    defaultValue?: string | number;
    isRequired?: boolean;
    okButtonText?: string;
    errorText?: string;
    cancelButtonText?: string;
}

export function Prompt(title?: string, options?: PromptConfig): Promise<string> {
    return showModal<string>(PromptDialog, {
        title,
        ...options,
    });
}

export async function Confirm(
    body: string | JSX.Element,
    title?: string,
    okButtonText?: string,
    cancelButtonText?: string
): Promise<boolean> {
    return (
        (await showModal<string>(ConfirmDialog, {
            body,
            title,
            okButtonText,
            cancelButtonText,
        })) === ConfirmDialogResult.OK
    );
}

export interface CustomConfig {
    title?: string;

    className?: string;
    defaultBodyOverflow?: string;
    isFocusLock?: boolean;

    showCloseIcon?: boolean;
    isCanClose?: boolean;
    isBodyScrollLocked?: boolean;

    replaceScrollBar?: boolean;
    scrollBarPlaceholderColor?: string;

    onAfterOpen?: () => void;
}

export async function CustomDialog<T>(
    body: JSX.Element,
    options?: CustomConfig
): Promise<T | undefined> {
    return showModal<T>(Dialog, {
        ...options,
        children: body,
        isOpen: true,
    });
}
