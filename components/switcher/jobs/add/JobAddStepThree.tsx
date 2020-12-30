import React, { useState } from "react"
import styled from "styled-components"
import InputComponent from "../../../common/InputComponent"
import Progress from "../../../common/Progress"
import {
	FormActions,
	SecondaryButton,
	PrimaryButton,
} from "../../../styles/GlobalComponents"
import { JobAddInterface } from "../../../../entities/interface/common"
import { useRouter } from "next/router"
import SelectComponent from '../../../common/SelectComponent'
import { DRIVER_LICENSE_TYPE } from "../../../../data/carrier"

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
	display: flex;
	margin-top: 0.8rem;

	&:last-child {
		margin-top: 1.4rem;
	}
`
const Header = styled.div`
	background-color: hsl(0, 0%, 98%);
	padding: 1.4rem 2.4rem;
`

const JobAddStepThree = (props: JobAddInterface) => {
	const router = useRouter()
	const { details, setDetails } = props
	const [stepThreeDetails, setStepThreeDetails] = useState({
		age: details.carrier_specification.truck.age,
		driver_license_type: details.carrier_specification.driver.driver_license_type
	})
	const [truckType, setTruckType] = useState(details.carrier_specification.truck.type.wheel)
	const [addOn, setAddOn] = useState(details.carrier_specification.truck.type.options)

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setStepThreeDetails({
			...stepThreeDetails,
			[e.target.name]: value,
		})
	}

	const submitDetails = () => {
		setDetails({
			...details,
			carrier_specification: {
				truck: {
					age: stepThreeDetails.age,
					type: {
						wheel: truckType,
						options: addOn,
					}
				},
				driver: {
					driver_license_type: stepThreeDetails.driver_license_type,
				}
			}
		})
		router.push(`/jobs/add/4`, undefined, { shallow: true })
	}

	return (
		<div>
			<Header>
				<Progress
					currentStep="ข้อมูลรถบรรทุก"
					nextStep="แสดงตัวอย่างงาน"
					percent={3 / 4}
				/>
			</Header>
			<InputContainer>
				<InputComponent labelTH="ประเภทรถ" labelEN="Truck Type" type="other">
					<ButtonContainer>
						<ButtonItem
							onClick={() => setTruckType(4)}
							name="4"
							value={truckType}
						>
							รถ 4 ล้อ
						</ButtonItem>
						<ButtonItem
							onClick={() => setTruckType(6)}
							name="6"
							value={truckType}
						>
							รถ 6 ล้อ
						</ButtonItem>
					</ButtonContainer>
					<ButtonContainer>
						<ButtonItem
							onClick={() => setTruckType(10)}
							name="10"
							value={truckType}
						>
							รถ 10 ล้อ
						</ButtonItem>
						<ButtonItem
							onClick={() => setTruckType(0)}
							name="0"
							value={truckType}
						>
							รถหัวลาก
						</ButtonItem>
					</ButtonContainer>
				</InputComponent>
				<InputComponent labelTH="ส่วนเสริม" labelEN="Add-on" type="other">
					<ButtonContainer>
						<ButtonItem
							onClick={() => setAddOn("ตู้ทึบ")}
							name="ตู้ทึบ"
							value={addOn}
						>
							ตู้ทึบ
						</ButtonItem>
						<ButtonItem
							onClick={() => setAddOn("คอก")}
							name="คอก"
							value={addOn}
						>
							คอก
						</ButtonItem>
						<ButtonItem
							onClick={() => setAddOn("ตู้เย็น")}
							name="ตู้เย็น"
							value={addOn}
						>
							ตู้เย็น
						</ButtonItem>
					</ButtonContainer>
				</InputComponent>
				<InputComponent
					name="age"
					labelTH="อายุรถสูงสุด"
					labelEN="Maximum Truck Age"
					type="number"
					classifier="ปี"
					value={`${stepThreeDetails.age}`}
					handleOnChange={handleInputOnChange}
				/>
				<InputComponent
					name="driver_license_type"
					labelTH="ประเภทใบขับขี่"
					labelEN="Driver License Type"
					type="other"
				>
					<SelectComponent 
						menuList={DRIVER_LICENSE_TYPE}
						value={stepThreeDetails.driver_license_type}
						setValue={(value: string) => setStepThreeDetails({...stepThreeDetails, driver_license_type: value})}
					/>
				</InputComponent>
				<FormActions>
					<SecondaryButton onClick={() => router.push(`/jobs/add/2`)}>
						ย้อนกลับ
					</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
				</FormActions>
			</InputContainer>
		</div>
	)
}

export default JobAddStepThree
