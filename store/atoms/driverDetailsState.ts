import { atom } from 'recoil';

export const driverDetailsState = atom({
	key: 'driver',
	default: {
		name: "",
		age: undefined,
		driver_license: "",
		driver_license_type: "ประเภท 1",
		identification_number: "",
		tel: ""
	} 
});

export const driverValidateState = atom({
	key: "isValidateDriver",
	default: {
		allInput: true,
		name: true,
		age: true,
		driver_license: true,
		identification_number: true,
		tel: true
	}
})
