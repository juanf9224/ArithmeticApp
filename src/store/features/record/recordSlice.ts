import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialRecordsState, IRecordState } from './types';
import { IRecord } from 'constants/record.constant';

export const recordsSlice = createSlice({
  name: 'record',
  initialState: initialRecordsState,
  reducers: {
    addRecords: (state: IRecordState, action: PayloadAction<IRecord[]>) => ({
      ...state,
      records: action.payload,
    }),
    resetRecords: (state: IRecordState) => {
      return {
        records: []
      };
    },
  },
});

export const {
  addRecords,
  resetRecords
} = recordsSlice.actions;

export default recordsSlice.reducer;
