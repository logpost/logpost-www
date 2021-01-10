import { atom, selector } from 'recoil'

export const tableDataState = atom({
	key: "tableData",
	default: [], 
});

export const filterWordState = atom({
	key: "filterWordState",
	default: ""
})

export const filterStatusState = atom({
	key: "filterStatusState",
	default: "0"
})

export const filterState = selector({
	key: "filterFunction",
	get: ({get}) => {
		const filterWord = get(filterWordState)
		const filterStatus = get(filterStatusState)
		const data = get(tableDataState)
		const filteredDataByWord = data.filter((item) => {
			const {status, ...restItem} = item
			return Object.values(restItem)
				.map((value) => {
					return String(value)
				})
				.find((value) => {
					return value.toLowerCase().includes(filterWord)
				})
		})
		if (filterStatus !== "0") {
			const filteredDataByStatus = filteredDataByWord.filter((item) => {
				return String(item.status) === filterStatus
			})
			return filteredDataByStatus
		} else {
			return filteredDataByWord
		}
	}
});