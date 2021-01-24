import { atom } from 'recoil';
import { DEFAULT_JOB } from '../../data/jobs';

export const jobDetailsState = atom({
	key: 'jobDetails',
	default: DEFAULT_JOB
});