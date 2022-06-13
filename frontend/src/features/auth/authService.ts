import axios from 'axios'

const API_URL = '/api/user/'


interface IUserData {
  name: string;
  email: string;
  password: string;
}

const register = async (userData: IUserData) => {
  const response = await axios.post(API_URL + 'register', userData)

  return response.data
}

const authService = {
  register
}

export default authService
