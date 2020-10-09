import React, { ReactNode } from 'react';

import styles from './Content.module.scss';

export type ContentProps = {
    children?: ReactNode;
    className?: string;
};

export default function Content(props: ContentProps): JSX.Element {
    return <div className={[props.className, styles.content].join(' ')}>{props.children}</div>;
}
