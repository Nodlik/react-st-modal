import '../vars.scss';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
    isOpen?: boolean;
    isStatic?: boolean;
    className?: string;
    children?: React.ReactNode;
    onCompletelyHidden?: () => void;
    onCompletelyVisible?: () => void;
}

export default function Modal(props: ModalProps): JSX.Element {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isCompletelyClose, setCompletelyClose] = useState<boolean>(true);

    const isOpenRef = useRef(isOpen);
    const modalWindow = useRef<HTMLDivElement>();

    useEffect(() => {
        setOpen(props.isOpen);
        isOpenRef.current = props.isOpen;
    }, [props.isOpen]);

    const transitionEndEvent = useCallback(() => {
        if (isOpenRef.current && props.onCompletelyVisible) {
            props.onCompletelyVisible();
        }
        if (!isOpenRef.current && props.onCompletelyHidden) {
            props.onCompletelyHidden();
        }
        if (props.isStatic) {
            setCompletelyClose(!isOpenRef.current);
        }
    }, [props]);

    useEffect(() => {
        if (modalWindow.current) {
            console.log('mount');
            const dialog = modalWindow.current;
            dialog.addEventListener('transitionend', transitionEndEvent);

            return () => {
                console.log('unmount');
                dialog.removeEventListener('transitionend', transitionEndEvent);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={[
                styles.overlay,
                !isOpen ? styles.overlayHidden : '',
                isCompletelyClose && !isOpen && props.isStatic ? styles.staticDialog : '',
            ].join(' ')}
        >
            <div
                ref={modalWindow}
                className={[
                    styles.modal,
                    props.className || '',
                    !isOpen ? styles.modalHidden : '',
                ].join(' ')}
            >
                {props.children}
            </div>
        </div>
    );
}
