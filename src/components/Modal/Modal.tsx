import '../../vars.scss';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import FocusLock from '../FocusLock/FocusLock';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen?: boolean;
    isStatic?: boolean;
    isFocusLock?: boolean;
    className?: string;
    children?: React.ReactNode;
    onCompletelyHidden?: () => void;
    onCompletelyVisible?: () => void;
    onAttemptClose?: () => void;
    defaultBodyOverflow?: string;
    isBodyScrollLocked?: boolean;
    labelledby?: string;
    describedby?: string;
}

export default function Modal(props: ModalProps): JSX.Element {
    const isBodyScrollLocked = props.isBodyScrollLocked ?? true;

    const [isOpen, setOpen] = useState<boolean>(false);
    const [isCompletelyClose, setCompletelyClose] = useState<boolean>(true);

    const isOpenRef = useRef(isOpen);
    const overlayElement = useRef<HTMLDivElement>();

    const handleEsc = useCallback(
        (event: KeyboardEvent) => {
            if (
                props.isOpen &&
                props.onAttemptClose &&
                (event.key === 'Esc' || event.key === 'Escape')
            ) {
                props.onAttemptClose();
            }
        },
        [props]
    );

    useEffect(() => {
        setOpen(props.isOpen);
        isOpenRef.current = props.isOpen;

        if (isBodyScrollLocked) {
            document.body.style.overflow = props.isOpen
                ? 'hidden'
                : props.defaultBodyOverflow || 'visible';
        }
    }, [props.isOpen, isBodyScrollLocked, props.defaultBodyOverflow]);

    useEffect(() => {
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [handleEsc]);

    return (
        <FocusLock isLocked={props.isFocusLock} isOpen={isOpen}>
            <div
                ref={overlayElement}
                className={[
                    styles.overlay,
                    !isOpen ? styles.overlayHidden : '',
                    isCompletelyClose && !isOpen && props.isStatic ? styles.staticDialog : '',
                ].join(' ')}
                onClick={(e) => {
                    if (e.target === overlayElement.current) {
                        props.onAttemptClose();
                    }
                }}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={props.labelledby || ''}
                    aria-describedby={props.describedby || ''}
                    onTransitionEnd={() => {
                        if (isOpenRef.current && props.onCompletelyVisible) {
                            props.onCompletelyVisible();
                        }
                        if (!isOpenRef.current && props.onCompletelyHidden) {
                            props.onCompletelyHidden();
                        }
                        if (props.isStatic) {
                            setCompletelyClose(!isOpenRef.current);
                        }
                    }}
                    className={[
                        styles.modal,
                        props.className || '',
                        !isOpen ? styles.modalHidden : '',
                    ].join(' ')}
                >
                    {props.children}
                </div>
            </div>
        </FocusLock>
    );
}
