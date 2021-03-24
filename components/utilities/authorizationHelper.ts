import { getToken } from "./apis"

export const authorizationHandler = async (fetcher)  => {
	try {
		const response = await fetcher()
		return response
	} catch (error) {
		if (error?.response?.status === 401) {
			const isNotReLogin = await getToken()
			if(isNotReLogin){
				try {
					const response = await fetcher()
					return response	
				} catch (error) {
					console.log(error.response)
				}
			} 
		} else {
			console.log(error.response)
			return error
		}
	}
} 