

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import nhlStandingsReducer from './nhlSlice';
import WC20Reducer from './wjcSlice'
import khlReducer from './khlSlice'
import selectYearReducer from './selectYearSlice'



export const store = configureStore({
  reducer: {
    userAuth: userReducer,  
    nhlStandings: nhlStandingsReducer,
    wcj: WC20Reducer,
    khl: khlReducer,
    year: selectYearReducer
  }
})
