import React from 'react'

import PressButton from '../../components/PressButton'

import styles from './styles.module.scss'

export default function NotFoundPage(): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Sorry, we can't find that page</h1>
      <h1 className={styles.header}>But we still have lots for you to discover</h1>

      <PressButton text={'back to homepage'} link="/" />
    </div>
  )
}
