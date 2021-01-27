import 'react-datepicker/dist/react-datepicker.css';

import {
	FormActions,
	FormHeader,
	PrimaryButton,
	SecondaryButton
} from '../../../styles/GlobalComponents';
import React from 'react';

import Progress from '../../../common/Progress';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { JobAddInterface } from '../../../../entities/interface/job'
import JobFormStepOne from '../../../common/JobFormStepOne';

const FormActionsCustom = styled(FormActions)`
	padding: 0 2.6rem;
	margin: 1.2rem 0 3rem 0;
`

const JobAddStepOne = (props: JobAddInterface) => {
	const router = useRouter()

	const nextPage = () => {
		router.push(`/jobs/add/2`, undefined, { shallow: true })
	}

	return (
		<div>
			<FormHeader>
				<Progress
					currentStep="จุดขึ้น - ลงสินค้า"
					nextStep="ข้อมูลสินค้าและราคา"
					percent={1 / 4}
				/>
			</FormHeader>
			<JobFormStepOne />
			<FormActionsCustom>
				<SecondaryButton onClick={() => router.push("/jobs")}>ยกเลิก</SecondaryButton>
				<PrimaryButton onClick={nextPage}>ส่วนถัดไป</PrimaryButton>
			</FormActionsCustom>
		</div>
	)
}

export default JobAddStepOne
