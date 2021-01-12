import axios from "axios"
import xml2js from 'xml2js'

const getOilPrice = async () => {
	const xml = `<?xml version="1.0" encoding="utf-8"?>
		<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
		<soap:Body>
			<CurrentOilPrice xmlns="http://www.pttor.com">
			<Language>string</Language>
			</CurrentOilPrice>
		</soap:Body>
		</soap:Envelope>`
	;
	try {
		const response = await axios.post('https://www.pttor.com/OilPrice.asmx',
			xml,
			{ headers: {
				'Content-Type': 'text/xml; charset=utf-8',
				'SOAPAction': 'http://www.pttor.com/CurrentOilPrice'
			}}
		)
		const options = {explicitArray: false, tagNameProcessors: [xml2js.processors.stripPrefix] };
		const builder = new xml2js.Builder();
		let oilPrice = []
		xml2js.parseString(response.data, options, (_, result) => {
			const oilPriceResult = result.Envelope.Body.CurrentOilPriceResponse.CurrentOilPriceResult;
			xml2js.parseString(oilPriceResult, (_, result) => {
				oilPrice = result.PTTOR_DS.FUEL
			})
		});
		console.log(oilPrice)
	} catch(error) {
		console.log(error.response)
	}
}

export const costCalculator = (distance: number) => {
	const tonPrice = 350
	const tax = 0.01
	const oilPrice = 8
	const depreciation = 800
	const driver = 400
	const fixedCost = 0.05
	const cost = (distance*oilPrice) + (distance*(oilPrice/2)) + ((driver+depreciation)* 1)
	return (cost + (cost * fixedCost) + (cost * tax)).toFixed(0)
}

export const offerCalculator = (weight: number) => {
	const autoPrice = (weight * 350)
	return (autoPrice * 0.1) + autoPrice || 0
}