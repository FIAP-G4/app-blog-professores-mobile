import axios from 'axios'

const baseURL = process.env.EXPO_PUBLIC_CORS_ORIGIN
console.log(baseURL)
const api = axios.create({
  baseURL: baseURL,
})

export default api
