import axios from 'axios'
import { store } from '@risingstack/react-easy-state'

const appStore = store({
    isLoading: false,
    isAuth: false,
    jobs: [],
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