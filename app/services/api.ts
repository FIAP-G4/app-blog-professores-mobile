import axios from 'axios'

const baseURL = process.env.CORS_ORIGIN || 'http://192.168.0.54:3000'

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
