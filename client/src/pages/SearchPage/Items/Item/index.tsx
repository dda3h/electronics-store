import React from 'react'
import { Link } from 'react-router-dom'

import { TItems } from '../../../../types'

import styles from './styles.module.scss'

export default function Item(item: TItems): React.ReactElement {
	return (
		<div className={styles.wrapper}>
			<Link to={`/item/${item.id}`}>
				<img src={item.image} alt={item.title} className={styles.image} />
			</Link>

			<div>
				<h1 className={styles.title}>
					<Link to={`/item/${item.id}`}>
						{item.title} <span className={styles.description}> / {item.description}</span>
					</Link>
				</h1>

				<p className={styles.rating}>
					⭐️ {String(item.rating).indexOf('.') === -1 ? <span>{item.rating}.0</span> : item.rating}{' '}
					<span className={styles.rating__quantity}>&middot; {item.reviewsQuantity} reviews</span>
				</p>

				<p className={styles.price}>${item.price}</p>
			</div>
		</div>
	)
}
