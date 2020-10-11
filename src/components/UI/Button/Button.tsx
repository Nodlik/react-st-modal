import React, { MutableRefObject, ReactNode, forwardRef } from 'react';

import styles from './Button.module.scss';

export const enum ButtonState {
    ACTIVE = 'active',
    DISABLED = 'disabled',
    PENDING = 'pending',
}

export const enum ButtonType {
    PRIMARY = 'primary',
    DANGER = 'danger',
    LIGHT = 'light',
    DARK = 'dark',
}

type ButtonProps = {
    children: ReactNode;
    state?: ButtonState | string;
    type?: ButtonType | string;
    className?: string;
    formRole?: 'button' | 'submit';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    autoFocus?: boolean;
};

function LoadingIcon(): JSX.Element {
    return (
        <svg viewBox="0 0 512 512" width="20" height="20" fill="#ffffff" fillRule="nonzero">
            <g>
                <path d="M102.59,341.42a15,15,0,0,1-13.42-8.28,187.41,187.41,0,0,1,35.11-216.86c73.18-73.19,192.26-73.19,265.44,0a15,15,0,0,1-21.21,21.21C307,76,207,76,145.49,137.49A157.45,157.45,0,0,0,116,319.69a15,15,0,0,1-13.4,21.73Z" />
                <path d="M257,436.61a187.1,187.1,0,0,1-132.72-54.88,15,15,0,1,1,21.21-21.22C207,422,307,422,368.51,360.51A157.45,157.45,0,0,0,398,178.31a15,15,0,0,1,26.82-13.45A187.62,187.62,0,0,1,257,436.61Z" />
                <path d="M315.21,148.25a15,15,0,0,1-1.47-29.92l47.43-4.73-9.51-47.67a15,15,0,0,1,29.42-5.86L393.82,124a15,15,0,0,1-13.22,17.86l-63.88,6.37C316.21,148.23,315.71,148.25,315.21,148.25Z" />
                <path d="M147.61,450a15,15,0,0,1-14.7-12.07l-12.74-63.88a15,15,0,0,1,13.23-17.86l63.88-6.37a15,15,0,0,1,3,29.85l-47.43,4.73,9.5,47.67A15,15,0,0,1,147.61,450Z" />
            </g>
        </svg>
    );
}

const Button = forwardRef((props: ButtonProps, ref: MutableRefObject<HTMLButtonElement>) => {
    return (
        <button
            ref={ref}
            autoFocus={props.autoFocus}
            onClick={props.onClick}
            type={props.formRole || 'button'}
            disabled={props.state === ButtonState.DISABLED || props.state === ButtonState.PENDING}
            className={[
                props.className ?? '',
                styles[props.type ? `--${props.type}` : '--primary'],
                props.state === ButtonState.PENDING ? styles.buttonPending : '',
            ].join(' ')}
        >
            {props.state === ButtonState.PENDING && <LoadingIcon />}
            {props.children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
