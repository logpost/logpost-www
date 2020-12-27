import axios from 'axios'
import { store } from '@risingstack/react-easy-state'

const appStore = store({
	isLoading: false,
	isAuth: true,
	jobs: [{
		shipper_id: "01",
		carrier_id: "",
		driver_name: "",
		license_number: "",
		pickup_location: "กรุงเทพ",
		dropoff_location: "ชลบุรี",
		pickup_date: "20 ต.ค. 63 09:00 น.",
		dropoff_date: "20 ต.ค. 63 18:00 น.",
		weight: 2,
		product_type: "ไม้อัด",
		description: "งานด่วน ไม่ต้องรอขึ้นของ",
		waiting_time: 0,
		carrier_specification: { 
			truck: {
			age: 5,
			type: {
				wheel: 6,
				options: "ตู้ทึบ"
			}
			},
			driver: {
			driver_license_type: "12345555",
			}
		},
		offer_price: 8000,
		auto_price: 4800,
	}],
	signup: async (role, data) => {
		appStore.isLoading = true
		const { confirm_password, ...accountinfo } = data
		try {
			const res = await axios.post(`http://localhost:5000/account/signup/${role}`, accountinfo )
			appStore.isLoading = false
		} catch (error) {
			console.log(error)
		}
	},
	login: async (data) => {
		appStore.isLoading = true
		const  { role,  username, password } = data
		try {
			const res = await axios.post(`http://localhost:5000/account/login/${role}`,{
				username, password
			})
			const { token } = res.data
			if(token){
				localStorage.setItem('access_token', token)
				appStore.isAuth = true
				appStore.isLoading = false
				console.log('Login is success !')
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
			}
		} catch (error) {
			window.location.href = '/login'
		}
	},
	createJob: async (data) => {
		console.log(data)
		axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
		appStore.isLoading = true
		try {
			const res = await axios.post(`http://localhost:8082/jobs/create`, data)
			appStore.isLoading = false
		} catch (error) {
			console.log(error)
		}
	},
	getAllJob: async () => {
		appStore.isLoading = true
		try {
			const res = await axios.get(`http://localhost:8082/jobs/all`)
			appStore.isLoading = false
			appStore.jobs = res.data
		} catch (error) {
			console.log(error)
		}
	},
	onLoadPage: async () => {
		if(localStorage.getItem('access_token')) appStore.isAuth = true
	},
	logout: async () => {
		localStorage.removeItem('access_token')
		window.location.href = "/login"
	}
})

export default appStore