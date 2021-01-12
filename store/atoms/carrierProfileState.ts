import { atom } from 'recoil';

export const truckStatusCountState = atom({
	key: 'truckStatus',
	default: {
		100: 0,
		200: 0,
		300: 0
	}, 
});

export const driverStatusCountState = atom({
	key: 'driverStatus',
	default: {
		100: 0,
		200: 0,
		300: 0,
	}, 
});

export const jobStatusCountState = atom({
	key: 'jobStatus',
	default: {
		0: 0,
		100: 0,
		800: 0
	}, 
});

export const myJobsState = atom({
	key: 'myJobs',
	default: [{
		pickup_location: {
			address: "",
			district: "",
			province: "",
			zipcode: "",
			latitude: 0,
			longitude: 0
		},
		dropoff_location: {
			address: "",
			district: "",
			province: "",
			zipcode: "",
			latitude: 0,
			longitude: 0
		},
		pickup_date: new Date,
		dropoff_date: new Date,
		weight: 0,
		carrier_specification: { 
			truck: {
				age: 5,
				property: {
					type: "รถ 4 ล้อ",
					option: "ตู้ทึบ",
				}
			},
			driver: {
				driver_license_type: "ประเภท 1",
			}
		},
		product_type: "ไม้",
		offer_price: 8000,
		auto_price: 4000,
		distance: 0,
		permission: "public"
	}], 
})