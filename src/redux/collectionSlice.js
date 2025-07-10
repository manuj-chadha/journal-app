import {createSlice} from "@reduxjs/toolkit"


const collectionSlice=createSlice({
    name: "collections",
    initialState: {
        collections: null
    },
    reducers: {
        setCollections: (state, action) => {
            state.collections=action.payload;
        }
    }
})

export default collectionSlice.reducer;

export const { setCollections }=collectionSlice.actions;