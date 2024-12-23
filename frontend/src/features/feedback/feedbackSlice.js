import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  feedback: {},
  status: 'idle',
  error: null,
};

export const addFeedback = createAsyncThunk(
  'feedback/addFeedback',
  async ({ userId, message }) => {
    return { userId, message, date: new Date().toISOString() };
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedback[action.payload.userId] = action.payload;
      });
  },
});

export default feedbackSlice.reducer;