import { createSlice} from "@reduxjs/toolkit"

const journalSlice=createSlice({
    name: "journal",
    initialState: {
        editJournal: null
    },
    reducers: {
        setEditedEntry: (state, action) => {
            state.editJournal=action.payload;
        }
    }
})
export const {setEditedEntry} =journalSlice.actions;
export default journalSlice.reducer;