import React from 'react'
import { useRouter } from 'next/router'
import CarAddStepOne from '../../../../components/switcher/car/add/CarAddStepOne'
import CarAddStepTwo from '../../../../components/switcher/car/add/CarAddStepTwo'

const AddCarSwitcherPage = () => {
	const router = useRouter()
	const { step } = router.query

	return (
		<div>
			{
				{
					1: <CarAddStepOne />,
					2: <CarAddStepTwo />,
				}[step as string]
			}
		</div>
	)
}

export default AddCarSwitcherPage
