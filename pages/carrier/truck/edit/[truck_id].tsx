import React, { useEffect } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import { FormActions, FormHeader, FormInputContainer, PrimaryButton, SecondaryButton } from '../../../../components/styles/GlobalComponents'
import { getTruckByID, updateTruckByID } from '../../../../components/utilities/apis'
import useAlert from '../../../../hooks/useAlert'
import TruckForm from '../../../../components/common/TruckForm'
import { useRecoilState } from 'recoil'
import { truckDetailsState } from '../../../../store/atoms/truckDetailsState'
import { TruckDetails, TruckDocument } from '../../../../entities/interface/truck'
import Alert from '../../../../components/common/Alert'
import withPrivateRoute from '../../../../components/utilities/withPrivateRoute'

const FormHeaderCustom = styled(FormHeader)`
	padding: 3.4rem 0 3.4rem 3.7rem;
	font-size: 2.2rem;
	font-weight: 500;
	color: hsl(217, 16%, 16%);
`

const EditTruckPage = () => {
    const router = useRouter()
    const truckID = router.query.truck_id as string
    const { alertStatus, setAlert } = useAlert()
	const [truckDetails, setTruckDetails] = useRecoilState<TruckDetails>(truckDetailsState)

    useEffect(() => {
        if (truckID) {
            getTruckByID(truckID, (truck: TruckDocument[]) => {
                setTruckDetails(truck[0])
            })
        }
    }, [router.query])

	const submitDetails = async () => {
		const response = await updateTruckByID(truckID, truckDetails)
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
	}

	return (
		<>
            <Alert>
                {alertStatus.type === "success" ? "แก้ไขข้อมูลสำเร็จ" : "แก้ไขข้อมูลไม่สำเร็จ"}
            </Alert>
			<FormHeaderCustom>
                แก้ไขข้อมูลรถบรรทุก
			</FormHeaderCustom>
			<FormInputContainer>
                <TruckForm />
				<FormActions>
					<SecondaryButton onClick={() => router.back()}>ย้อนกลับ</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>บันทึกข้อมูล</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</>
	)
}

export default withPrivateRoute(EditTruckPage, "carrier")
