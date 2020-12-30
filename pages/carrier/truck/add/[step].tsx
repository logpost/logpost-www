import React, { useState } from 'react'
import { useRouter } from 'next/router'
import TruckAddStepOne from '../../../../components/switcher/truck/add/TruckAddStepOne'
import TruckAddStepTwo from '../../../../components/switcher/truck/add/TruckAddStepTwo'

const AddTruckSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query
	const [truckDetails, setTruckDetails] = useState({
		status: 100,
		license_number: "",
		gasoline: "",
		age: 0,
		is_insure: false,
		property: {
			type: "รถ 4 ล้อ",
			option: "ตู้ทึบ",
			chassis: null
		},
		weight: {
			max: null,
			min: null
		}
	})

	return (
		<div>
			{
				{
					1: <TruckAddStepOne details={truckDetails} setDetails={setTruckDetails} />,
					2: <TruckAddStepTwo details={truckDetails} setDetails={setTruckDetails} />,
				}[step as string]
			}
		</div>
	)
}

export default AddTruckSwitcherPage
