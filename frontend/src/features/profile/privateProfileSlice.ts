import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import privateProfileService from './privateProfileService';
import {IInitialState as IAuthState} from '../auth/authSlice'

export interface IUserProfile {
  _id?: string
  name?: string
  email?: string
  institution?: string
  createdAt?: string
  updatedAt?: string
}

interface IInitialState {
  isEdit: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isProfileUpdated: boolean;
  message: string;
  profileDetails: IUserProfile | any
}

const initialState: IInitialState = {
  isEdit: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isProfileUpdated: false,
  message: '',
  profileDetails: ''
}

export const getProfile = createAsyncThunk('privateProfile/get', async(_, thunkAPI) => {
  const {auth} = thunkAPI.getState() as { auth: IAuthState }
  if(auth.user?.token) {
    const token: string = auth.user?.token

    try {
      return await privateProfileService.getProfile(token)

    } catch (error: any) {
      const message = (error.response.data.message)

      return thunkAPI.rejectWithValue(message)
    }
  }

})

export const updateProfile = createAsyncThunk('privateProfile/update', async(updatedData: IUserProfile, thunkAPI) => {
  const {auth} = thunkAPI.getState() as { auth: IAuthState }
  if(auth.user?.token) {
    const token: string = auth.user?.token

    try {
      return await privateProfileService.updateProfile(updatedData, token)

    } catch (error: any) {
      const message = (error.response.data.message)

      return thunkAPI.rejectWithValue(message)
    }
  }

})

export const privateProfileSlice = createSlice({
  name: 'privateProfile',
  initialState,
  reducers: {
    reset: (state) => {
      state.isEdit = false
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.isProfileUpdated = false
      state.message = ''
      // state.profileDetails = ''
    },
    toggleEdit: (state) => {
      state.isEdit = !state.isEdit
    }
  },
  extraReducers: (builder) => {
    builder
    // get profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isSuccess = true
        state.profileDetails = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload as string
      })
      
    // update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isProfileUpdated = true
        state.message = action.payload as string
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload as string
      })
  }
})

export const { reset, toggleEdit } = privateProfileSlice.actions

export default privateProfileSlice.reducer
