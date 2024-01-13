import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, subItem } from '../../../redux/reducers/cart/slice'
import { getIsLogged, getUser } from '../../../redux/reducers/user/selectors'
import { TItem } from '../../../types'

import { CartService } from '../../../services'

import styles from './Item.module.scss'

export default function Item(item: TItem) {
	const dispatch = useDispatch()

	const { id: userId } = useSelector(getUser)
	const isLogged = useSelector(getIsLogged)

	async function onClickAdd() {
		dispatch(addItem(item))

		if (isLogged) {
			const dbCart = await CartService.getCart(userId)

			if (dbCart.find(dbItem => dbItem.id === item.id)) {
				return CartService.incrementItem(userId, item.id)
			}

			CartService.addItem(userId, item.id, 1)
		}
	}

	function onClickSub() {
		if (item.quantity > 1) {
			dispatch(subItem(item))
			if (isLogged) CartService.decrementItem(userId, item.id)
		}
	}

	function onClickRemove() {
		dispatch(removeItem(item))
		if (isLogged) CartService.removeItem(userId, item.id)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.info}>
				<Link to={`/item/${item.id}`}>
					<img
						src={item.image}
						alt={item.title}
						className={styles.info__image}
					/>
				</Link>

				<div className={styles.info__text}>
					<h1 className={styles.info__title}>
						<Link to={`/item/${item.id}`}>{item.title}</Link>
					</h1>

					<p className={styles.info__description}>
						<Link to={`/item/${item.id}`}>{item.description}</Link>
					</p>
				</div>
			</div>

			<div className={styles.management}>
				<div className={styles.quantity}>
					<button
						onClick={onClickSub}
						className={`${styles.button} ${
							item.quantity === 1 ? styles['button--disabled'] : ''
						}`}
					>
						<span>-</span>
					</button>

					<h1 style={{ fontWeight: '700' }}>{item.quantity}</h1>

					<button onClick={onClickAdd} className={styles.button}>
						<span>+</span>
					</button>
				</div>

				<h1 style={{ fontWeight: '700' }}>${item.price}</h1>

				<button onClick={onClickRemove} className={styles.button}>
					<span>x</span>
				</button>
			</div>
		</div>
	)
}
