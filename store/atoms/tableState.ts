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

export const filterWeightState = atom({
	key: "filterWeightState",
	default: undefined
})

export const filterPriceState = atom({
	key: "filterPriceState",
	default: undefined
})

export const filterTruckState = atom({
	key: "filterTruckState",
	default: {
		type: "ทั้งหมด",
		option: "ทั้งหมด",
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
		const filterWeight = get(filterWeightState)
		const filterPrice = get(filterPriceState)
		const filterTruck = get(filterTruckState)
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
		if (filterWeight) {
			filteredData = filteredData.filter((item) => {
				return item.weight <= filterWeight
			})
		}
		if (filterPrice) {
			filteredData = filteredData.filter((item) => {
				return filterPrice <= item.offer_price
			})
		}
		if (filterTruck.type !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				const truckType = item.carrier_specification.truck.property
				return (filterTruck.type === truckType.type) && 
				(filterTruck.option === "ทั้งหมด" ? true : (filterTruck.option === truckType.option))
			})
		}
		return filteredData
	}
});