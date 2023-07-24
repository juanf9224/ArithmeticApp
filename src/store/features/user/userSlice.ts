import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  initialUserState,
  IUser,
  IUserState,
} from './types';
import { IAppState } from 'store/types';

export const usersSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser: (state: IUserState, action: PayloadAction<IUser>) => ({
        ...state,
        ...action.payload,
        auth: {
          isAuthenticated: true
        },
    }),
    logOut: (state: IUserState) => {
      return {
        ...state,
        ...initialUserState,
      };
    },
  },
});

export const {
  addUser,
  logOut,
} = usersSlice.actions;

export const selectUser = createDraftSafeSelector(
  (state: IAppState) => state,
  (state) => state.user
);

export default usersSlice.reducer;
