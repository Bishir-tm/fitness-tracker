import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  feedback: {},
  status: "idle",
  error: null,
};

export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async ({ userId, message }) => {
    try {
      const response = await api.post(`/feedback`, {
        userId,
        message,
      }); // Adjust endpoint as per your backend
      console.log(response.data); // Assuming response.data contains the logs array
      return response.data; // Assuming response.data contains the logs array
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch logs"
      );
    }
  }
);

export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/feedback`); // Adjust endpoint as per your backend
      console.log(response.data); // Assuming response.data contains the logs array
      return response.data; // Assuming response.data contains the logs array
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch logs"
      );
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedback[action.payload.userId] = action.payload;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.feedback = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
