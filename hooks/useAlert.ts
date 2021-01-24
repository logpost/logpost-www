import { useRecoilState } from 'recoil'
import { alertPropertyState } from '../store/atoms/alertPropertyState'

const useAlert = () => {
    const [alertStatus, setAlertStatus] = useRecoilState(alertPropertyState)

    const setAlert = (isAlert: boolean, alertType: string) => {
        setAlertStatus({
            type: alertType,
            isShow: isAlert
        })
    }

    return { alertStatus, setAlert }
}

export default useAlert
