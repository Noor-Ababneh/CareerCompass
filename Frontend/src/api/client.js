import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://careercompass-bngv.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default apiClient