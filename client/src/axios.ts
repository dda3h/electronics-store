import axios from 'axios'
import { AuthResponse } from './models/response/AuthResponse'

export const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_SERVER_URL}/auth/refresh`, {
          withCredentials: true
        })
        localStorage.setItem('accessToken', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (error) {
        console.error('Unauthorized')
      }
    }

    throw error
  }
)
