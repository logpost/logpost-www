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
	default: [0]
})

export const filterLocationState = atom({
	key: "filterLocationState",
	default: {
		pickup: "ทั้งหมด",
		dropoff: "ทั้งหมด"
	}
})

export const filterState = selector({
	key: "filterFunction",
	get: ({get}) => {
		const filterWord = get(filterWordState)
		const filterStatus = get(filterStatusState)
		const filterLocation = get(filterLocationState)
		let filteredData = get(tableDataState)
		filteredData = filteredData.filter((item) => {
			const {status, ...restItem} = item
			return Object.values(restItem)
				.map((value) => {
					return String(value)
				})
				.find((value) => {
					return value.toLowerCase().includes(filterWord)
				})
		})
		if (filterStatus[0] !== 0) {
			filteredData = filteredData.filter((item) => {
				return filterStatus.includes(item.status)
			})
		} 
		if (filterLocation.pickup !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				return filterLocation.pickup === item.pickup_location
			})
		} 
		if (filterLocation.dropoff !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				return filterLocation.dropoff === item.dropoff_location
			})
		} 
		return filteredData
	}
});