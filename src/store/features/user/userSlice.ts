import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  initialUserState,
  IUser,
  IUserState,
} from './types';

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

export default usersSlice.reducer;
