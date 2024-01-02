


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchKHL = createAsyncThunk(
  'nhl/fetchKHL',
  async (year) => {
   const options = {
    method: 'GET',
    url: `https://hockey-live-sk-data.p.rapidapi.com/table/KHL/${year}`,
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
const KHL = createSlice({
  name: 'khl',
  initialState: {
    data: null,
    status: 'idle', 
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchKHL.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchKHL.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched data to the state
        state.data = action.payload;
      })
      .addCase(fetchKHL.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default KHL.reducer;

