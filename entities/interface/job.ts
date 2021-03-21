import { CarrierSpecificationInterface } from "./carrier"
import { PlaceInterface } from "./googlemaps"

export interface LocationInterface {
	latitude: number
	longitude: number
	address: string
	province: string 
	district: string
	zipcode: string
}

export interface JobDetails {
	pickup_location: LocationInterface
	dropoff_location: LocationInterface 
	pickup_date: Date
	dropoff_date: Date
	weight: number
	carrier_specification: CarrierSpecificationInterface
	product_type: string
	offer_price: number
	auto_price: number
	description?: string
	distance: number
	duration: number
	permission: string
	waiting_time?: number
	geocoder_result?: PlaceInterface
}

export interface JobDocument extends JobDetails {
	job_id?: string 
	shipper_id?: string 
	carrier_id?: string
	driver_id?: string
	truck_id?: string
	shipper_display_name?: string
	carrier_display_name?: string
	driver_name?: string,
	license_number?: string,
	status?: number
	truck_type?: string
	created_at?: Date
	updated_at?: Date
}

export interface JobAddInterface {
	details: JobDetails
	setDetails: (jobDetails: JobDetails) => void
}

export interface JobFormField {
	pickup_location?: boolean,
	dropoff_location?: boolean,
	pickup_date?: boolean,
	dropoff_date?: boolean,
	weight?: boolean,
	carrier_specification?: boolean,
	product_type?: boolean,
	offer_price?: boolean,
	description?: boolean,
	waiting_time?: boolean
}

export interface JobFormInterface {
	changedField?: JobFormField
	setChangedField?: (changedField: JobFormField) => void
	mapID?: {
		pickupMapID: string,
		dropoffMapID: string,
		pickupAutoCompleteID: string,
		dropoffAutoCompleteID: string
	} 
}

export interface CountProvinceInterface {
	"กรุงเทพมหานคร": number,
	"กระบี่": number,
	"กาญจนบุรี": number,
	"กาฬสินธุ์": number,
	"กำแพงเพชร": number,
	"ขอนแก่น": number,
	"จันทบุรี": number,
	"ฉะเชิงเทรา": number,
	"ชลบุรี": number,
	"ชัยนาท": number,
	"ชัยภูมิ": number,
	"ชุมพร": number,
	"เชียงใหม่": number,
	"เชียงราย": number,
	"ตรัง": number,
	"ตราด": number,
	"ตาก": number,
	"นครนายก": number,
	"นครปฐม": number,
	"นครพนม": number,
	"นครราชสีมา": number,
	"นครศรีธรรมราช": number,
	"นครสวรรค์": number,
	"นนทบุรี": number,
	"นราธิวาส": number,
	"น่าน": number,
	"บึงกาฬ": number,
	"บุรีรัมย์": number,
	"ปทุมธานี": number,
	"ประจวบคีรีขันธ์": number,
	"ปราจีนบุรี": number,
	"ปัตตานี": number,
	"พระนครศรีอยุธยา": number,
	"พะเยา": number,
	"พังงา": number,
	"พัทลุง": number,
	"พิจิตร": number,
	"พิษณุโลก": number,
	"เพชรบุรี": number,
	"เพชรบูรณ์": number,
	"แพร่": number,
	"ภูเก็ต": number,
	"มหาสารคาม": number,
	"มุกดาหาร": number,
	"แม่ฮ่องสอน": number,
	"ยโสธร": number,
	"ยะลา": number,
	"ร้อยเอ็ด": number,
	"ระนอง": number,
	"ระยอง": number,
	"ราชบุรี": number,
	"ลพบุรี": number,
	"ลำปาง": number,
	"ลำพูน": number,
	"เลย": number,
	"ศรีสะเกษ": number,
	"สกลนคร": number,
	"สงขลา": number,
	"สตูล": number,
	"สมุทรปราการ": number,
	"สมุทรสงคราม": number,
	"สมุทรสาคร": number,
	"สระแก้ว": number,
	"สระบุรี": number,
	"สิงห์บุรี": number,
	"สุโขทัย": number,
	"สุพรรณบุรี": number,
	"สุราษฎร์ธานี": number,
	"สุรินทร์": number,
	"หนองคาย": number,
	"หนองบัวลำภู": number,
	"อ่างทอง": number,
	"อำนาจเจริญ": number,
	"อุดรธานี": number,
	"อุตรดิตถ์": number,
	"อุทัยธานี": number,
	"อุบลราชธานี": number,
}
