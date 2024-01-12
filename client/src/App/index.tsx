import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { updateItemList } from '../redux/reducers/cart/slice'
import { getCartItemList } from '../redux/reducers/cart/selectors'
import { getIsLogged, getIsRefreshed, getUser } from '../redux/reducers/user/selectors'

import { AuthService, CartService } from '../services'

import HomePage from '../pages/HomePage'
import ItemPage from '../pages/ItemPage'
import CartPage from '../pages/CartPage'
import SearchPage from '../pages/SearchPage'
import SignupPage from '../pages/Auth/SignupPage'
import LoginPage from '../pages/Auth/LoginPage'
import AccountPage from '../pages/AccountPage'
import NotFoundPage from '../pages/NotFoundPage'

import Header from '../components/Header'
import Footer from '../components/Footer'

import styles from './styles.module.scss'

export default function App() {
	const dispatch = useDispatch()

	const cartItemList = useSelector(getCartItemList)
	const isLogged = useSelector(getIsLogged)
	const isRefreshed = useSelector(getIsRefreshed)
	const { id: userId } = useSelector(getUser)

	const location = useLocation()
	const hideHeaderFooter = ['/signup', '/login'].includes(location.pathname)

	const checkAuth = AuthService.useCheckAuth()
	const updateCart = AuthService.useUpdateCart()

	useEffect(() => {
		(async () => {
			if (isRefreshed) {
				localStorage.setItem('cart', JSON.stringify(await CartService.getCart(userId)))
				dispatch(updateItemList())
			}
		})()
	}, [isRefreshed])

	useEffect(() => {
		if (isLogged && !isRefreshed) updateCart()
	}, [isLogged])

	useEffect(() => {
		const json = JSON.stringify(cartItemList)
		localStorage.setItem('cart', json)
	}, [cartItemList])

	useEffect(() => {
		if (localStorage.getItem('accessToken')) checkAuth()
	}, [])

	return (
		<>
			<div>
				{hideHeaderFooter || (
					<div>
						<Header />
					</div>
				)}

				<div className={styles.content}>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/item/:id' element={<ItemPage />} />
						<Route path='/cart' element={<CartPage />} />
						<Route path='/search' element={<SearchPage />} />
						<Route path='/signup' element={<SignupPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/account' element={<AccountPage />} />
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</div>
			</div>

			{hideHeaderFooter || (
				<div>
					<Footer />
				</div>
			)}
		</>
	)
}
