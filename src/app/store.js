import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import calorieCounterReducer from '../features/calorie-counter/calorieCounterSlice';
import calorieProgressReducer from '../features/calorie-progress/calorieProgressSlice';
import meditationReducer from '../features/meditation/meditationSlice';
import recepieGeneratorReducer from '../features/recepie-generator/recepieGeneratorSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    calorie: calorieCounterReducer,
    progress: calorieProgressReducer,
    meditation: meditationReducer,
    recepieGenerator: recepieGeneratorReducer,
  },
});
