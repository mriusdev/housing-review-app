import axios from 'axios'

import { IUserProfile } from './privateProfileSlice'

const API_URL = '/api/user/'


const getProfile = async (token: string) => {
  const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
  const response = await axios.get(API_URL + 'profile', tokenConfig)

  return response.data
}

const updateProfile = async (updatedUserData: IUserProfile, token: string) => {
  const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
  const response = await axios.put(API_URL + 'profile/edit', updatedUserData, tokenConfig)

  return response.data
}

const privateProfileService = {
  getProfile,
  updateProfile
}

export default privateProfileService
