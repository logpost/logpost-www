import axios from 'axios'
import { CarrierProfile } from '../../entities/interface/carrier'
import { AuthInterface } from '../../entities/interface/common'
const ACCOUNT_URL = "https://account-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app/account"
const JOB_URL = "https://jobs-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app/jobs"

const signup = async (role: string, data: CarrierProfile) => {
	try {
		const res = await axios.post(`${ACCOUNT_URL}/signup/${role}`, data )
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

const login = async (role: string, auth: AuthInterface) => {
	try {
		const res = await axios.post(`${ACCOUNT_URL}/login/${role}`, auth)
		localStorage.setItem("access_token", res.data.access_token)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

const logout = async () => {
	localStorage.removeItem("access_token")
	window.location.href = "/login"
}

const getAllJobs = async () => {
	try {
		const res = await axios.get(`${JOB_URL}/all`)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
} 

export {
	signup,
	login,
	logout,
	getAllJobs
}