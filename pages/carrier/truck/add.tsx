import React from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import { FormActions, FormHeader, FormInputContainer, PrimaryButton, SecondaryButton } from '../../../components/styles/GlobalComponents'
import { createTruck } from '../../../components/utilities/apis'
import useAlert from '../../../hooks/useAlert'
import TruckForm from '../../../components/common/TruckForm'
import { useRecoilValue } from 'recoil'
import { truckDetailsState } from '../../../store/atoms/truckDetailsState'

const FormHeaderCustom = styled(FormHeader)`
	padding: 3.4rem 0 3.4rem 3.7rem;
	font-size: 2.2rem;
	font-weight: 500;
	color: hsl(217, 16%, 16%);
`

const AddTruckPage = () => {
	const router = useRouter()
    const { setAlert } = useAlert()
	const truckDetails = useRecoilValue(truckDetailsState)

	const submitDetails = async () => {
		const response = await createTruck(truckDetails)
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
		router.push(`/carrier/truck/overview`, undefined, { shallow: true })
	}

	return (
		<div>
			<FormHeaderCustom>
                ข้อมูลรถบรรทุก
			</FormHeaderCustom>
			<FormInputContainer>
                <TruckForm />
				<FormActions>
					<SecondaryButton onClick={() => router.back()}>ย้อนกลับ</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>เพิ่มรถบรรทุก</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</div>
	)
}

export default AddTruckPage
