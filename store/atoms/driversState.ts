import { atom } from 'recoil';

export const driversState = atom({
	key: 'driver',
	default: [{
		driver_id: "",
		status: 100,
		name: "",
		age: 18,
		driver_license: "",
		driver_license_type: "ประเภท 1",
		identification_number: "",
		tel: ""
	}], 
});