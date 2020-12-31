import React, { useState } from 'react'
import styled from "styled-components"
import { useRouter } from "next/router"
import InputComponent from '../../../components/common/InputComponent'
import SelectComponent from '../../../components/common/SelectComponent'
import { DRIVER_LICENSE_TYPE } from '../../../data/carrier'
import { FormActions, PrimaryButton, SecondaryButton, FormInputContainer, FormHeader } from '../../../components/styles/GlobalComponents'

const FormHeaderCustom = styled(FormHeader)`
	padding: 3.4rem 0 3.4rem 3.7rem;
	font-size: 2.2rem;
	font-weight: 500;
	color: hsl(217, 16%, 16%);
`

const AddDriverPage = () => {
	const [driverDetails, setDriverDetails] = useState({
		status: "100",
		name: "",
		age: "",
		driver_license: "",
		driver_license_type: "ประเภท 1",
		identification_number: "",
	})
	const router = useRouter()

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (e.target.type === "number") {
			setDriverDetails({ ...driverDetails, [e.target.name]: parseInt(value) })
		} else {
			setDriverDetails({ ...driverDetails, [e.target.name]: value })
		}
	}

	const submitDetails = () => {
		console.log(driverDetails)
	}

	return (
		<div>
			<FormHeaderCustom>
				ข้อมูลพนักงานขับรถ
			</FormHeaderCustom>
			<FormInputContainer>
				<InputComponent 
					name="name"
					labelTH="ชื่อจริง - นามสกุล"
					labelEN="Name"
					value={driverDetails.name}
					handleOnChange={handleOnChange}
				/>
				<InputComponent 
					name="identification_number"
					labelTH="เลขบัตรประชาชน"
					labelEN="ID Number"
					value={driverDetails.identification_number}
					handleOnChange={handleOnChange}
				/>
				<InputComponent 
					name="driver_license"
					labelTH="เลขใบขับขี่"
					labelEN="Driver License"
					value={driverDetails.driver_license}
					handleOnChange={handleOnChange}
				/>
				<InputComponent
					name="driver_license_type"
					labelTH="ประเภทใบขับขี่"
					labelEN="Driver License Type"
					type="other"
				>
					<SelectComponent
						menuList={DRIVER_LICENSE_TYPE}
						value={driverDetails.driver_license_type}
						setValue={(value: string) => setDriverDetails({...driverDetails, driver_license_type: value})}
					/>
				</InputComponent>
				<InputComponent 
					name="age"
					type="number"
					labelTH="อายุ"
					labelEN="Age"
					value={driverDetails.age}
					handleOnChange={handleOnChange}
					classifier={"ปี"}
					required={false}
				/>
				<FormActions>
					<SecondaryButton onClick={() => router.push(`/carrier/driver/overview`)}>
						ยกเลิก
					</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>เพิ่มพนักงานขับรถ</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</div>
	)
}

export default AddDriverPage
