import { ReactElement, ReactNode } from "react";

export interface ModalWrapperProps {
    open: boolean;
    handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}