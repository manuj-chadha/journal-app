import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import collectionSlice from "./collectionSlice.js"

const rootReducers=combineReducers({
    auth: authSlice,
    collections: collectionSlice
})

const store=configureStore({
    reducer: rootReducers
})
export default store;