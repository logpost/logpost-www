import React from "react"
import Progress from "../../../common/Progress"
import {
	FormActions,
	PrimaryButton,
	SecondaryButton,
	FormHeader
} from "../../../styles/GlobalComponents"
import { useRouter } from "next/router"
import styled from "styled-components"
import JobFormStepTwo from "../../../common/JobFormStepTwo"

const FormActionsCustom = styled(FormActions)`
	padding: 0 2.6rem;
	margin: 1.2rem 0 3rem 0;
`

const JobAddStepTwo = () => {
	const router = useRouter()

	const nextPage = () => {
		router.push(`/jobs/add/3`, undefined, { shallow: true })
	}

	return (
		<div>
			<FormHeader>
				<Progress
					currentStep="ข้อมูลสินค้าและราคา"
					nextStep="ข้อมูลรถบรรทุก"
					percent={2 / 4}
				/>
			</FormHeader>
			<JobFormStepTwo />
			<FormActionsCustom>
				<SecondaryButton onClick={() => router.push(`/jobs/add/1`)}>ย้อนกลับ</SecondaryButton>
				<PrimaryButton onClick={nextPage}>ส่วนถัดไป</PrimaryButton>
			</FormActionsCustom>
		</div>
	)
}

export default JobAddStepTwo