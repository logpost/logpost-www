const MOCKUP_JOB = {
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
	pickup_date: "",
	dropoff_date: "",
	weight: 1.2,
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
			driver_license_type: "ประเภท 1"
		}
	},
	description: "ไม่มี",
	product_type: "ไม้",
	offer_price: 8000,
	auto_price: 4000,
	distance: 250,
	permission: "public",
	waiting_time: 5
}

const MOCKUP_GOOGLE_ADDRESS = {
	non_bangkok: [
		{
			long_name: "แหลมทอง",
			short_name: "แหลมทอง",
			types: ["premise"]
		},
		{
			long_name: "ตำบลแสนสุข",
			short_name: "ตำบลแสนสุข",
			types: ["locality", "political"]
		},
		{
			long_name: "อำเภอเมืองชลบุรี",
			short_name: "อำเภอเมืองชลบุรี",
			types:["administrative_area_level_2", "political"]
		},
		{
			long_name: "ชลบุรี",
			short_name: "จ.ชลบุรี",
			types: ["administrative_area_level_1", "political"]
		},
		{
			long_name: "ประเทศไทย",
			short_name: "TH",
			types: ["country", "political"]
		},
		{
			long_name: "20130",
			short_name: "20130",
			types: ["postal_code"]
		}
	],
	bangkok: [
		{
			long_name: "28",
			short_name: "28",
			types: ["street_number"]
		},
		{
			long_name: "ถนน งามวงศ์วาน",
			short_name: "ถนน งามวงศ์วาน",
			types: ["route"]
		},
		{
			long_name: "แขวง ลาดยาว",
			short_name: "แขวง ลาดยาว",
			types: ["sublocality_level_2", "sublocality", "political"]
		},
		{
			long_name: "เขตจตุจักร",
			short_name: "เขตจตุจักร",
			types: ["sublocality_level_1", "sublocality", "political"]
		},
		{
			long_name: "กรุงเทพมหานคร",
			short_name: "กรุงเทพมหานคร",
			types: ["administrative_area_level_1", "political"]
		},
		{
			long_name: "ประเทศไทย",
			short_name: "TH",
			types: ["country", "political"]
		},
		{
			long_name: "10900",
			short_name: "10900",
			types: ["postal_code"]
		},
	],
	bangkok_2: [
		{
			long_name: "999/9",
			short_name: "999/9",
			types: ["street_number"]
		},
		{
			long_name: "ถนน พระรามที่ ๑",
			short_name: "ถนน พระรามที่ ๑",
			types: ["route"]
		},
		{
			long_name: "แขวง ปทุมวัน",
			short_name: "แขวง ปทุมวัน",
			types: ["sublocality_level_2", "sublocality", "political"]
		},
		{
			long_name: "เขตปทุมวัน",
			short_name: "เขตปทุมวัน",
			types: ["sublocality_level_1", "sublocality", "political"]
		},
		{
			long_name: "กรุงเทพมหานคร",
			short_name: "กรุงเทพมหานคร",
			types: ["administrative_area_level_1", "political"]
		},
		{
			long_name: "ประเทศไทย",
			short_name: "TH",
			types: ["country", "political"]
		},
		{
			long_name: "10330",
			short_name: "10330",
			types: ["postal_code"]
		}
	]
}

export {
	MOCKUP_JOB, MOCKUP_GOOGLE_ADDRESS
}