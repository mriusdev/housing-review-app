import axios from 'axios'

const API_URL = '/api/user/'

const getProfile = async () => {
  const response = await axios.post(API_URL + 'profile')

  return response.data
}

const privateProfileService = {
  getProfile,
}

export default privateProfileService
