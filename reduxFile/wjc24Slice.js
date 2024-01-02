



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchJuniors = createAsyncThunk(
  'nhlStandings/fetchNHLStandings',
  async () => {
   const options = {
    method: 'GET',
    url: 'https://hockey-live-sk-data.p.rapidapi.com/table/WJC/2023',
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
const juniorsCap = createSlice({
  name: 'nhlStandings',
  initialState: {
    data: null,
    status: 'idle', 
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchJuniors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJuniors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched data to the state
        state.data = action.payload;
      })
      .addCase(fetchJuniors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default juniorsCap.reducer;



