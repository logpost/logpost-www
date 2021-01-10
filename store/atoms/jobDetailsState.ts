import { atom } from 'recoil';

export const jobDetailsState = atom({
	key: 'jobDetails',
	default: {
		shipper_id: "",
		carrier_id: "",
		shipper_display_name: "",
		carrier_display_name: "",
		status: 100,
		pickup_location: {
			address: "",
			district: "",
			province: "",
			zipcode: "",
			latitude: null,
			longitude: null
		},
		dropoff_location: {
			address: "",
			district: "",
			province: "",
			zipcode: "",
			latitude: null,
			longitude: null
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
					chassis: null
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
	}, 
});