import store from "store"
import { addOperations, resetOperations } from "./operationSlice"
import { OperationType } from "constants/operation.constant"

const operations = [
    {
        id: 1,
        type: OperationType.ADDITION,
        cost: 45
    }
];
describe('OperationSlice Test', () => {
    it('should have an inital state with empty operations', () => {
        expect(store.getState().operation.operations.length).toBe(0);
    })
    it ('should add operations', () => {

        store.dispatch(addOperations(operations));
        const state = store.getState().operation;
        expect(state.operations.length).toBe(operations.length);
    })
    it ('should reset operations', () => {

        store.dispatch(addOperations(operations));

        store.dispatch(resetOperations());

        const state = store.getState().operation;
        expect(state.operations.length).toBe(0);
    })
})