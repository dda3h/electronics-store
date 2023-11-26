import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getCartItemsQuantity } from '../../../redux/reducers/cart/selectors';
import { getIsLogged } from '../../../redux/reducers/user/selectors';

import HomeSVG from '../../../icons/Home';
import LoginSVG from '../../../icons/Login';
import CartSVG from '../../../icons/Cart';

import styles from './styles.module.scss';

export default function NavBar(): React.ReactElement {
  const itemsQuantity = useSelector(getCartItemsQuantity);

  const isLogged = useSelector(getIsLogged);

  return (
    <nav className={styles.wrapper}>
      <Link to="/">
        <button className={`${styles.button} ${styles.button__mobile}`}>
          <HomeSVG className={styles.button__svg} />
          <p className={styles.button__text}>Home</p>
        </button>
      </Link>

      <Link to={isLogged ? '/account' : '/login'}>
        <button className={styles.button}>
          <LoginSVG className={styles.button__svg} />
          <p className={styles.button__text}>{isLogged ? 'Account' : 'Login'}</p>
        </button>
      </Link>

      <Link to="/cart">
        <button className={styles.button}>
          <CartSVG className={styles.button__svg} />
          <p className={styles.button__text}>Cart</p>

          {itemsQuantity > 0 && (
            <span className={styles.cartQuantity}>
              <span>{itemsQuantity}</span>
            </span>
          )}
        </button>
      </Link>
    </nav>
  );
}
