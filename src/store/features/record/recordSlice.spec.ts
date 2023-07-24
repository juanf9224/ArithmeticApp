import store from "store"
import { addRecords, resetRecords } from "./recordSlice";
import { IRecord } from "constants/record.constant";

const records: IRecord[] = [
    {
        id: 1,
        operationId: 1,
        opereationResponse: 2,
        userBalance: 100,
        userId: 1,
        amount: 12,
        date: `${new Date()}`,        
    },
    {
        id: 2,
        operationId: 2,
        opereationResponse: 3,
        userBalance: 80,
        userId: 2,
        amount: 15,
        date: `${new Date()}`,        
    }
]

describe('RecordsSlice Test', () => {
    it('should have an inital state with empty records', () => {
        expect(store.getState().record.records.length).toBe(0);
    })
    it ('should add operations', () => {

        store.dispatch(addRecords(records));
        const state = store.getState().record;
        expect(state.records.length).toBe(records.length);
    })
    it ('should reset operations', () => {

        store.dispatch(addRecords(records));

        store.dispatch(resetRecords());

        const state = store.getState().record;
        expect(state.records.length).toBe(0);
    })
})