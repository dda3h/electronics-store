import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { fetchItems } from '../../redux/reducers/items/asyncActions'
import { getItemsArray } from '../../redux/reducers/items/selectors'

import Slider from './Slider'
import Item from './Item'

import styles from './HomePage.module.scss'

export default function HomePage() {
	const dispatch = useAppDispatch()

	const items = useSelector(getItemsArray)

	useEffect(() => {
		dispatch(fetchItems())
	}, [])

	return (
		<div>
			<Slider />

			<div className={styles.items}>
				{items.map((item, i) => (
					<Item {...item} key={i} />
				))}
			</div>
		</div>
	)
}
