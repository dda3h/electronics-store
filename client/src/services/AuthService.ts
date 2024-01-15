import { $api } from '../axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { clearCart, updateItemList } from '../redux/reducers/cart/slice'
import { setError, setIsLogged, setIsRefreshed, setUser } from '../redux/reducers/user/slice'
import { getUser } from '../redux/reducers/user/selectors'
import { getCartItemList } from '../redux/reducers/cart/selectors'

import { CartService } from '.'

import { AuthResponse } from '../models/response/AuthResponse'
import { IUser } from '../models/IUser'

export function useLogin() {
	const dispatch = useDispatch()

	async function login(email: string, password: string) {
		try {
			const response = await $api.post<AuthResponse>('/auth/login', { email, password })
			localStorage.setItem('accessToken', response.data.accessToken)
			dispatch(setUser(response.data.user))
			dispatch(setIsRefreshed(false))
			dispatch(setIsLogged(true))
		} catch (e: any) {
			dispatch(setError(e.response?.data?.message))
		}
	}

	return login
}

export function useRegistration() {
	const dispatch = useDispatch()

	async function registration(name: string, email: string, password: string) {
		try {
			const response = await $api.post<AuthResponse>('/auth/registration', { name, email, password })
			localStorage.setItem('accessToken', response.data.accessToken)
			dispatch(setUser(response.data.user))
			dispatch(setIsRefreshed(false))
			dispatch(setIsLogged(true))
		} catch (e: any) {
			dispatch(setError(e.response?.data?.message))
		}
	}

	return registration
}

export function useLogout() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	async function logout() {
		try {
			navigate('/')
			await $api.post('/auth/logout')
			localStorage.removeItem('accessToken')
			dispatch(clearCart())
			dispatch(setUser({} as IUser))
			dispatch(setIsRefreshed(false))
			dispatch(setIsLogged(false))
		} catch (e: any) {
			console.error(e.response?.data?.message)
		}
	}

	return logout
}

export function useCheckAuth() {
	const dispatch = useDispatch()

	async function checkAuth() {
		try {
			const response = await axios.get<AuthResponse>(
				`${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
				{ withCredentials: true }
			)
			localStorage.setItem('accessToken', response.data.accessToken)
			dispatch(setUser(response.data.user))
			dispatch(setIsRefreshed(true))
			dispatch(setIsLogged(true))
		} catch (e: any) {
			console.error(e.response?.data?.message)
		}
	}

	return checkAuth
}

export function useUpdateCart() {
	const dispatch = useDispatch()
	const { id: userId } = useSelector(getUser)
	const cartItems = useSelector(getCartItemList)

	async function updateCart() {
		try {
			const dbCart = await CartService.getCart(userId)

			for (let i = 0; i < cartItems.length; i++) {
				if (dbCart.find(dbItem => dbItem.id === cartItems[i].id)) continue
				await CartService.addItem(userId, cartItems[i].id, cartItems[i].quantity)
			}

			localStorage.setItem('cart', JSON.stringify(await CartService.getCart(userId)))
			dispatch(updateItemList())
		} catch (e: any) {
			console.error(e.response?.data?.message)
		}
	}

	return updateCart
}
