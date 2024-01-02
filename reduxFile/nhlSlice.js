


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching NHL standings
export const fetchNHLStandings = createAsyncThunk(
  'nhlStandings/fetchNHLStandings',
  async (year) => {
   const options = {
    method: 'GET',
    url: `https://hockey-live-sk-data.p.rapidapi.com/table/NHL/${year}`,
    params: {
      key: process.env.NEXT_PUBLIC_API_KEY2,
      tz: 'America/New_York'
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'hockey-live-sk-data.p.rapidapi.com'
    }
  };
  
    const response = await axios.request(options);
    return response.data;
  }
);

// Slice for NHL standings
const nhlStandingsSlice = createSlice({
  name: 'nhlStandings',
  initialState: {
    data: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNHLStandings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNHLStandings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched data to the state
        state.data = action.payload;
      })
      .addCase(fetchNHLStandings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default nhlStandingsSlice.reducer;

