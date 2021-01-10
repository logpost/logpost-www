import React, { useState } from "react"
import InputComponent from "../../../common/InputComponent"
import Progress from "../../../common/Progress"
import {
	FormActions,
	SecondaryButton,
	PrimaryButton,
	FormInputContainer,
	FormHeader,
	ButtonGroupContainer,
	ButtonItem
} from "../../../styles/GlobalComponents"
import { JobAddInterface } from "../../../../entities/interface/job"
import { useRouter } from "next/router"
import SelectComponent from '../../../common/SelectComponent'
import { DRIVER_LICENSE_TYPE, TRUCK_TYPE_LIST } from "../../../../data/carrier"

const JobAddStepThree = (props: JobAddInterface) => {
	const router = useRouter()
	const { details, setDetails } = props
	const [stepThreeDetails, setStepThreeDetails] = useState({
		age: String(details.carrier_specification.truck.age),
		driver_license_type: details.carrier_specification.driver.driver_license_type
	})
	const [truckProperty, setTruckProperty] = useState(details.carrier_specification.truck.property)

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
					age: parseInt(stepThreeDetails.age),
					property: truckProperty
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
			<FormHeader>
				<Progress
					currentStep="ข้อมูลรถบรรทุก"
					nextStep="แสดงตัวอย่างงาน"
					percent={3 / 4}
				/>
			</FormHeader>
			<FormInputContainer>
				<InputComponent labelTH="ประเภทรถ" labelEN="Truck Type" type="other">
					<SelectComponent
						menuList={Object.keys(TRUCK_TYPE_LIST)}
						value={truckProperty.type}
						setValue={(value: string) => setTruckProperty({ ...truckProperty, type: value })}
					/>
				</InputComponent>
				<InputComponent labelTH="ส่วนเสริม" labelEN="Option" type="other">
					<ButtonGroupContainer>
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
					</ButtonGroupContainer>
				</InputComponent>
				{
					TRUCK_TYPE_LIST[truckProperty.type].chassis && 
					<InputComponent labelTH="จำนวนเพลา" labelEN="Chassis" type="other">
						<ButtonGroupContainer>
							{
								TRUCK_TYPE_LIST[truckProperty.type].chassis.map((chassis: number, index: number) => {
									return (
										<ButtonItem
											key={index}
											onClick={() => setTruckProperty({ ...truckProperty, chassis: chassis })}
											name={String(chassis)}
											value={String(truckProperty.chassis)}
										>
											{`${chassis} เพลา`}
										</ButtonItem>
									)
								})
							}
						</ButtonGroupContainer>
					</InputComponent>
				}
				<InputComponent
					name="age"
					labelTH="อายุรถสูงสุด"
					labelEN="Maximum Truck Age"
					type="number"
					classifier="ปี"
					required={false}
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
			</FormInputContainer>
		</div>
	)
}

export default JobAddStepThree
