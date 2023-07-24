export enum OperationType {
    ADDITION = 'addition',
    SUBSTRACTION = 'substraction',
    MULTIPLICATION = 'multiplication',
    DIVISION = 'division',
    SQUARE_ROOT = 'square_root',
    RANDOM_STRING = 'random_string',
}

export interface IOperation {
    type: string;
    cost: number;
}