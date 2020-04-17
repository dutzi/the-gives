import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import counterSlice from '../components/Counter/reducers';
import logger from 'redux-logger';

const rootReducer = combineReducers({ counter: counterSlice.reducer });

export type RootState = ReturnType<typeof rootReducer>;

const middleware = getDefaultMiddleware();
if (process.env.NODE_ENV === 'development') {
  middleware.unshift(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
