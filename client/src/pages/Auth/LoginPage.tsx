import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getIsLogged } from '../../redux/reducers/user/selectors';

import { AuthController } from '../../controllers';

import EmailSVG from '../../icons/Email';
import LockSVG from '../../icons/Lock';
import EyeSVG from '../../icons/Eye';
import CrossedOutEyeSVG from '../../icons/CossedOutEye';

import styles from './styles.module.scss';

export default function LoginPage(): React.ReactElement {
  const navigate = useNavigate();

  const isLogged = useSelector(getIsLogged);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const login = AuthController.useLogin();

  React.useEffect(() => {
    if (isLogged) navigate('/account');
  }, [isLogged]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <Link to="/">
          <h1 className={styles.intro__logo}>
            El<span style={{ color: '#e61e41' }}>.</span>Store
          </h1>
        </Link>
        <p className={styles.intro__text}>Welcome Back</p>
      </div>

      <p className={styles.description}>Email</p>
      <div className={styles.inputWrapper} style={{ marginBottom: '0.85rem' }}>
        <EmailSVG className={`${styles.svg} ${email ? styles['svg--active'] : ''} `} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.input}
        />
      </div>

      <p className={styles.description}>Password</p>
      <div className={styles.inputWrapper} style={{ marginBottom: '0.5rem' }}>
        <LockSVG className={`${styles.svg} ${password ? styles['svg--active'] : ''} `} />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <CrossedOutEyeSVG className={styles.hidePasswordSvg} />
          ) : (
            <EyeSVG className={styles.hidePasswordSvg} />
          )}
        </button>
      </div>

      <p>
        <span onClick={() => setIsModalOpen(true)} className={`${styles.smallText} ${styles.link}`}>
          Forgot password?
        </span>
      </p>
      <div style={isModalOpen ? { top: '50%' } : { top: '-50%' }} className={styles.modal}>
        <p>Looks like your problem. Create a new account then.</p>
        <button onClick={() => navigate('/signup')} className={styles.modal__button}>
          Sign In
        </button>
      </div>
      {isModalOpen && <div onClick={() => setIsModalOpen(false)} className={styles.modal__dim}></div>}

      <button onClick={() => login(email, password)} className={styles.button}>
        Sign In
      </button>

      <div style={{ textAlign: 'end', display: 'flex', marginTop: '0.3rem' }}>
        <p className={styles.signup}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
