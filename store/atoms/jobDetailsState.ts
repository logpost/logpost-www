import { atom, selector } from 'recoil';
import { DEFAULT_JOB } from '../../data/jobs';

export const jobDetailsState = atom({
	key: 'jobDetails',
	default: {
		...DEFAULT_JOB,
		waiting_time: "",
		description: "",
		geocoder_result: {
			pickup: {},
			dropoff: {}
		}
	}
});

export const jobStepOneSelector = selector({
	key: "jobStepOneSelector",
	get: ({get}) => {
		const jobDetails = get(jobDetailsState)
		return {
			pickup_location: jobDetails.pickup_location,
			dropoff_location: jobDetails.dropoff_location,
			pickup_date: jobDetails.pickup_date,
			dropoff_date: jobDetails.dropoff_date,
			duration: jobDetails.duration,
			distance: jobDetails.distance,
			geocoder_result: null
		}
	}
})

export const jobStepTwoSelector = selector({
	key: "jobStepTwoSelector",
	get: ({get}) => {
		const jobDetails = get(jobDetailsState)
		return {
			product_type: jobDetails.pickup_location,
			weight: String(jobDetails.weight),
			waiting_time: String(jobDetails.waiting_time),
			offer_price: String(jobDetails.offer_price),
			description: jobDetails.description,
		}
	}
})

export const jobStepThreeSelector = selector({
	key: "jobStepThreeSelector",
	get: ({get}) => {
		const jobDetails = get(jobDetailsState)
		return {
			carrier_specification: jobDetails.carrier_specification,
		}
	}
})