export interface IOperation {
    id: number;
    type: string;
    cost: number;
}

export interface IOperationState {
    operations: IOperation[] | [];
}


export const initialOperationState: IOperationState = {
    operations: []
}