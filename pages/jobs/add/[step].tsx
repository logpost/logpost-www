import React, { useState } from 'react'
import { useRouter } from 'next/router'
import JobAddStepOne from '../../../components/switcher/jobs/add/JobAddStepOne'
import JobAddStepTwo from '../../../components/switcher/jobs/add/JobAddStepTwo'
import JobAddStepThree from '../../../components/switcher/jobs/add/JobAddStepThree'
import JobAddStepFour from '../../../components/switcher/jobs/add/JobAddStepFour'
import { MOCKUP_JOB } from '../../../data/job.mock'

const AddJobSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query
	const [jobDetails, setJobDetails] = useState(MOCKUP_JOB)

	return (
		<div>
			{
				{
					1: <JobAddStepOne details={jobDetails} setDetails={setJobDetails}  />,
					2: <JobAddStepTwo details={jobDetails} setDetails={setJobDetails} />,
					3: <JobAddStepThree details={jobDetails} setDetails={setJobDetails} />,
					4: <JobAddStepFour details={jobDetails} />,
				}[step as string]
			}
		</div>
	)
}

export default AddJobSwitcherPage
