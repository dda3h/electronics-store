import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../redux/reducers/user/slice'
import { getError, getIsLogged } from '../../redux/reducers/user/selectors'

import { AuthService } from '../../services'

import { EmailSVG, LockSVG, EyeSVG, CrossedOutEyeSVG } from '../../icons'

import styles from './Auth.module.scss'

export default function LoginPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const isLogged = useSelector(getIsLogged)
	const error = useSelector(getError)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const login = AuthService.useLogin()

	useEffect(() => {
		if (isLogged) navigate('/account')
	}, [isLogged])

	useEffect(() => {
		return () => {
			dispatch(setError(''))
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<div className={styles.intro}>
				<Link to='/'>
					<h1 className={styles.intro__logo}>
						El<span style={{ color: '#e61e41' }}>.</span>Store
					</h1>
				</Link>
				<p className={styles.intro__text}>Welcome Back</p>
			</div>

			<p className={styles.description}>Email</p>
			<div className={styles.inputWrapper} style={{ marginBottom: '0.85rem' }}>
				<EmailSVG
					className={`${styles.svg} ${email ? styles['svg--active'] : ''} `}
				/>
				<input
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Email'
					className={styles.input}
				/>
			</div>

			<p className={styles.description}>Password</p>
			<div className={styles.inputWrapper} style={{ marginBottom: '0.5rem' }}>
				<LockSVG
					className={`${styles.svg} ${password ? styles['svg--active'] : ''} `}
				/>
				<input
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Password'
					className={styles.input}
				/>
				<button onClick={() => setShowPassword(!showPassword)}>
					{showPassword 
						? <CrossedOutEyeSVG className={styles.hidePasswordSvg} />
						: <EyeSVG className={styles.hidePasswordSvg} />}
				</button>
			</div>

			<button>
				<span className={`${styles.smallText} ${styles.link}`}>
					Forgot password?
				</span>
			</button>

			<button onClick={() => login(email, password)} className={styles.button}>
				Sign In
			</button>

			{error && (
				<p className={styles.signup} style={{ color: '#ff0000' }}>{error}</p>
			)}

			<div style={{ textAlign: 'end', display: 'flex', marginTop: '0.3rem' }}>
				<p className={styles.signup}>
					Don't have an account?{' '}
					<Link to='/signup' className={styles.link}>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
