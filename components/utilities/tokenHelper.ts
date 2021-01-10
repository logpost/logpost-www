import { decode } from "jsonwebtoken"

export const decodeToken = (token: string) => {
	const tokenPayload = decode(token)
	return tokenPayload
}

interface TokenPayload {
	account_type: string,
	display_name: string,
	isConfirmEmail: boolean,
	role: string,
	username: string
}

export const getUserInfo = () => {
	if (typeof window !== 'undefined') {
		const accessToken = localStorage.getItem("access_token")
		if (accessToken !== null) {
			const tokenPayload = decodeToken(accessToken) as TokenPayload
			console.log(tokenPayload)
			return {
				accountType: tokenPayload.account_type,
				displayName: tokenPayload.display_name,
				isConfirmEmail: tokenPayload.isConfirmEmail,
				role: tokenPayload.role,
				username: tokenPayload.username
			}
		}
	}
}