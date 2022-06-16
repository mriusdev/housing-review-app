import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import privateProfileService from './privateProfileService';

export interface IUserProfile {
  _id: "string",
  name: "string",
  email: "string",
  institution: "string",
  createdAt: "string",
  updatedAt: "string"
}

interface IInitialState {
  isEdit: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
  profileDetails: IUserProfile | null
}

const initialState: IInitialState = {
  isEdit: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
  profileDetails: null
}

export const getProfile = createAsyncThunk('privateProfile/get', async(_, thunkAPI) => {
  try {
    return await privateProfileService.getProfile()

  } catch (error: any) {
    const message = (error.response.data.message)

    return thunkAPI.rejectWithValue(message)
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
      state.message = null
      state.profileDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
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
  }
})

export const { reset } = privateProfileSlice.actions

export default privateProfileSlice.reducer
