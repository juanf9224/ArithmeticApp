import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOperationState, IOperation, initialOperationState } from './types';

export const operationSlice = createSlice({
  name: 'operation',
  initialState: initialOperationState,
  reducers: {
    addOperations: (state: IOperationState, action: PayloadAction<IOperation[]>) => ({
      ...state,
      operations: action.payload,
    }),
    resetOperations: (state: IOperationState) => ({
        ...state,
        operations: []
    }),
  },
});

export const {
  addOperations,
  resetOperations
} = operationSlice.actions;

export default operationSlice.reducer;