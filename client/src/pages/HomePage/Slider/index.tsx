import React from 'react'
import { Link } from 'react-router-dom'

import { slides } from './slides'

import LeftArrow from '../../../icons/arrows/LeftArrow'
import RightArrow from '../../../icons/arrows/RightArrow'

import styles from './styles.module.scss'

export default function Slider(): React.ReactElement {
	const [activeSlideIndex, setActiveSlideIndex] = React.useState(0)
	const autoNextTimer = React.useRef<number>(0)

	const changeImage = (type: 'next' | 'prev') => {
		if (type === 'next' && activeSlideIndex === slides.length - 1)
			return setActiveSlideIndex(0)
		if (type === 'prev' && activeSlideIndex === 0)
			return setActiveSlideIndex(slides.length - 1)

		setActiveSlideIndex(activeSlideIndex + (type === 'next' ? 1 : -1))
	}

	React.useEffect(() => {
		clearTimeout(autoNextTimer.current)
		autoNextTimer.current = setTimeout(() => changeImage('next'), 5000)
	}, [activeSlideIndex])

	return (
		<div className={styles.wrapper}>
			<div
				style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
				className={styles.images}
			>
				{slides.map((slide, index) => (
					<img src={slide.image} className={styles.image} key={index} />
				))}
			</div>

			<button onClick={() => changeImage('prev')} className={styles.arrow}>
				<div className={styles.arrow__icon}>
					<LeftArrow />
				</div>
			</button>

			<button
				onClick={() => changeImage('next')}
				style={{ right: 0 }}
				className={styles.arrow}
			>
				<div className={styles.arrow__icon}>
					<RightArrow />
				</div>
			</button>

			<Link to={slides[activeSlideIndex].link} className={styles.imageDim}></Link>
		</div>
	)
}
