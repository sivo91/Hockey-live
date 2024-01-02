

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import nhlStandingsReducer from './nhlStandingsSlice';
import WC20Reducer from './wjc24Slice'
import khlReducer from './khlSlice'



export const store = configureStore({
  reducer: {
    userAuth: userReducer,  
    nhlStandings: nhlStandingsReducer,
    wcj: WC20Reducer,
    khl: khlReducer,
  }
})
