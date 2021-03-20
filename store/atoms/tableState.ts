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

export const truckFiltersState = atom({
	key: "truckFiltersState",
	default: {
		status: [0],
		weight: {
			min: undefined,
			max: undefined
		},
		age: undefined,
		gasoline: "ทั้งหมด",
		insurance: "ทั้งหมด",
		truck: {
			type: "ทั้งหมด",
			option: "ทั้งหมด",
		}
	}
})

export const driverFiltersState = atom({
	key: "driverFiltersState",
	default: {
		status: [0],
		driver_license_type: "ทั้งหมด",
		age: undefined
	}
})

export const filterTruckState = selector({
	key: "filterTruckState",
	set: ({set}, newValue: Object[]) => {
		set(tableDataState, newValue)
	},
	get: ({get}) => {
		const filterWord = get(filterWordState)
		const truckFilters = get(truckFiltersState)
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
		if (truckFilters.status[0] !== 0) {
			filteredData = filteredData.filter((item) => {
				return truckFilters.status.includes(item.status)
			})
		} 
		if (truckFilters.truck.type !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				const truckType = item.truck_type
				return (truckFilters.truck.type === truckType.type) && 
				(truckFilters.truck.option === "ทั้งหมด" ? true : (truckFilters.truck.option === truckType.option))
			})
		}
		if (truckFilters.age) {
			filteredData = filteredData.filter((item) => {
				return item.age <= truckFilters.age
			})
		}
		if (truckFilters.gasoline !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				return item.gasoline === truckFilters.gasoline
			})
		}
		if (truckFilters.insurance !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				return (truckFilters.insurance === "มี" && item.is_insure) || (truckFilters.insurance === "ไม่มี" && !item.is_insure)
			})
		}
		if (truckFilters.weight.min || truckFilters.weight.max) {
			const min = parseInt(truckFilters.weight.min) || 0
			const max = parseInt(truckFilters.weight.max) || 100
			filteredData = filteredData.filter((item) => {
				const truckWeight = item.weight
				return (parseInt(truckWeight.min) >= min && (parseInt(truckWeight.max) <= max))
			})
		}
		return filteredData
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

export const filterDriverState = selector({
	key: "filterDriverState",
	set: ({set}, newValue: Object[]) => {
		set(tableDataState, newValue)
	},
	get: ({get}) => {
		const filterWord = get(filterWordState)
		const driverFilters = get(driverFiltersState) 
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
		if (driverFilters.status[0] !== 0) {
			filteredData = filteredData.filter((item) => {
				return driverFilters.status.includes(item.status)
			})
		} 
		if (driverFilters.driver_license_type !== "ทั้งหมด") {
			filteredData = filteredData.filter((item) => {
				return (item.driver_license_type === driverFilters.driver_license_type) 
			})
		}
		if (driverFilters.age) {
			filteredData = filteredData.filter((item) => {
				return item.age <= driverFilters.age
			})
		}
		return filteredData
	}
})