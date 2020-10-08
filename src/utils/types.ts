export interface BaseDialogProps<T> {
    title?: string;
    canClose?: boolean;
    onClose?: (result?: T) => void;
    onCompletelyHidden?: () => void;
}

export type DialogElement<T> = (props: BaseDialogProps<T>) => JSX.Element;

export type DialogAction = {
    close: () => void;
};

//export type ModalButton = ()
