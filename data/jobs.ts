const MONTHS = [
	"มกราคม",
	"กุมภาพันธ์",
	"มีนาคม",
	"เมษายน",
	"พฤษภาคม",
	"มิถุนายน",
	"กรกฎาคม",
	"สิงหาคม",
	"กันยายน",
	"ตุลาคม",
	"พฤศจิกายน",
	"ธันวาคม"
]

const SHORT_MONTHS = [
	"ม.ค.",
	"ก.พ.",
	"มี.ค.",
	"เม.ย.",
	"พ.ค.",
	"มิ.ย.",
	"ก.ค.",
	"ส.ค.",
	"ก.ย.",
	"ต.ค.",
	"พ.ย.",
	"ธ.ค."
]

const PROVINCES = [
	"กรุงเทพมหานคร",
	"กระบี่",
	"กาญจนบุรี",
	"กาฬสินธุ์",
	"กำแพงเพชร",
	"ขอนแก่น",
	"จันทบุรี",
	"ฉะเชิงเทรา",
	"ชลบุรี",
	"ชัยนาท",
	"ชัยภูมิ",
	"ชุมพร",
	"เชียงใหม่",
	"เชียงราย",
	"ตรัง",
	"ตราด",
	"ตาก",
	"นครนายก",
	"นครปฐม",
	"นครพนม",
	"นครราชสีมา",
	"นครศรีธรรมราช",
	"นครสวรรค์",
	"นนทบุรี",
	"นราธิวาส",
	"น่าน",
	"บึงกาฬ",
	"บุรีรัมย์",
	"ปทุมธานี",
	"ประจวบคีรีขันธ์",
	"ปราจีนบุรี",
	"ปัตตานี",
	"พระนครศรีอยุธยา",
	"พะเยา",
	"พังงา",
	"พัทลุง",
	"พิจิตร",
	"พิษณุโลก",
	"เพชรบุรี",
	"เพชรบูรณ์",
	"แพร่",
	"ภูเก็ต",
	"มหาสารคาม",
	"มุกดาหาร",
	"แม่ฮ่องสอน",
	"ยโสธร",
	"ยะลา",
	"ร้อยเอ็ด",
	"ระนอง",
	"ระยอง",
	"ราชบุรี",
	"ลพบุรี",
	"ลำปาง",
	"ลำพูน",
	"เลย",
	"ศรีสะเกษ",
	"สกลนคร",
	"สงขลา",
	"สตูล",
	"สมุทรปราการ",
	"สมุทรสงคราม",
	"สมุทรสาคร",
	"สระแก้ว",
	"สระบุรี",
	"สิงห์บุรี",
	"สุโขทัย",
	"สุพรรณบุรี",
	"สุราษฎร์ธานี",
	"สุรินทร์",
	"หนองคาย",
	"หนองบัวลำภู",
	"อ่างทอง",
	"อำนาจเจริญ",
	"อุดรธานี",
	"อุตรดิตถ์",
	"อุทัยธานี",
	"อุบลราชธานี",
]

const JOB_STATUS_CODE = {
	100: {
		status_name: "รอผู้รับงาน",
		progress: 0,
		next: 200,
	},
	200: {
		status_name: "เตรียมเริ่มงาน",
		progress: 1,
		next: 400,
	},
	300: {
		status_name: "เตรียมเริ่มงาน",
		progress: 1,
		next: 400,
	},
	400: {
		status_name: "เดินทางไปรับสินค้า",
		progress: 2,
		next: 500,
	},
	500: {
		status_name: "นำสินค้าขึ้น ณ ต้นทาง",
		progress: 3,
		next: 600,
	},
	600: {
		status_name: "นำส่งสินค้า",
		progress: 4,
		next: 700,
	},
	700: {
		status_name: "นำสินค้าลง ณ ปลายทาง",
		progress: 5,
		next: 800,
	},
	800: {
		status_name: "ขนส่งเสร็จสิ้น",
		progress: 6,
	},
}

const DEFAULT_JOB = {
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
	weight: undefined,
	carrier_specification: { 
		truck: {
			age: undefined,
			property: {
				type: "รถ 4 ล้อ",
				option: "ตู้ทึบ",
			}
		},
		driver: {
			driver_license_type: "ประเภท 1"
		}
	},
	product_type: "",
	offer_price: undefined,
	auto_price: undefined,
	distance: undefined,
	duration: undefined,
	permission: "public",
}

export {
	MONTHS,
	JOB_STATUS_CODE,
	SHORT_MONTHS,
	DEFAULT_JOB,
	PROVINCES
}