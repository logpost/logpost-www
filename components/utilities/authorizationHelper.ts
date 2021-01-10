import { getToken } from "./apis"

export const authorizationHandler = async (fetcher: any)  => {
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
					console.log(error)
				}
			} 
		}
	}
} 