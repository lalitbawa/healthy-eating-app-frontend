import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserMacros } from './calorieCounterApi';

const initialState = {
  userMacros: [],
  status: 'idle',
  error: null,
};

export const createUserMacrosAsync = createAsyncThunk(
  'calorie/createUserMacros',
  async (userMacros) => {
    const response = await createUserMacros(userMacros);
    return response.data;
  }
);

export const fetchUserMacrosAsync = createAsyncThunk(
  'calorie/fetchUserMacros',
  async (userId) => {
    const response = await fetch(`https://healthy-eating-app-backend.onrender.com/api/usermacros?userId=${userId}`);
    const data = await response.json();
    return data;
  }
);

export const calorieCounterSlice = createSlice({
  name: 'calorie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserMacrosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserMacrosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userMacros.push(action.payload);
      })
      .addCase(fetchUserMacrosAsync.fulfilled, (state, action) => {
        state.userMacros = action.payload;
      })
      .addCase(createUserMacrosAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export const selectUserMacros = (state) => state.calorie.userMacros;

export default calorieCounterSlice.reducer;