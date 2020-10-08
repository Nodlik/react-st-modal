import { DialogContext, DialogContextType } from '../context/DialogContextProvider';
import { useCallback, useContext } from 'react';

export interface DialogState<T> {
    isOpen: boolean;
    close: (result?: T) => void;
}

export default function useDialog<T>(): DialogState<T> {
    const { dialogState, setDialogState } = useContext<DialogContextType>(DialogContext);

    const close = useCallback(
        (result?: T) => {
            setDialogState({
                isOpen: false,
                isForce: true,
                result: result,
            });
        },
        [setDialogState]
    );

    return {
        isOpen: dialogState.isOpen,
        close: close,
    };
}
