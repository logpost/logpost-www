import React, { useState } from 'react'
import styled from "styled-components"
import Progress from '../../../common/Progress'
import { useRouter } from 'next/router'
import InputComponent from '../../../common/InputComponent'
import SelectComponent from '../../../common/SelectComponent'
import { GASOLINE_LIST } from '../../../../data/carrier'
import { FormActions, PrimaryButton, SecondaryButton } from '../../../styles/GlobalComponents'

const Header = styled.div`
	background-color: hsl(0, 0%, 98%);
	padding: 1.4rem 2.4rem;
`

const InputContainer = styled.div`
	padding: 1.8rem 2.6rem;

	> div:not(:first-child) {
		margin-top: 2rem;
	}
`

const ButtonItem = styled.button`
	border-radius: 0.6rem;
	box-shadow: 0 0 0 ${(props) =>
		props.value == props.name
			? "0.2rem hsl(212, 28%, 28%)"
			: "0.1rem hsl(0, 0%, 66%)"};
	outline: none;
	width: 9.1rem;
	padding: 1rem 0;
	font-size: 1.6rem;
	font-weight: 500;
	color: ${(props) =>
		props.value == props.name ? "hsl(212, 28%, 28%)" : "hsl(0, 0%, 66%)"};
	margin-right: 1.4rem;
`

const ButtonContainer = styled.div`
	margin-top: 0.8rem;
	display: grid;
    grid-gap: 1.2rem 1.4rem;
    grid-template-columns: repeat(auto-fill,9rem);
`

const TruckAddStepTwo = (props) => {
	const { details, setDetails } = props
	const router = useRouter()
	const [stepTwoDetails, setStepTwoDetails] = useState(details)
	console.log(details)

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (e.target.type === "number") {
			setStepTwoDetails({ ...stepTwoDetails, [e.target.name]: parseInt(value) })
		} else {
			setStepTwoDetails({ ...stepTwoDetails, [e.target.name]: value })
		}
	}

	const submitDetails = () => {
		setDetails(stepTwoDetails)
		router.push(`/carrier/truck/overview`, undefined, { shallow: true })
	}
	
	return (
		<div>
			<Header>
				<Progress currentStep="ข้อมูลรถส่วนที่ 2" percent={2 / 2} />
			</Header>
			<InputContainer>
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
					<ButtonContainer>
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
					</ButtonContainer>
				</InputComponent>
				<FormActions>
					<SecondaryButton onClick={() => router.back()}>ย้อนกลับ</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>เพิ่มรถบรรทุก</PrimaryButton>
				</FormActions>
			</InputContainer>
		</div>
	)
}

export default TruckAddStepTwo
