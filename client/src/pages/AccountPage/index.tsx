import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getIsLogged, getUser } from '../../redux/reducers/user/selectors'

import { AuthController } from '../../controllers'

import styles from './styles.module.scss'

export default function AccountPage(): React.ReactElement {
  const navigate = useNavigate()
  const logout = AuthController.useLogout()

  const user = useSelector(getUser)
  const isLogged = useSelector(getIsLogged)

  React.useEffect(() => {
    if (!isLogged) navigate('/login')
  }, [isLogged])

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.welcome}>Welcome, {user.name}</h1>

      <div className={styles.info}>
        <div className={styles.info__block}>
          <p>Name</p>
          <p className={styles.info__key}>{user.name}</p>
          {/* <button className={styles.changeButton}>Change</button> */}
        </div>

        <hr style={{ height: '1px', backgroundColor: '#ddd' }} />

        <div className={styles.info__block}>
          <p>Email</p>
          <p className={styles.info__key}>{user.email}</p>
          {/* <button className={styles.changeButton}>Change</button> */}
        </div>

        <hr style={{ height: '1px', backgroundColor: '#ddd' }} />

        <div className={styles.info__block}>
          <p>Password</p>
          <p>••••••••</p>
          {/* <button className={styles.changeButton}>Change</button> */}
        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>

        <button onClick={() => navigate('/')} className={styles.logoutButton}>
          Back to the home page
        </button>
      </div>
    </div>
  )
}
