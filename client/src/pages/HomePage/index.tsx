import React from 'react'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { fetchItems } from '../../redux/reducers/items/asyncActions'
import { getItemsArray } from '../../redux/reducers/items/selectors'

import Slider from './Slider'
import Item from './Item'

import styles from './styles.module.scss'

export default function HomePage(): React.ReactElement {
  const dispatch = useAppDispatch()

  const items = useSelector(getItemsArray)

  React.useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <div>
      <Slider />

      <div className={styles.items}>
        {items.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
    </div>
  )
}
