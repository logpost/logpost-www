import { useSetRecoilState } from 'recoil'
import { alertPropertyState } from '../store/atoms/alertPropertyState'

const useAlert = () => {
    const setAlertStatus = useSetRecoilState(alertPropertyState)

    const setAlert = (isAlert: boolean, alertType: string) => {
        setAlertStatus({
            type: alertType,
            isShow: isAlert
        })
    }

    return setAlert
}

export default useAlert
