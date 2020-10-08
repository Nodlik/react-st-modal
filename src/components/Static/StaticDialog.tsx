import Dialog, { DialogProps } from '../Modal/Dialog';

import DialogContextProvider from '../../context/DialogContextProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { appendToBody } from '../../utils/helpers';

export interface StaticDialogProps<T> {
    title?: string;
    onClose?: (result?: T) => void;
    children: React.ReactNode;
    showCloseIcon?: boolean;
    className?: string;
    onAfterClose?: (result?: T) => void;
    onAfterOpen?: (result?: T) => void;
    isOpen?: boolean;
}

export default function StaticDialog<T>(props: DialogProps<T>): JSX.Element {
    return ReactDOM.createPortal(
        <DialogContextProvider>
            <Dialog {...props} isStatic={true} />
        </DialogContextProvider>,
        appendToBody('stfMountedDialogPlace')
    );
}
