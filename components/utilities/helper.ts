import { SHORT_MONTHS } from "../../data/jobs"
import { DriverDetails, DriverDocument } from "../../entities/interface/driver"
import { TruckDocument } from "../../entities/interface/truck"
import { JobDocument } from '../../entities/interface/job'

export const filterData = (
	data: Object[],
	filter: string,
) => {
	const filteredData = data.filter((item) => {
		return Object.values(item)
			.map((value) => {
				return String(value)
			})
			.find((value) => {
				return value.toLowerCase().includes(filter)
			})
	})
	return filteredData
}

export const pad = (num: string, size: number) => {
	while (num.length < size) num = "0" + num;
	return num;
}

export const dateFormatter = (inputDate: Date) => {
	const fullDate = new Date(inputDate)
	const year = fullDate.getFullYear()
	const month = fullDate.getMonth()
	const date = fullDate.getDate()
	const shortThaiYear = String(year + 543).slice(2, 4)
	const formattedDate = `${date} ${SHORT_MONTHS[month]} ${shortThaiYear}`
	return formattedDate
}

export const timeFormatter = (inputDate: Date) => {
	const fullDate = new Date(inputDate)
	const hour = pad(String(fullDate.getHours()), 2)
	const minute = pad(String(fullDate.getMinutes()), 2)
	const formattedTime = `${hour}:${minute} น.`
	return formattedTime
}

interface AddressComponentInterface {
	long_name: string
	short_name: string
	types: string[]
}

export const extractAddress = (addressComponents: AddressComponentInterface[]) => {
	let address = {
		address: "",  
		province: "",
		district: "",
		zipcode: "",	
	}
	const addressType = ["premise", "route", "street_number", "sublocality_level_2", "locality"]
	const districtType = ["administrative_area_level_2", "sublocality_level_1"]
	const addressTypeChecker = (inputType: string[], targetType: string[]) => targetType.some((type: string) => inputType.includes(type))
	const addressList = []
	addressComponents.map((addressComponent) => {
		const isAddressType = addressTypeChecker(addressComponent.types, addressType)
		const isDistrictType = addressTypeChecker(addressComponent.types, districtType)
		const isProvinceType = addressComponent.types.includes("administrative_area_level_1")
		const isZipcodeType = addressComponent.types.includes("postal_code")
		if (isDistrictType) {
			address.district = addressComponent.long_name
		} else if (isProvinceType) {
			address.province = (addressComponent.long_name).replace("จังหวัด", "")
		} else if (isZipcodeType) {
			address.zipcode = addressComponent.long_name
		} else if (isAddressType) {
			addressList.push(addressComponent.long_name)
		}
	})
	address.address = addressList.join(" ")
	return address
}

export const getAddressFromPlace = (place: google.maps.places.PlaceResult | google.maps.GeocoderResult) => {
	if (place !== null) {
		const extractedAddress = extractAddress(place.address_components)
		return {
			latitude: place.geometry.location.lat(),
			longitude: place.geometry.location.lng(),
			...extractedAddress
		}
	}
}

export const resourceStatusCount = (
	resources: (DriverDocument | TruckDocument | JobDocument)[], 
	initialValue: {[key: number]: number},
	setValue: (value: {[key: number]: number}) => void) => {
	const countStatus = initialValue
	if (resources.length > 0) {
		resources.map((item) => {
			if (countStatus[item.status] !== undefined) {
				countStatus[item.status] += 1
			} else {
				countStatus[0] += 1
			}
		})
	}
	setValue(countStatus)
}

export const validateDriverDetails = (driverDetails: DriverDetails) => {
	const isNameValid = (driverDetails.name !== "")
	const isAgeValid = (driverDetails.age > 18)
	const isDriverLicenseValid = (driverDetails.driver_license.length === 8)
	const isIDNumberValid = (driverDetails.identification_number.length === 13)
	const isTelValid = (/^0[0-9]{9}/.test(driverDetails.tel))
	const AllInputsValid = (isNameValid && isAgeValid && isDriverLicenseValid && isIDNumberValid && isTelValid)
	return {
		allInput: AllInputsValid,
		name: isNameValid,
		age: isAgeValid,
		driver_license: isDriverLicenseValid,
		identification_number: isIDNumberValid,
		tel: isTelValid
	}
}