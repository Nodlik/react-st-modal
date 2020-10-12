import React, { useEffect, useRef } from 'react';

type FocusLockProps = {
    isLocked?: boolean;
    isOpen: boolean;
    children?: React.ReactNode;
};

export default function FocusLock(props: FocusLockProps): JSX.Element {
    const rootNode = useRef<HTMLDivElement>();
    const focusableItems = useRef<NodeListOf<HTMLElement>>();

    const isLocked = props.isLocked ?? true;

    useEffect(() => {
        const updateFocusableItems = () => {
            focusableItems.current = rootNode.current?.querySelectorAll(
                'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"]), video'
            );
        };

        const observer = new MutationObserver(() => {
            updateFocusableItems();
        });

        updateFocusableItems();
        observer.observe(rootNode.current, { childList: true });

        return () => {
            observer.disconnect();
        };
    }, [rootNode]);

    useEffect(() => {
        if (props.isOpen) {
            const focused = rootNode.current?.querySelectorAll(
                'input:focus, button:focus, [href]:focus, select:focus, textarea:focus, [tabindex]:not([tabindex="-1"]):focus, video:focus'
            );

            if (focused.length === 0 && focusableItems.current.length > 0) {
                let firstFocusItem: HTMLElement = null;
                const closedButtonEl = rootNode.current?.querySelector('.stf__dialogClose');

                focusableItems.current.forEach((item) => {
                    if (item !== closedButtonEl && firstFocusItem === null) {
                        firstFocusItem = item;
                    }
                });

                if (firstFocusItem === null) {
                    firstFocusItem = closedButtonEl as HTMLElement;
                }

                firstFocusItem.focus();
            }
        }
    }, [props.isOpen]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (!focusableItems.current || focusableItems.current.length === 0) {
                return;
            }

            const { key, shiftKey } = event;
            const { length, 0: firstItem, [length - 1]: lastItem } = focusableItems.current;

            if (isLocked && key === 'Tab') {
                // If only one item then prevent tabbing when locked
                if (length === 1) {
                    event.preventDefault();
                    return;
                }

                // If focused on last item then focus on first item when tab is pressed
                if (!shiftKey && document.activeElement === lastItem) {
                    event.preventDefault();
                    firstItem.focus();
                    return;
                }

                // If focused on first item then focus on last item when shift + tab is pressed
                if (shiftKey && document.activeElement === firstItem) {
                    event.preventDefault();
                    lastItem.focus();
                    return;
                }
            }
        };

        if (props.isOpen) {
            window.addEventListener('keydown', handleKeyPress);

            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [isLocked, focusableItems, props.isOpen]);

    return <div ref={rootNode}>{props.children}</div>;
}
