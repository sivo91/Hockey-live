

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching NHL standings
export const fetchNHLSchedule = createAsyncThunk(
  'nhlSchedule/fetchNHLSchedule',
  async (year) => {


    const queryParam = encodeURIComponent(year);
    const res = await axios.get(`/api/NHL/schedule?year=${queryParam}`)
    return res.data;
  }
);

// Slice for NHL standings
const nhlScheduleSlice = createSlice({
  name: 'nhlSchedule',
  initialState: {
    data: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNHLSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNHLSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched data to the state
        state.data = action.payload;
      })
      .addCase(fetchNHLSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default nhlScheduleSlice.reducer;

