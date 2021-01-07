import { atom } from 'recoil';

export const alertPropertyState = atom({
	key: 'showAlert',
	default: {
		type: "success",
		isShow: false
	}, 
});