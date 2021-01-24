import { atom } from 'recoil';
import { DEFAULT_JOB } from '../../data/jobs';

export const jobDocumentState = atom({
	key: 'jobDocument',
	default: {
		shipper_id: "",
		carrier_id: "",
		shipper_display_name: "",
		carrier_display_name: "",
		driver_name: "",
		license_number: "",
		status: 100,
		...DEFAULT_JOB
	}, 
});