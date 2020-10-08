import React, { ReactNode } from 'react';

import styles from './Footer.module.scss';

export type FooterProps = {
    children?: ReactNode;
    className?: string;
};

export default function Footer(props: FooterProps): JSX.Element {
    return <div className={[props.className, styles.footer].join(' ')}>{props.children}</div>;
}
