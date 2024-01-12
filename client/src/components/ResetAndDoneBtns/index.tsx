import styles from './styles.module.scss'

interface Props {
	condition?: boolean
	firstButtonName?: string
	resetFunc?: () => void
	doneFunc?: () => void
}

export default function ResetAndDoneBtns(props: Props) {
	return (
		<div className={styles.wrapper}>
			{props.condition && (
				<button onClick={props.resetFunc} className={styles.button}>
					{props.firstButtonName ?? 'Reset'}
				</button>
			)}

			<button onClick={props.doneFunc} className={styles.button}>
				Done
			</button>
		</div>
	)
}
