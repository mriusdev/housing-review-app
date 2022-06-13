import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

const user = localStorage.getItem('user')

interface IInitialState {
  user: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: IInitialState = {
  user: user ? JSON.parse(user) : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

interface IUserData {
  name: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk('auth/register', async (userData: IUserData, thunkAPI) => {
  try {
    return await authService.register(userData)

  } catch (error: any) {
    
    const message = (error.response.data.message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
        state.message = "Account created"
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.user = null
        state.message = action.payload as string
      })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer