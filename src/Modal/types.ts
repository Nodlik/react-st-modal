export interface BaseDialogProps {
    title?: string;
    body?: string | JSX.Element;
    onClose?: (result?: string) => void;
    onCompletelyHidden?: () => void;
}

export type DialogElement = (props: BaseDialogProps) => JSX.Element;

export type DialogAction = {
    close: () => void;
};

//export type ModalButton = ()
