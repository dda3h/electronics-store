import axios from 'axios'
import { AuthResponse } from './models/response/AuthResponse'

export const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_SERVER_URL
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

	return config
})

$api.interceptors.response.use(
	config => config,
	async err => {
		const originalRequest = err.config

		if (err.response.status === 401 && err.config && !err.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<AuthResponse>(
					`${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
					{ withCredentials: true }
				)
				localStorage.setItem('accessToken', response.data.accessToken)
				return $api.request(originalRequest)
			} catch (err) {
				console.error('Unauthorized')
			}
		}

		throw err
	}
)
