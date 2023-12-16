import { useSearchParams } from 'react-router-dom'

interface Props {
	filterList: { name: string; quantity: number }[]
	index: number
	param: string
}

export default function useChangeFilter() {
	const [searchParams, setSearchParams] = useSearchParams()

	const changeFilter = ({ filterList, index, param }: Props) => {
		const filterParam = searchParams.get(param)
		const selectedOption = filterList[index].name.replace(/ /g, '_')

		searchParams.delete('page')

		if (filterParam?.split(' ').includes(selectedOption)) {
			const newParam = filterParam.replace(selectedOption, '').replace(/\s+/g, ' ').trim()

			if (newParam) searchParams.set(param, newParam)
			else searchParams.delete(param)

			return setSearchParams(searchParams)
		}

		const newParam = (filterParam ? filterParam + ' ' : '') + selectedOption
		searchParams.set(param, newParam)
		setSearchParams(searchParams)
	}

	return changeFilter
}
