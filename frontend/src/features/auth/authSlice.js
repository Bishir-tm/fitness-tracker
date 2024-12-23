import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Mock API responses
const mockLogin = async (credentials) => {
  return {
    user: { id: 1, name: 'John Doe', email: credentials.email, role: 'user' },
    token: 'mock-jwt-token'
  };
};

const mockRegister = async (userData) => {
  return {
    user: { id: 1, ...userData, role: 'user' },
    token: 'mock-jwt-token'
  };
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await mockLogin(credentials);
    localStorage.setItem('token', response.token);
    return response.user;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await mockRegister(userData);
    localStorage.setItem('token', response.token);
    return response.user;
  }
);

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;