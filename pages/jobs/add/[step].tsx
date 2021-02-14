import React from 'react'
import { useRouter } from 'next/router'
import JobAddStepOne from '../../../components/switcher/jobs/add/JobAddStepOne'
import JobAddStepTwo from '../../../components/switcher/jobs/add/JobAddStepTwo'
import JobAddStepThree from '../../../components/switcher/jobs/add/JobAddStepThree'
import JobAddStepFour from '../../../components/switcher/jobs/add/JobAddStepFour'

const AddJobSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query

	return (
		<div>
			{
				{
					1: <JobAddStepOne />,
					2: <JobAddStepTwo />,
					3: <JobAddStepThree />,
					4: <JobAddStepFour />,
				}[step as string]
			}
		</div>
	)
}

export default AddJobSwitcherPage
