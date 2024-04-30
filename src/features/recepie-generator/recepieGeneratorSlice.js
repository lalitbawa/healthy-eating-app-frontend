import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserMacros, generateMealPlans } from './recepieGeneratorAPI';

const initialState = {
  userMacros: [],
  mealPlans: [],
  status: 'idle',
  error: null,
};

export const fetchUserMacrosAsync = createAsyncThunk(
  'recepieGenerator/fetchUserMacros',
  async (userId) => {
    const data = await fetchUserMacros(userId);
    return data;
  }
);

export const generateMealPlansAsync = createAsyncThunk(
  'recepieGenerator/generateMealPlans',
  async (prompt) => {
    const data = await generateMealPlans(prompt);
    return data;
  }
);

export const recepieGeneratorSlice = createSlice({
  name: 'recepieGenerator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMacrosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserMacrosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userMacros = action.payload;
      })
      .addCase(fetchUserMacrosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(generateMealPlansAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateMealPlansAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mealPlans = action.payload;
      })
      .addCase(generateMealPlansAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUserMacros = (state) => state.recepieGenerator.userMacros;
export const selectMealPlans = (state) => state.recepieGenerator.mealPlans;

export default recepieGeneratorSlice.reducer;