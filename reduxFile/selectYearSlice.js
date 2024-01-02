


import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  year: '2023',
}


const yearSlice = createSlice({
   name: 'year',
   initialState,
   reducers: {
    selectYear: (state, action) => {
      state.year = action.payload
    },

   }
})

export const {selectYear} = yearSlice.actions
export default yearSlice.reducer