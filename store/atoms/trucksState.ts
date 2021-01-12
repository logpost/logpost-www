import { atom } from 'recoil';

export const trucksState = atom({
	key: 'trucks',
	default: [{
		truck_id: "",
		status: 100,
		license_number: "",
		gasoline: "ดีเซล",
		age: 0,
		is_insure: false,
		property: {
			type: "รถ 4 ล้อ",
			option: "ตู้ทึบ",
		},
		weight: {
			max: 0,
			min: 0
		},
	}], 
});