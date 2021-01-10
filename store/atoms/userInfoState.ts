import { atom } from 'recoil';

export const userInfoState = atom({
	key: 'userInfo',
	default: {
		accountType: "personal",
		displayName: "Loading...",
		isConfirmEmail: true,
		role: "shipper",
		username: "",
		userID: ""
	}, 
});