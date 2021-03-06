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

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
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
			setAlert(true, "error", "แก้ไขข้อมูลรถบรรทุกไม่สำเร็จ")
		} else {
			setAlert(true, "success", "แก้ไขข้อมูลรถบรรทุกสำเร็จ")
			router.push(`/carrier/truck/overview`, undefined, { shallow: true })
		}
	}

	return (
		<>
            <Alert />
			<PageContainer>
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
			</PageContainer>
		</>
	)
}

export default withPrivateRoute(EditTruckPage, "carrier")
