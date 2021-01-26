import { atom, selector } from 'recoil';

export const truckDetailsState = atom({
	key: 'trucks',
	default: {
		license_number: "",
		gasoline: "ดีเซล",
		age: undefined,
		is_insure: false,
		property: {
			type: "รถ 4 ล้อ",
            option: "ตู้ทึบ",
            chassis: null
		},
		weight: {
			max: undefined,
			min: undefined
		}
    }, 
});

export const truckPropertySelector = selector({
	key: "truckPropertySelector",
	get: ({get}) => {
		const { property } = get(truckDetailsState)
		return property
	}
})

export const truckWeightSelector = selector({
	key: "truckWeightSelector",
	get: ({get}) => {
		const { weight } = get(truckDetailsState)
		return weight
	}
})

