import React, { useState } from 'react'
import { useRouter } from 'next/router'
import JobAddStepOne from '../../../components/switcher/jobs/add/JobAddStepOne'
import JobAddStepTwo from '../../../components/switcher/jobs/add/JobAddStepTwo'
import JobAddStepThree from '../../../components/switcher/jobs/add/JobAddStepThree'
import JobAddStepFour from '../../../components/switcher/jobs/add/JobAddStepFour'

const AddJobSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query
	const [jobDetails, setJobDetails] = useState({
		pickup_location: "กรุงเทพ",
		dropoff_location: "ชลบุรี",
		pickup_date: "",
		dropoff_date: "",
		weight: 1.2,
		carrier_specification: { 
			truck: {
				age: 5,
				type: {
					wheel: "4",
					options: "ตู้ทึบ"
				}
			},
			driver: {
				driver_license_type: "12345555"
			}
		},
		description: "ไม่มี",
		product_type: "ไม้",
		offer_price: 8000,
		auto_price: 4000,
		status: 100,
		distance: 250,
		permission: "pubilc",
		waiting_time: 5
	})

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
