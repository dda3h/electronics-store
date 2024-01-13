import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getIsLogged } from '../../redux/reducers/user/selectors'

import { AuthService } from '../../services'

import { AddUserSVG, EmailSVG, LockSVG, EyeSVG, CrossedOutEyeSVG } from '../../icons'

import styles from './Auth.module.scss'

export default function SignupPage() {
	const navigate = useNavigate()

	const isLogged = useSelector(getIsLogged)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [showPassword, setShowPassword] = useState(false)

	const registration = AuthService.useRegistration()

	useEffect(() => {
		if (isLogged) navigate('/account')
	}, [isLogged])

	return (
		<div className={styles.wrapper}>
			<div className={styles.intro}>
				<Link to='/'>
					<h1 className={styles.intro__logo}>
						El<span style={{ color: '#e61e41' }}>.</span>Store
					</h1>
				</Link>
				<p className={styles.intro__text}>Create Your Account</p>
			</div>

			<p className={styles.description}>Name</p>
			<div className={styles.inputWrapper} style={{ marginBottom: '0.85rem' }}>
				<AddUserSVG
					className={`${styles.svg} ${name ? styles['svg--active'] : ''} `}
				/>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Name'
					className={styles.input}
				/>
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
					placeholder='Password (8-20 characters)'
					className={styles.input}
				/>
				<button onClick={() => setShowPassword(!showPassword)}>
					{showPassword 
						? <CrossedOutEyeSVG className={styles.hidePasswordSvg} />
						: <EyeSVG className={styles.hidePasswordSvg} />}
				</button>
			</div>

			<button
				onClick={() => registration(name, email, password)}
				className={styles.button}
			>
				Create Account
			</button>

			<div style={{ textAlign: 'end', display: 'flex', marginTop: '0.3rem' }}>
				<p className={styles.signup}>
					Already have an account?{' '}
					<Link to='/login' className={styles.link}>
						Log in
					</Link>
				</p>
			</div>
		</div>
	)
}
