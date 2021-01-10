import React, { useState } from 'react'
import { useRouter } from 'next/router'
import TruckAddStepOne from '../../../../components/switcher/truck/add/TruckAddStepOne'
import TruckAddStepTwo from '../../../../components/switcher/truck/add/TruckAddStepTwo'

const AddTruckSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query
	const [truckDetails, setTruckDetails] = useState({
		license_number: "",
		gasoline: "ดีเซล",
		age: undefined,
		is_insure: false,
		property: {
			type: "รถ 4 ล้อ",
			option: "ตู้ทึบ",
		},
		weight: {
			max: undefined,
			min: undefined
		}
	})

	return (
		<div>
			{
				{
					1: <TruckAddStepOne details={truckDetails} setDetails={setTruckDetails} />,
					2: <TruckAddStepTwo details={truckDetails} />,
				}[step as string]
			}
		</div>
	)
}

export default AddTruckSwitcherPage
