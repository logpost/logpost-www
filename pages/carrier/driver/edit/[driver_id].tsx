import React, { useEffect } from 'react'
import styled from "styled-components"
import { useRouter } from "next/router"
import { FormActions, PrimaryButton, SecondaryButton, FormInputContainer, FormHeader } from '../../../../components/styles/GlobalComponents'
import { updateDriverByID, getDriverByID } from '../../../../components/utilities/apis'
import DriverForm from '../../../../components/common/DriverForm'
import Alert from '../../../../components/common/Alert'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { driverDetailsState, driverValidateState } from '../../../../store/atoms/driverDetailsState'
import { DriverDocument } from '../../../../entities/interface/driver'
import useAlert from '../../../../hooks/useAlert'
import { validateDriverDetails } from '../../../../components/utilities/helper'
import withPrivateRoute from '../../../../components/utilities/withPrivateRoute'

const FormHeaderCustom = styled(FormHeader)`
	padding: 3.4rem 0 3.4rem 3.7rem;
	font-size: 2.2rem;
	font-weight: 500;
	color: hsl(217, 16%, 16%);
`

const AddDriverPage = () => {
	const router = useRouter()
	const driverID = router.query.driver_id as string
	const { alertStatus, setAlert } = useAlert()
	const [driverDetails, setDriverDetails] = useRecoilState(driverDetailsState)
	const resetDriverDetails = useResetRecoilState(driverDetailsState)
	const setDriverValidate = useSetRecoilState(driverValidateState)

	useEffect(() => {
        if (driverID) {
            getDriverByID(driverID, (driver: DriverDocument[]) => {
                setDriverDetails(driver[0])
            })
        }
    }, [router.query])

	const submitDetails = async () => {
		const validateResult = validateDriverDetails(driverDetails)
		if (validateResult.allInput) {
			setDriverValidate(validateResult)
			const response = await updateDriverByID(driverID, driverDetails)
			if (response !== 200) {
				setAlert(true, "error", "ไม่สามารถแก้ไขข้อมูลพนักงานได้ เนื่องจากข้อผิดพลาดบางอย่าง")
			} else {
				setAlert(true, "success", "แก้ไขข้อมูลพนักงานสำเร็จ")

			}
		} else {
			setDriverValidate(validateResult)
			router.push(`/carrier/driver/overview`, undefined, { shallow: true })
		}
	}

	const backToOverview = () => {
		resetDriverDetails()
		router.push(`/carrier/driver/overview`)
	}

	return (
		<>
			<Alert />
			<FormHeaderCustom>
				แก้ไขข้อมูลพนักงานขับรถ
			</FormHeaderCustom>
			<FormInputContainer>
				<DriverForm />
				<FormActions>
					<SecondaryButton onClick={backToOverview}>
						ยกเลิก
					</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>บันทึกข้อมูล</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</>
	)
}

export default withPrivateRoute(AddDriverPage, "carrier")
