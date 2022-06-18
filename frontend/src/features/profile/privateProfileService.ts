import axios from 'axios'

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

const privateProfileService = {
  getProfile,
}

export default privateProfileService
