import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './features/user/userSlice';
import recordReducer from './features/record/recordSlice';
import operationReducer from './features/operation/operationSlice';
import { loanProApi } from 'services/loan-pro-api';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [loanProApi.reducerPath]: loanProApi.reducer,
    user: userReducer,
    record: recordReducer,
    operation: operationReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(
      loanProApi.middleware,
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
