import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import collectionSlice from "./collectionSlice.js"
import persistReducer from "redux-persist/es/persistReducer"
import storage from 'redux-persist/lib/storage'; 
import persistStore from "redux-persist/es/persistStore";
import journalSlice from "./journalSlice.js";

const persistConfig = {
  key: 'auth',
  storage,
};

const rootReducers=combineReducers({
    auth: persistReducer(persistConfig, authSlice),
    collections: collectionSlice,
    journal: journalSlice
});

const store=configureStore({
    reducer: rootReducers
})

export const persistor = persistStore(store);
export default store;