import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import logsReducer from '../features/logs/logsSlice';
import feedbackReducer from '../features/feedback/feedbackSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logsReducer,
    feedback: feedbackReducer,
  },
});