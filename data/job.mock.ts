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

const MOCKUP_OPTIMIZED_JOBS = {
	"summary": {
		"0": {
			"sum_cost": 3658.0492,
			"sum_offer": 10000,
			"profit": 6341.9508000000005,
			"distance_to_origin": 148957.3,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-02-20 01:00:00 +0000 UTC"
		},
		"1": {
			"sum_cost": 7381.8336,
			"sum_offer": 14000,
			"profit": 6618.1664,
			"distance_to_origin": 171131.4,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-01-26 05:00:00 +0000 UTC"
		},
		"2": {
			"sum_cost": 10873.890800000001,
			"sum_offer": 15200,
			"profit": 4326.109199999999,
			"distance_to_origin": 71855.9,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-01-26 00:00:00 +0000 UTC"
		},
		"3": {
			"sum_cost": 14627.0316,
			"sum_offer": 18060,
			"profit": 3432.9683999999997,
			"distance_to_origin": 189088.3,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-01-30 05:30:00 +0000 UTC"
		},
		"4": {
			"sum_cost": 18748.7436,
			"sum_offer": 23560,
			"profit": 4811.256399999998,
			"distance_to_origin": 0,
			"start_date": "2021-02-18 23:00:00 +0000 UTC",
			"end_date": "2021-03-26 11:00:00 +0000 UTC"
		}
	},
	"history": {
		"0": {
			"job_id": "602ccfee4b38d4000edc94e8",
			"carrier_id": "000000000000000000000000",
			"offer_price": 10000,
			"weight": 20,
			"duration": 18368,
			"waiting_time": 0,
			"distance": 340.454,
			"product_type": "ปุ๋ยนกแงว",
			"permission": "public",
			"pickup_date": "2021-02-18T23:00:00Z",
			"dropoff_date": "2021-02-20T01:00:00Z",
			"pickup_location": {
				"latitude": 13.6494163,
				"longitude": 99.8500984,
				"address": "Thai Tan ตำบล คลองตาคต",
				"province": "ราชบุรี",
				"district": "อำเภอโพธาราม",
				"zipcode": "70120"
			},
			"dropoff_location": {
				"latitude": 14.1161121,
				"longitude": 101.7732958,
				"address": "ตลาด ตำบล สำพันตา",
				"province": "ปราจีนบุรี",
				"district": "อำเภอนาดี",
				"zipcode": "25220"
			},
			"status": 100,
			"visited": true,
			"cost": 2723.632
		},
		"1": {
			"job_id": "600e7a786b1a50000edc95a0",
			"carrier_id": "000000000000000000000000",
			"offer_price": 4000,
			"weight": 12,
			"duration": 4438,
			"waiting_time": 0,
			"distance": 75.867,
			"product_type": "สินค้า",
			"permission": "public",
			"pickup_date": "2021-01-26T01:30:00Z",
			"dropoff_date": "2021-01-26T05:00:00Z",
			"pickup_location": {
				"latitude": 13.6767054,
				"longitude": 100.7224837,
				"address": "ถนนกิ่งแก้ว ตำบลราชาเทวะ",
				"province": "สมุทรปราการ",
				"district": "อำเภอบางพลี",
				"zipcode": ""
			},
			"dropoff_location": {
				"latitude": 13.970653,
				"longitude": 100.3414934,
				"address": "ถนน บางกรวย - กรุงเทพ ตำบลไทรน้อย",
				"province": "นนทบุรี",
				"district": "อำเภอไทรน้อย",
				"zipcode": "11150"
			},
			"status": 100,
			"visited": true,
			"cost": 606.936
		},
		"2": {
			"job_id": "600e87af6b1a50000edc969d",
			"carrier_id": "000000000000000000000000",
			"offer_price": 1200,
			"weight": 1,
			"duration": 3947,
			"waiting_time": 0,
			"distance": 78.668,
			"product_type": "สินค้าบรรจุลัง",
			"permission": "public",
			"pickup_date": "2021-01-25T21:00:00Z",
			"dropoff_date": "2021-01-26T00:00:00Z",
			"pickup_location": {
				"latitude": 14.200357,
				"longitude": 100.650232,
				"address": "ตำบล ลำไทร",
				"province": "พระนครศรีอยุธยา",
				"district": "อำเภอวังน้อย",
				"zipcode": "13170"
			},
			"dropoff_location": {
				"latitude": 13.6117233,
				"longitude": 100.7323332,
				"address": "",
				"province": "สมุทรปราการ",
				"district": "อำเภอบางพลี",
				"zipcode": ""
			},
			"status": 100,
			"visited": true,
			"cost": 629.344
		},
		"3": {
			"job_id": "600ec9493cae9c000e24dcca",
			"carrier_id": "000000000000000000000000",
			"offer_price": 2860,
			"weight": 22,
			"duration": 4723,
			"waiting_time": 0,
			"distance": 83.811,
			"product_type": "ขยะแห้ง",
			"permission": "public",
			"pickup_date": "2021-01-30T02:30:00Z",
			"dropoff_date": "2021-01-30T05:30:00Z",
			"pickup_location": {
				"latitude": 14.0786882,
				"longitude": 101.0259275,
				"address": "",
				"province": "นครนายก",
				"district": "อำเภอองครักษ์",
				"zipcode": ""
			},
			"dropoff_location": {
				"latitude": 14.6382852,
				"longitude": 101.1289634,
				"address": "ตำบลมิตรภาพ",
				"province": "สระบุรี",
				"district": "อำเภอมวกเหล็ก",
				"zipcode": "18180"
			},
			"status": 100,
			"visited": true,
			"cost": 670.488
		},
		"4": {
			"job_id": "600e6b5e63b812000e4532e4",
			"carrier_id": "000000000000000000000000",
			"offer_price": 5500,
			"weight": 5,
			"duration": 9870,
			"waiting_time": 0,
			"distance": 188.297,
			"product_type": "เหล็ก 10 เมตร",
			"permission": "public",
			"pickup_date": "2021-01-25T06:00:00Z",
			"dropoff_date": "2021-03-26T11:00:00Z",
            "pickup_location": {
				"latitude": 14.0786882,
				"longitude": 101.0259275,
				"address": "",
				"province": "นครนายก",
				"district": "อำเภอองครักษ์",
				"zipcode": ""
			},
			"dropoff_location": {
				"latitude": 14.6382852,
				"longitude": 101.1289634,
				"address": "ตำบลมิตรภาพ",
				"province": "สระบุรี",
				"district": "อำเภอมวกเหล็ก",
				"zipcode": "18180"
			},
			"status": 100,
			"visited": true,
			"cost": 670.488
        }
    }
}

export {
	MOCKUP_JOB, MOCKUP_GOOGLE_ADDRESS, MOCKUP_OPTIMIZED_JOBS
}