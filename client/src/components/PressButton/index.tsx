import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

interface Props {
  link?: string
  text: string
}

export default function PressButton({ link, text }: Props): React.ReactElement {
  return (
    <Link to={link || '#'} style={{ minWidth: '20%' }}>
      <button className={styles.button}>{text}</button>
    </Link>
  )
}
