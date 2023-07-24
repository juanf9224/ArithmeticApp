import { OperationType } from "constants/operation.constant";

export interface IOperationModalProps {
    open: boolean;
    handleClose: () => void,
    handleAddOperation: (type: OperationType, valueA: number, valueB: number) => void;
    isLoading: boolean;
}