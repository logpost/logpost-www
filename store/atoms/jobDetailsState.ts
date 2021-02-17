import { atom, DefaultValue, selector } from 'recoil';
import { formatAddressToString } from '../../components/utilities/helper';
import { DEFAULT_JOB } from '../../data/jobs';
import { PlaceInterface } from '../../entities/interface/googlemaps';
import { JobDocument } from '../../entities/interface/job';

export const jobDetailsState = atom<JobDocument>({
	key: 'jobDetails',
	default: {
		...DEFAULT_JOB,
		waiting_time: null,
		description: "",
		geocoder_result: <PlaceInterface>{pickup: {}, dropoff: {}}
	}
});

export const jobDetailsSelector = selector({
	key: "jobDetailsSelector",
	get: ({get}) => {
		return get(jobDetailsState)
	},
	set: ({get, set}, newValue: JobDocument) => {
		const jobDetails = get(jobDetailsState)
		set(
			jobDetailsState,
			newValue instanceof DefaultValue ? newValue :
			{
				...jobDetails,
				...newValue,
				pickup_date: new Date(newValue.pickup_date),
				dropoff_date: new Date(newValue.dropoff_date),
				geocoder_result: {
					pickup: {
						formatted_address: formatAddressToString(newValue.pickup_location)
					},
					dropoff: {
						formatted_address: formatAddressToString(newValue.dropoff_location)
					}
				}
			}
		)
	}
})

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
			product_type: jobDetails.product_type,
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
			carrier_specification: {
				...jobDetails.carrier_specification,
				truck: {
					...jobDetails.carrier_specification.truck,
				}
			}
		}
	}
})