import React from "react"
import styled from "styled-components"
import Progress from "../../../common/Progress"
import {
	FormActions,
	SecondaryButton,
	PrimaryButton,
	FormHeader,
} from "../../../styles/GlobalComponents"
import { useRouter } from "next/router"
import JobFormStepThree from "../../../common/JobFormStepThree"

const FormActionsCustom = styled(FormActions)`
	padding: 0 2.6rem;
	margin: 1.2rem 0 3rem 0;
`

const JobAddStepThree = () => {
	const router = useRouter()

	const nextPage = () => {
		router.push(`/jobs/add/4`, undefined, { shallow: true })
	}

	return (
		<div>
			<FormHeader>
				<Progress
					currentStep="ข้อมูลรถบรรทุก"
					nextStep="แสดงตัวอย่างงาน"
					percent={3 / 4}
				/>
			</FormHeader>
			<JobFormStepThree />
			<FormActionsCustom>
				<SecondaryButton onClick={() => router.push(`/jobs/add/2`)}>
					ย้อนกลับ
				</SecondaryButton>
				<PrimaryButton onClick={nextPage}>ส่วนถัดไป</PrimaryButton>
			</FormActionsCustom>
		</div>
	)
}

export default JobAddStepThree
