import axios from 'axios'
import { CarrierProfile } from '../../entities/interface/carrier'
import { AuthInterface } from '../../entities/interface/common'
import { JobInterface } from '../../entities/interface/job'
const ACCOUNT_URL = "https://account-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app/account"
const JOB_URL = "https://jobs-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app/jobs"

const signup = async (role: string, data: CarrierProfile) => {
	try {
		// sign up with data
		const res = await axios.post(`${ACCOUNT_URL}/signup/${role}`, data)
		// get email token from response and save it to local storage
		localStorage.setItem("email_token", res.data.email_token)
	} catch (error) {
		console.log(error)
	}
}

const resendEmail = async () => {
	try {
		const email_token = localStorage.getItem("email_token")
		// get email token from local storage and resend email with email token 
		await axios.post(`${ACCOUNT_URL}/email/confirm/send?email_token=${email_token}`)
	} catch (error) {
		console.log(error)
	}
} 

const login = async (role: string, auth: AuthInterface) => {
	try {
		const res = await axios.post(`${ACCOUNT_URL}/login/${role}`, auth)
		localStorage.setItem("access_token", res.data.access_token)
		console.log(res.headers)
		return res.status
	} catch (error) {
		return error.response?.status
	}
}

const getToken = async () => {
	try {
		const res = await axios.get(`${ACCOUNT_URL}/token`)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

const logout = async () => {
	localStorage.removeItem("access_token")
	window.location.href = "/login"
}

const getAllJobs = async (next: (jobs: JobInterface[]) => void) => {
	try {
		const res = await axios.get(`${JOB_URL}/all`)
		next(res.data)
	} catch (error) {
		console.log(error)
	}
}

const createJob = async (data: JobInterface) => {
	console.log(data)
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
	try {
		const res = await axios.post(`${JOB_URL}/create`, data)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

export {
	signup,
	login,
	logout,
	getAllJobs,
	createJob,
	resendEmail,
	getToken
}