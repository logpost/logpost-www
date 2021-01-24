import React, { useState } from 'react'
import Progress from '../../../common/Progress'
import { useRouter } from 'next/router'
import InputComponent from '../../../common/InputComponent'
import SelectComponent from '../../../common/SelectComponent'
import { GASOLINE_LIST } from '../../../../data/carrier'
import { FormActions, PrimaryButton, SecondaryButton, FormInputContainer, FormHeader, ButtonGroupContainer, ButtonItem } from '../../../styles/GlobalComponents'
import { createTruck } from '../../../utilities/apis'
import useAlert from '../../../../hooks/useAlert'

const TruckAddStepTwo = ({ details }) => {
	const router = useRouter()
	const [stepTwoDetails, setStepTwoDetails] = useState(details)
	const { setAlert } = useAlert()

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (e.target.type === "number") {
			setStepTwoDetails({ ...stepTwoDetails, [e.target.name]: parseInt(value) })
		} else {
			setStepTwoDetails({ ...stepTwoDetails, [e.target.name]: value })
		}
	}

	const submitDetails = async () => {
		const response = await createTruck(stepTwoDetails)
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
		router.push(`/carrier/truck/overview`, undefined, { shallow: true })
	}
	
	return (
		<div>
			<FormHeader>
				<Progress currentStep="ข้อมูลรถส่วนที่ 2" percent={2 / 2} />
			</FormHeader>
			<FormInputContainer>
				<InputComponent labelTH="น้ำมันรถ" labelEN="Gasoline" type="other">
					<SelectComponent
						menuList={GASOLINE_LIST}
						value={stepTwoDetails.gasoline}
						setValue={(value: string) => setStepTwoDetails({ ...stepTwoDetails, gasoline: value })}
					/>
				</InputComponent>
				<InputComponent name="license_number" labelTH="เลขทะเบียน" labelEN="License Number" type="short" handleOnChange={handleOnChange} />
				<InputComponent name="age" labelTH="อายุรถบรรทุก" labelEN="Truck Age" type="number" classifier="ปี" required={false} handleOnChange={handleOnChange} />
				<InputComponent labelTH="ประกันภัย" labelEN="Insurance" type="other" required={false}>
					<ButtonGroupContainer>
						<ButtonItem
							onClick={() => setStepTwoDetails({ ...stepTwoDetails, is_insure: true })}
							name="true"
							value={String(stepTwoDetails.is_insure)}
						>
							มีประกัน
						</ButtonItem>
						<ButtonItem
							onClick={() => setStepTwoDetails({ ...stepTwoDetails, is_insure: false })}
							name="false"
							value={String(stepTwoDetails.is_insure)}
						>
							ไม่มีประกัน
						</ButtonItem>
					</ButtonGroupContainer>
				</InputComponent>
				<FormActions>
					<SecondaryButton onClick={() => router.back()}>ย้อนกลับ</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>เพิ่มรถบรรทุก</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</div>
	)
}

export default TruckAddStepTwo
