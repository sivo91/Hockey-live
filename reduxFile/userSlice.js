import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  isLoading: false,
}


const userSlice = createSlice({
   name: 'userAuth',
   initialState,
   reducers: {
    userLogin: (state, action) => {
      state.user = action.payload
    },
    userLogOut: (state) => {
      state.user = null
    },
   }
})

export const {userLogin, userLogOut} = userSlice.actions
export default userSlice.reducer