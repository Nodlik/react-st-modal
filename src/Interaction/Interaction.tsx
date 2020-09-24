import { ConfirmDialog, ConfirmDialogResult } from '../Modal/Confirm';

import { AlertDialog } from '../Modal/Alert';
import { DialogElement } from '../Modal/types';
import { PromptDialog } from '../Modal/Prompt';
import React from 'react';
import ReactDOM from 'react-dom';

function getDialogPlace(): HTMLElement {
    let result = document.getElementById('stfDialogPlace');

    if (!result) {
        result = document.createElement('div');
        result.setAttribute('id', 'stfDialogPlace');
        document.body.appendChild(result);
    }

    return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showModal(Dialog: DialogElement, dialogProps?: any): Promise<string> {
    const dialogPlace = getDialogPlace();

    return new Promise<string>((resolve) => {
        const dialogClose = (result: string) => {
            resolve(result);
        };

        const dialogHidden = () => {
            ReactDOM.render(<div></div>, dialogPlace);
        };

        ReactDOM.render(
            <Dialog {...dialogProps} onClose={dialogClose} onCompletelyHidden={dialogHidden} />,
            dialogPlace
        );
    });
}

export function Alert(
    body: string | JSX.Element,
    title?: string,
    buttonText?: string
): Promise<string> {
    return showModal(AlertDialog, {
        body,
        title,
        buttonText,
    });
}

export interface PromptConfig {
    defaultValue?: string;
    isRequired?: boolean;
    okButtonText?: string;
    errorText?: string;
    cancelButtonText?: string;
}

export function Prompt(title?: string, config?: PromptConfig): Promise<string> {
    return showModal(PromptDialog, {
        title,
        ...config,
    });
}

export async function Confirm(
    body: string | JSX.Element,
    title?: string,
    okButtonText?: string,
    cancelButtonText?: string
): Promise<boolean> {
    return (
        (await showModal(ConfirmDialog, {
            body,
            title,
            okButtonText,
            cancelButtonText,
        })) === ConfirmDialogResult.OK
    );
}
