import { $api } from '../axios'

import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const login = (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
	return $api.post<AuthResponse>('/auth/login', { email, password })
}

export const registration = (name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
	return $api.post<AuthResponse>('/auth/registration', { name, email, password })
}

export const logout = (): Promise<void> => {
	return $api.post('/auth/logout')
}
