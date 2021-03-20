import { atom } from 'recoil';

export const truckStatusCountState = atom({
	key: 'truckStatus',
	default: {
		0: 0,
		100: 0,
		200: 0,
		300: 0
	}, 
});

export const driverStatusCountState = atom({
	key: 'driverStatus',
	default: {
		0: 0,
		100: 0,
		200: 0,
		300: 0,
	}, 
});

export const jobStatusCountState = atom({
	key: 'jobStatus',
	default: {
		0: 0,
		100: 0,
		800: 0,
		other: 0
	}, 
});

export const myJobsState = atom({
	key: 'myJobs',
	default: [], 
})