import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCalories, fetchUserTracker } from './calorieProgressAPI.js';

const initialState = {
  userTracker: [],
  status: 'idle',
  error: null,
};

export const addCaloriesAsync = createAsyncThunk(
  'progress/addCalories',
  async (calories, { getState, dispatch }) => {
    const { auth } = getState();
    const userId = auth.loggedInUser.id;
    const currentDate = new Date().toISOString().split('T')[0];
    const trackerData = {
      userId,
      calories: calories.calories,
      food: calories.food,
      date: currentDate,
    };
    await addCalories(trackerData);
    dispatch(fetchUserTrackerAsync(userId));
  }
);

export const fetchUserTrackerAsync = createAsyncThunk(
  'progress/fetchUserTracker',
  async (userId) => {
    const response = await fetchUserTracker(userId);
    return response.data;
  }
);

export const calorieProgressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCaloriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCaloriesAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(addCaloriesAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(fetchUserTrackerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTrackerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userTracker = action.payload;
      })
      .addCase(fetchUserTrackerAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export const selectUserTracker = (state) => state.progress.userTracker;

export default calorieProgressSlice.reducer;