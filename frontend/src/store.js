import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from './reducers/userReducers';


const reducer = combineReducers({
    user: userReducer,
    // product: productReducer,
})

let initialState = {
    user: {
      loading: false,
      user: {},
      is_authenticated: false,
    },
  };

const persistConfig = {
    key: "root",
    storage,
  };

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
  reducer: persistedReducer,
  initialState,
  middleware: [thunk],
})

export const persistor = persistStore(store);