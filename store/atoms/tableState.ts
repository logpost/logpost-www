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

export const jobFiltersState = atom({
	key: "jobFiltersState",
	default: {
		search: "",
		pickup_province: "ทั้งหมด",
		dropoff_province: "ทั้งหมด",
		status: [0],
		pickup_date: {
			isFilter: false,
			start: new Date(new Date().setHours(0, 0, 0, 0)),
			end: new Date(new Date().setHours(23, 59, 59, 999))
		},
		dropoff_date: {
			isFilter: false,
			start: new Date(new Date().setHours(0, 0, 0, 0)),
			end: new Date(new Date().setHours(23, 59, 59, 999))
		},
		weight: undefined,
		price: undefined,
		truck: {
			type: "ทั้งหมด",
			option: "ทั้งหมด",
		}
	}
})

export const filterResourceState = selector({
	key: "filterResourceState",
	set: ({set}, newValue: Object[]) => {
		set(tableDataState, newValue)
	},
	get: ({get}) => {
		const filterWord = get(filterWordState)
		const filterStatus = get(filterStatusState)
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
		return filteredData
	}
})

export const filterState = selector({
	key: "filterFunction",
	set: ({set}, newValue: Object[]) => {
		set(tableDataState, newValue)
	},
	get: ({get}) => {
		const filterWord = get(filterWordState)
		const jobFilter = get(jobFiltersState)
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
		if (jobFilter.status[0] !== 0) {
			filteredData = filteredData.filter((item) => {
				return jobFilter.status.includes(item.status)
			})
		} 
		if (jobFilter.pickup_province !== "ทั้งหมด" || jobFilter.dropoff_province !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				return (jobFilter.pickup_province === "ทั้งหมด" ? true : (jobFilter.pickup_province === item.pickup_location))
				&& (jobFilter.dropoff_province === "ทั้งหมด" ? true : (jobFilter.dropoff_province === item.dropoff_location))
			})
		} 
		if (jobFilter.pickup_date.isFilter) {
			filteredData = filteredData.filter((item) => {
				const pickup_date = new Date(item.pickup_date)
				return (pickup_date >= jobFilter.pickup_date.start) && (pickup_date <= jobFilter.pickup_date.end)
			})
		}
		if (jobFilter.dropoff_date.isFilter) {
			filteredData = filteredData.filter((item) => {
				const dropoff_date = new Date(item.dropoff_date)
				return (dropoff_date >= jobFilter.dropoff_date.start) && (dropoff_date <= jobFilter.dropoff_date.end)
			})
		}
		if (jobFilter.weight) {
			filteredData = filteredData.filter((item) => {
				return item.weight <= jobFilter.weight
			})
		}
		if (jobFilter.price) {
			filteredData = filteredData.filter((item) => {
				return jobFilter.price <= item.offer_price
			})
		}
		if (jobFilter.truck.type !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				const truckType = item.carrier_specification.truck.property
				return (jobFilter.truck.type === truckType.type) && 
				(jobFilter.truck.option === "ทั้งหมด" ? true : (jobFilter.truck.option === truckType.option))
			})
		}
		return filteredData
	}
});