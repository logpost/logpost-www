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

export const filterPickupDateState = atom({
	key: "filterPickupDateState",
	default: {
		isFilter: false,
		start: new Date(),
		end: new Date()
	}
})

export const filterDropoffDateState = atom({
	key: "filterDropoffDateState",
	default: {
		isFilter: false,
		start: new Date(),
		end: new Date()
	}
})

export const filterState = selector({
	key: "filterFunction",
	get: ({get}) => {
		const filterWord = get(filterWordState)
		const filterStatus = get(filterStatusState)
		const filterLocation = get(filterLocationState)
		const filterPickupDate = get(filterPickupDateState)
		const filterDropoffDate = get(filterDropoffDateState)
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
		if (filterPickupDate.isFilter) {
			filteredData = filteredData.filter((item) => {
				const pickup_date = new Date(item.pickup_date)
				return (pickup_date >= filterPickupDate.start) && (pickup_date <= filterPickupDate.end)
			})
		}
		if (filterDropoffDate.isFilter) {
			filteredData = filteredData.filter((item) => {
				const dropoff_date = new Date(item.dropoff_date)
				return (dropoff_date >= filterDropoffDate.start) && (dropoff_date <= filterDropoffDate.end)
			})
		}
		return filteredData
	}
});