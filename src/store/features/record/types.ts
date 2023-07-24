import { IRecord } from "constants/record.constant";

export interface IRecordState {
    records: IRecord[] | [];
}


export const initialRecordsState: IRecordState = {
    records: []
}
