import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMeditation } from './meditationAPI';

const initialState = {
  meditation: [],
  status: 'idle',
  error: null,
};

export const fetchMeditationAsync = createAsyncThunk(
  'meditation/fetchMeditation',
  async () => {
    const response = await fetchMeditation();
    return response.data;
  }
);

export const meditationSlice = createSlice({
  name: 'meditation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeditationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeditationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.meditation = action.payload;
      })
      .addCase(fetchMeditationAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export const selectMeditation = (state) => state.meditation.meditation;

export default meditationSlice.reducer;