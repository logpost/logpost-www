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
			address.province = addressComponent.long_name
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
	const extractedAddress = extractAddress(place.address_components)
	return {
		latitude: place.geometry.location.lat(),
		longitude: place.geometry.location.lng(),
		...extractedAddress
	}
}