import React from 'react'
import { useSearchParams } from 'react-router-dom'

import Item from './Item'
import Pagination from './Pagination'
import NotFound from './NotFound'

import useFilteredData from './useFilteredData'

import styles from './styles.module.scss'

export default function Items(): React.ReactElement {
  const data = useFilteredData()
  const [searchParams] = useSearchParams()

  const itemsPerPage = 5
  const pageCount = Math.ceil(data.length / itemsPerPage)
  const currentPage = Number(searchParams.get('page')) || 1
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const items = data.slice(firstIndex, lastIndex)

  if (!data.length) return <NotFound />

  return (
    <div className={styles.wrapper}>
      {items.map((item, index) => (
        <Item {...item} key={index} />
      ))}

      {pageCount > 1 && <Pagination pageCount={pageCount} />}
    </div>
  )
}
