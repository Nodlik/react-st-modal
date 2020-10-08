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
    const dialogPlace = appendToBody('stfDialogPlace');

    return new Promise<T>((resolve) => {
        const dialogClose = (result: T) => {
            resolve(result);
        };

        const dialogHidden = () => {
            ReactDOM.render(<div></div>, dialogPlace);
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

export interface CustomConfig<T> {
    title?: string;
    showCloseIcon?: boolean;
    className?: string;
    onAfterClose?: (result?: T) => void;
    onAfterOpen?: () => void;
    isCanClose?: boolean;
    defaultBodyOverflow?: string;
    isBodyScrollLocked?: boolean;
}

export async function CustomDialog<T>(body: JSX.Element, options?: CustomConfig<T>): Promise<T> {
    return showModal<T>(Dialog, {
        ...options,
        children: body,
        isOpen: true,
    });
}
