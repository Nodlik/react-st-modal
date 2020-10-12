import React, { useEffect, useRef } from 'react';

import Dialog from '../Modal/Dialog';
import DialogContextProvider from '../../context/DialogContextProvider';
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
    isFocusLock?: boolean;

    replaceScrollBar?: boolean;
    scrollBarPlaceholderColor?: string;

    onAfterClose?: (result?: T) => void;
    onAfterOpen?: () => void;

    isOpen: boolean;
}

export default function StaticDialog<T>(props: StaticDialogProps<T>): JSX.Element {
    const activeElement = useRef<HTMLElement>();

    useEffect(() => {
        if (props.isOpen) {
            activeElement.current = document.activeElement as HTMLElement;
        } else if (activeElement.current) {
            activeElement.current.focus();
            activeElement.current = null;
        }
    }, [props.isOpen]);

    return ReactDOM.createPortal(
        <DialogContextProvider>
            <Dialog {...props} isStatic={true} />
        </DialogContextProvider>,
        appendToBody('stfMountedDialogPlace')
    );
}
