import React, { useState } from 'react'
import { useRouter } from 'next/router'
import JobAddStepOne from '../../../components/switcher/jobs/add/JobAddStepOne'
import JobAddStepTwo from '../../../components/switcher/jobs/add/JobAddStepTwo'
import JobAddStepThree from '../../../components/switcher/jobs/add/JobAddStepThree'
import JobAddStepFour from '../../../components/switcher/jobs/add/JobAddStepFour'
import { JobDetails } from '../../../entities/interface/job'

const AddJobSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query
	const [jobDetails, setJobDetails] = useState<JobDetails>({
		pickup_location: {
			address: "",
			district: "",
			province: "",
			zipcode: "",
			latitude: null,
			longitude: null
		},
		dropoff_location: {
			address: "",
			district: "",
			province: "",
			zipcode: "",
			latitude: null,
			longitude: null
		},
		pickup_date: new Date,
		dropoff_date: new Date,
		weight: undefined,
		carrier_specification: { 
			truck: {
				age: undefined,
				property: {
					type: "รถ 4 ล้อ",
					option: "ตู้ทึบ",
					chassis: null
				}
			},
			driver: {
				driver_license_type: "ประเภท 1"
			}
		},
		product_type: "",
		offer_price: undefined,
		auto_price: 4000,
		distance: undefined,
		permission: "public",
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
