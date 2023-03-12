import { API_ROOT, TIMEOUT } from '@/constants'
import axios from 'axios'

const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
})

export default instance
