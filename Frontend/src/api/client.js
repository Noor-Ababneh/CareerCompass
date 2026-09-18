import axios from 'axios'

// إنشاء نسخة من axios مربوطة بالباك إند تبعك
const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // رابط الباك إند (FastAPI)
  headers: {
    'Content-Type': 'application/json',
  }
})

export default apiClient