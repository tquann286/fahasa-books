import axios from 'axios'

const API_ROOT = import.meta.env.VITE_APP_API_URI
const TIMEOUT = import.meta.env.TIMEOUT || 10000

const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
})

export default instance
