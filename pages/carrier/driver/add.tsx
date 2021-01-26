import React from 'react'
import styled from "styled-components"
import { useRouter } from "next/router"
import { FormActions, PrimaryButton, SecondaryButton, FormInputContainer, FormHeader } from '../../../components/styles/GlobalComponents'
import { createDriver } from '../../../components/utilities/apis'
import useAlert from '../../../hooks/useAlert'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { driverDetailsState, driverValidateState } from '../../../store/atoms/driverDetailsState'
import DriverForm from '../../../components/common/DriverForm'
import { validateDriverDetails } from '../../../components/utilities/helper'

const FormHeaderCustom = styled(FormHeader)`
	padding: 3.4rem 0 3.4rem 3.7rem;
	font-size: 2.2rem;
	font-weight: 500;
	color: hsl(217, 16%, 16%);
`

const AddDriverPage = () => {
	const router = useRouter()
	const { setAlert } = useAlert()
	const driverDetails = useRecoilValue(driverDetailsState)
	const setDriverValidate = useSetRecoilState(driverValidateState)

	const submitDetails = async () => {
		const validateResult = validateDriverDetails(driverDetails)
		if (validateResult.allInput) {
			setDriverValidate(validateResult)
			const response = await createDriver(driverDetails)
			if (response !== 200) {
				setAlert(true, "error")
			} else {
				setAlert(true, "success")
			}
			router.push(`/carrier/driver/overview`, undefined, { shallow: true })
		} else {
			setDriverValidate(validateResult)
		}
	}

	return (
		<>
			<FormHeaderCustom>
				ข้อมูลพนักงานขับรถ
			</FormHeaderCustom>
			<FormInputContainer>
				<DriverForm />
				<FormActions>
					<SecondaryButton onClick={() => router.push(`/carrier/driver/overview`)}>
						ยกเลิก
					</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>เพิ่มพนักงานขับรถ</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</>
	)
}

export default AddDriverPage
