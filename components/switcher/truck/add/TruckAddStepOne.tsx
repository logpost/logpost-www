import React, { useState } from 'react'
import styled from "styled-components"
import { TRUCK_TYPE_LIST } from '../../../../data/carrier'
import InputComponent from '../../../common/InputComponent'
import Progress from '../../../common/Progress'
import SelectComponent from '../../../common/SelectComponent'
import { FormActions, PrimaryButton, SecondaryButton } from '../../../styles/GlobalComponents'
import { useRouter } from 'next/router'

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

const TruckAddStepOne = (props) => {
	const { details, setDetails } = props
	const router = useRouter()
	const [truckProperty, setTruckProperty] = useState(details.property)
	const [truckWeight, setTruckWeight] = useState(details.weight)

	const handleWeightOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setTruckWeight({ ...truckWeight, [e.target.name]: parseInt(value) })
	}

	const submitDetails = () => {
		setDetails({
			...details,
			weight: truckWeight,
			property: truckProperty,
		})
		router.push(`/carrier/truck/add/2`, undefined, { shallow: true })
	}

	return (
		<>
			<Header>
				<Progress currentStep="ข้อมูลรถส่วนที่ 1" nextStep="ข้อมูลรถส่วนที่ 2" percent={1 / 2} />
			</Header>
			<InputContainer>
				<InputComponent labelTH="ประเภทรถ" labelEN="Truck Type" type="other">
					<SelectComponent
						menuList={Object.keys(TRUCK_TYPE_LIST)}
						value={truckProperty.type}
						setValue={(value: string) => setTruckProperty({ ...truckProperty, type: value })}
					/>
				</InputComponent>
				<InputComponent labelTH="ส่วนเสริม" labelEN="Option" type="other">
					<ButtonContainer>
						{
							TRUCK_TYPE_LIST[truckProperty.type].option.map((option: string, index: number) => {
								return (
									<ButtonItem
										key={index}
										onClick={() => setTruckProperty({ ...truckProperty, option: option })}
										name={option}
										value={truckProperty.option}
									>
										{option}
									</ButtonItem>
								)
							})
						}
					</ButtonContainer>
				</InputComponent>
				<div>
					<InputComponent 
						labelTH="น้ำหนักบรรทุก" 
						labelEN="Load Weight"
						subLabel="ต่ำสุด" 
						type="number" 
						description="1 ตัน = 1,000 กิโลกรัม"
						classifier="ตัน"
						name="min"
						handleOnChange={handleWeightOnChange}/>
					<InputComponent 
						disableLabel={true}
						subLabel="สูงสุด" 
						type="number" 
						classifier="ตัน"
						name="max"
						handleOnChange={handleWeightOnChange}/>
				</div>
				<FormActions>
					<SecondaryButton onClick={() => router.back()}>ยกเลิก</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
				</FormActions>
			</InputContainer>
		</>
	)
}

export default TruckAddStepOne
