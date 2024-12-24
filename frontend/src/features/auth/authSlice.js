import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      console.log(response.data.role);
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      response.data.role === "admin"
        ? (window.location.href = "/admin")
        : (window.location.href = "/");
      return response.data; // Return the entire user data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// thunk for user role update
export const updateRole = createAsyncThunk(
  "auth/updateRole",
  async ({ userId, role }, { rejectWithValue }) => {
    console.log(userId, role);
    try {
      const response = await api.put("/auth/update-role", { userId, role });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update role"
      );
    }
  }
);

// Async thunk for registering a new user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Async thunk for registering a new user
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/fetch-all-users");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Initial state with token-based user persistence
const token = localStorage.getItem("token");

const initialState = {
  user: token ? { token } : null, // Initialize user if token exists
  role: "",
  allUsers: [],
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; // Clear user state
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Login lifecycle
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.role = action.payload.role;
        state.user = action.payload; // Store user data
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture error message
      })
      // Register lifecycle
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Store user data
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture error message
      })
      // Register lifecycle
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers = action.payload; // Store user data
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture error message
      })
      // update role
      .addCase(updateRole.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = action.payload.user;
        state.allUsers = state.allUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the logout action
export const { logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
