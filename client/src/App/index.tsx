import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getCartItemList } from '../redux/reducers/cart/selectors'

import { AuthController } from '../controllers'

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

export default function App(): React.ReactElement {
  const cartItemList = useSelector(getCartItemList)

  const location = useLocation()
  const hideHeaderFooter = ['/signup', '/login'].includes(location.pathname)

  const checkAuth = AuthController.useCheckAuth()

  React.useEffect(() => {
    const json = JSON.stringify(cartItemList)
    localStorage.setItem('cart', json)
  }, [cartItemList])

  React.useEffect(() => {
    if (localStorage.getItem('accessToken')) checkAuth()
  }, [])

  return (
    <>
      <div>
        {!hideHeaderFooter && (
          <div>
            <Header />
          </div>
        )}

        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>

      {!hideHeaderFooter && (
        <div>
          <Footer />
        </div>
      )}
    </>
  )
}
