import Dialog from '../Modal/Dialog';
import DialogContextProvider from '../../context/DialogContextProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { appendToBody } from '../../utils/helpers';

export interface StaticDialogProps<T> {
    children: React.ReactNode;

    title?: string;
    className?: string;
    defaultBodyOverflow?: string;

    showCloseIcon?: boolean;
    isCanClose?: boolean;
    isBodyScrollLocked?: boolean;

    onAfterClose?: (result?: T) => void;
    onAfterOpen?: () => void;

    isOpen: boolean;
}

export default function StaticDialog<T>(props: StaticDialogProps<T>): JSX.Element {
    return ReactDOM.createPortal(
        <DialogContextProvider>
            <Dialog {...props} isStatic={true} />
        </DialogContextProvider>,
        appendToBody('stfMountedDialogPlace')
    );
}
