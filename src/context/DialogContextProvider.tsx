import React, { ReactNode, useState } from 'react';

export interface DialogState {
    result?: unknown;
    isOpen: boolean;
    isForce: boolean;
}

export interface DialogContextType {
    dialogState: DialogState;
    setDialogState: React.Dispatch<React.SetStateAction<DialogState>>;
}

export const DialogContext = React.createContext<DialogContextType>({
    dialogState: {
        result: undefined,
        isOpen: false,
        isForce: false,
    },
    setDialogState: () => null,
});

interface DialogContextProviderProps {
    children: ReactNode;
}

export const DialogContextProvider = (props: DialogContextProviderProps): JSX.Element => {
    const [dialogState, setDialogState] = useState<DialogState>({
        result: undefined,
        isOpen: false,
        isForce: false,
    });

    return (
        <DialogContext.Provider value={{ dialogState, setDialogState }}>
            {props.children}
        </DialogContext.Provider>
    );
};

export default DialogContextProvider;
