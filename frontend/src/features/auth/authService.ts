import axios from 'axios'

import { IUserRegisterData, IUserLoginData } from './authSlice';

const API_URL = '/api/user/'

const register = async (userData: IUserRegisterData) => {
  const response = await axios.post(API_URL + 'register', userData)

  return response.data
}

const login = async(userData: IUserLoginData) => {
  const response = await axios.post(API_URL + 'login', userData)

  return response.data
}

const authService = {
  register,
  login
}

export default authService
