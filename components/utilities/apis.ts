import axios from 'axios'

import { AccountInterface, ProfileInterface } from '../../entities/interface/account'
import { JobPickerInterface } from '../../entities/interface/carrier'
import { AuthInterface } from '../../entities/interface/common'
import { DriverDocument, DriverDetails } from '../../entities/interface/driver'
import { JobDetails, JobDocument } from '../../entities/interface/job'
import { TruckDetails, TruckDocument } from '../../entities/interface/truck'
import { authorizationHandler } from './authorizationHelper'

// const ACCOUNT_URL = "https://account-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app/account"
// const JOB_URL = "https://jobs-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app/jobs"
// const CARRIER_URL = "https://carrier-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app"
// const SHIPPER_URL = "https://shipper-management-service-logpost-stag-qjrfn6j7kq-as.a.run.app"
const ACCOUNT_URL = "http://35.197.134.136/account"
const JOB_URL = "http://34.87.156.135/jobs"
const CARRIER_URL = "http://34.87.153.233"
const SHIPPER_URL = "http://35.198.230.87"
// const OPTIMIZE_URL = "https://jobs-optimization-service-logpost-stag-qjrfn6j7kq-as.a.run.app/job-opts"
const OPTIMIZE_URL = "https://jobs-optimization-service-logpost-prod-qjrfn6j7kq-as.a.run.app/job-opts"

const credentialsAPIs = axios.create({
	'withCredentials': true
});

const signup = async (role: string, data: AccountInterface) => {
	try {
		console.log(data)
		const res = await axios.post(`${ACCOUNT_URL}/signup/${role}`, data)
		localStorage.setItem("email_token", res.data.email_token)
		return res.status
	} catch (error) {
		console.log(error.response)
		return error.response.status
	}
}

const resendEmail = async () => {
	try {
		const email_token = localStorage.getItem("email_token")
		await axios.post(`${ACCOUNT_URL}/guest/email/confirm/send?email_token=${email_token}`)
	} catch (error) {
		console.log(error.response)
	}
} 

const login = async (role: string, auth: AuthInterface) => {
	try {
		console.log(auth)
		const res = await credentialsAPIs.post(`${ACCOUNT_URL}/login/${role}`, auth)
		localStorage.setItem("access_token", res.data.access_token)
		console.log(res.headers)
		return res.status
	} catch (error) {
		console.log(error.response)
		return error.response?.status
	}
}

const getToken = async () => {
	try {
		const res = await credentialsAPIs.get(`${ACCOUNT_URL}/token`)
		const { access_token } = res.data
		localStorage.setItem("access_token", access_token)
		return access_token
	} catch (error) {
		console.log(error.response)
		// await logout()
		return false
	}
}

const logout = async () => {
	localStorage.removeItem("access_token")
	window.location.href = "/login"
}

const getAllJobs = async (next: (jobs: JobDocument[]) => void) => {
	await authorizationHandler(async () => {
		try {
			let header = axios.defaults.headers
			if (localStorage.getItem('access_token') !== null) {
				header = { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			}
			const res = await axios.get(`${JOB_URL}/all`, header)
			next(res.data)
		} catch (error) {
			throw error	
		}
	})
}

const createJob = async (data: JobDetails) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.post(`${JOB_URL}/create`, data,
				{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			)
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const getJobDetailsByID = async (jobID: string, next: (jobDetails: JobDocument) => void, driverTel?: string) => {
	await authorizationHandler(async () => {
		try {
			let getDetailsURL = `${JOB_URL}/detail/${jobID}`
			let header = { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			if (driverTel) {
				getDetailsURL = `${JOB_URL}/detail/${jobID}?driver_tel=${driverTel}`
				header = axios.defaults.headers
			}
			const res = await axios.get(getDetailsURL, header)
			next(res.data)
		} catch (error) {
			console.log(error.response)
			throw error	
		}
	})
}

const pickJob = async (jobPicker: JobPickerInterface) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.post(`${JOB_URL}/pick`, jobPicker,
				{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			)
			return res.status
		} catch (error) {
			throw error
		}
	})
}

const getCarrierProfile = async (username: string, next: (carrierProfile: ProfileInterface) => void) => {
	try {
		const res = await axios.get(`${CARRIER_URL}/carrier/profile/${username}`)
		next(res.data)
	} catch (error) {
		console.log(error.response)
	}
}

const getShipperProfile = async (username: string, next: (shipperProfile: ProfileInterface) => void) => {
	try {
		const res = await axios.get(`${SHIPPER_URL}/shipper/profile/${username}`)
		next(res.data)
	} catch (error) {
		console.log(error.response)
	}
}

const getTruck = async (next: (trucks: TruckDocument[]) => void) => {
	await authorizationHandler(async () => {
		try {
			const res = await axios.get(`${CARRIER_URL}/truck/owned`, 
				{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			)
			next(res.data)
		} catch (error) {
			throw error	
		}
	})
}

const createTruck = async (data: TruckDetails):Promise<number|void> => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.post(`${CARRIER_URL}/truck/create`, data,
				{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			)
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const getDriver = async (next: (drivers: DriverDocument[]) => void) => {
	await authorizationHandler(async () => {
		try {
			const res = await axios.get(`${CARRIER_URL}/driver/owned`,
				{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			)
			next(res.data)
		} catch (error) {
			throw error	
		}
	})
}

const createDriver = async (data: DriverDetails):Promise<number|void> => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.post(`${CARRIER_URL}/driver/create`, data,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const updateJob = async (jobID: string, data: Object) => {
	return await authorizationHandler(async () => {
		try {
			const body = {
				job_id: jobID,
				jobinfo: data
			}
			const res = await axios.put(`${JOB_URL}/update`, body,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const deleteJob = async (jobID: string) => {
	return await authorizationHandler(async () => {
		try {
			const body = {
				job_id: jobID,
			}
			const res = await axios.put(`${JOB_URL}/delete`, body,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const updateShipperProfile = async (data: Object) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.put(`${SHIPPER_URL}/shipper/profile/update`, data,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const updateCarrierProfile = async (data: Object) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.put(`${CARRIER_URL}/carrier/profile/update`, data,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const deleteShipperUser = async (
	data: {
		password: string
	}) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.put(`${SHIPPER_URL}/shipper/delete`, data,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const deleteCarrierUser = async (
	data: {
		password: string
	}) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.put(`${CARRIER_URL}/carrier/delete`, data,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const updateStatusByDriver = async (data:{
	driver_tel: string,
	jobinfo: { 
		status: number
	},
	job_id: string}) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.put(`${JOB_URL}/driving/status`, data)
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const getMyJob = async (next: (jobs: JobDocument[]) => void) => {
	await authorizationHandler(async () => {
		try {
			const res = await axios.get(`${JOB_URL}/owned`,
				{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
			)
			next(res.data)
		} catch (error) {
			throw error
		}
	})
}

const changeEmail = async (data: { email: string }) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.put(`${ACCOUNT_URL}/change/email`, data,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const changePassword = async (
	data: { 
		old_password: string,
		password: string 
	}) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.put(`${ACCOUNT_URL}/change/password`, data,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const getTruckByID = async (id: string, next: (truck: TruckDocument[]) => void) => {
	return await authorizationHandler(async () => {
		try {
			const query = {
				query: {
					truck_id: id,
				}
			}
			const res = await axios.post(`${CARRIER_URL}/truck/filter`, query,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			next(res.data)
		} catch (error) {
			throw error	
		}
	})
} 

const updateTruckByID = async (id: string, data: TruckDetails) => {
	return await authorizationHandler(async () => {
		try {
			const body = {
				truckinfo: data,
				truck_id: id
			}
			const res = await axios.put(`${CARRIER_URL}/truck/update`, body,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const getDriverByID = async (id: string, next: (driver: DriverDocument[]) => void) => {
	return await authorizationHandler(async () => {
		try {
			const query = {
				query: {
					driver_id: id,
				}
			}
			const res = await axios.post(`${CARRIER_URL}/driver/filter`, query,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			next(res.data)
		} catch (error) {
			throw error	
		}
	})
} 

const updateDriverByID = async (id: string, data: DriverDetails) => {
	return await authorizationHandler(async () => {
		try {
			const body = {
				driverinfo: data,
				driver_id: id
			}
			const res = await axios.put(`${CARRIER_URL}/driver/update`, body,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const deleteTruck = async (id: string) => {
	return await authorizationHandler(async () => {
		try {
			const data = {
				truck_id: id
			}
			const res = await axios.delete(`${CARRIER_URL}/truck/delete`,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }, data})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const deleteDriver = async (id: string) => {
	return await authorizationHandler(async () => {
		try {
			const data = {
				driver_id: id
			}
			const res = await axios.delete(`${CARRIER_URL}/driver/delete`,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }, data})
			return res.status
		} catch (error) {
			throw error	
		}
	})
}

const getSuggestJob = async (body: {job_id: string, hop: number, origin_location: {}}, next: (suggestJobs: Object) => void) => {
	return await authorizationHandler(async () => {
		try {
			const res = await axios.post(`${OPTIMIZE_URL}/suggest`, body,
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
			next(res.data)
		} catch (error) {
			console.log(error.response)
			throw error	
		}
	})
} 

export {
	signup,
	login,
	logout,
	getAllJobs,
	createJob,
	resendEmail,
	getToken,
	getCarrierProfile,
	getTruck,
	createTruck,
	getDriver,
	createDriver,
	getShipperProfile,
	getJobDetailsByID,
	pickJob,
	updateJob,
	updateStatusByDriver,
	getMyJob,
	changeEmail,
	changePassword,
	updateShipperProfile,
	updateCarrierProfile,
	deleteCarrierUser,
	deleteShipperUser,
	getTruckByID,
	updateTruckByID,
	getDriverByID,
	updateDriverByID,
	deleteDriver,
	deleteTruck,
	deleteJob,
	getSuggestJob
}