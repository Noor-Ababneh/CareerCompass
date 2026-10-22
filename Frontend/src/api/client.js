import axios from 'axios'

// إنشاء نسخة من axios مربوطة بالباك إند تبعك
const apiClient = axios.create({
  baseURL: 'https://careercompass-bngv.onrender.com', // رابط الباك إند (FastAPI)
  headers: {
    'Content-Type': 'application/json',
  }
})

export default apiClient