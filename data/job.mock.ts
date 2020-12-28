const MOCKUP_JOB = {
	shipper_id: "01",
	carrier_id: "",
	driver_name: "",
	license_number: "",
	pickup_location: "กรุงเทพ",
	dropoff_location: "ชลบุรี",
	pickup_date: "",
	dropoff_date: "",
	weight: 1.2,
	carrier_specification: { 
		truck: {
			age: 5,
			type: {
				wheel: "4",
				options: "ตู้ทึบ"
			}
		},
		driver: {
			driver_license_type: "ประเภท 1"
		}
	},
	description: "ไม่มี",
	product_type: "ไม้",
	offer_price: 8000,
	auto_price: 4000,
	status: 100,
	distance: 250,
	permission: "pubilc",
	waiting_time: 5
}

export {
	MOCKUP_JOB
}