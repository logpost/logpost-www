import { useRecoilState } from 'recoil'
import { alertPropertyState } from '../store/atoms/alertPropertyState'

const useAlert = () => {
    const [alertStatus, setAlertStatus] = useRecoilState(alertPropertyState)

    const setAlert = (isAlert: boolean, alertType: string, alertDescription: string) => {
        setAlertStatus({
            type: alertType,
            description: alertDescription,
            isShow: isAlert
        })
    }

    return { alertStatus, setAlert }
}

export default useAlert
