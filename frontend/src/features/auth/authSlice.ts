import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

const user = localStorage.getItem('user')

export interface IUser {
  _id: string;
  email: string;
  token: string;
}

export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
}

const initialState: IInitialState = {
  user: user ? JSON.parse(user) : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null
}

export interface IUserRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export const register = createAsyncThunk('auth/register', async (userData: IUserRegisterData, thunkAPI) => {
  try {
    return await authService.register(userData)

  } catch (error: any) {
    
    const message = (error.response.data.message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('auth/login', async (userData: IUserLoginData, thunkAPI) => {
  try {
    return await authService.login(userData)

  } catch (error: any) {
    
    const message = (error.response.data.message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = null
    }
  },
  extraReducers: (builder) => {
    builder
      // register
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

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
        state.message = "Successfully logged in"
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.user = null
        state.message = action.payload as string
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer