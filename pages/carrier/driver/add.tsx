import React, { useState } from 'react'
import styled from "styled-components"
import { useRouter } from "next/router"
import InputComponent from '../../../components/common/InputComponent'
import SelectComponent from '../../../components/common/SelectComponent'
import { DRIVER_LICENSE_TYPE } from '../../../data/carrier'
import { FormActions, PrimaryButton, SecondaryButton, FormInputContainer, FormHeader } from '../../../components/styles/GlobalComponents'
import { createDriver } from '../../../components/utilities/apis'
import { useSetRecoilState } from 'recoil'
import { resourceCreatedState } from '../../../store/atoms/overviewPageState'
import useAlert from '../../../hooks/useAlert'

const FormHeaderCustom = styled(FormHeader)`
	padding: 3.4rem 0 3.4rem 3.7rem;
	font-size: 2.2rem;
	font-weight: 500;
	color: hsl(217, 16%, 16%);
`

const AddDriverPage = () => {
	const router = useRouter()
	const [driverDetails, setDriverDetails] = useState({
		name: "",
		age: undefined,
		driver_license: "",
		driver_license_type: "ประเภท 1",
		identification_number: "",
		tel: ""
	})
	const initialValidField = {
		name: true,
		age: true,
		driver_license: true,
		identification_number: true,
		tel: true
	}
	const [validField, setValidField] = useState(initialValidField)
	const setAlert = useAlert()

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value
		if (/^\s/.test(value)) {
            value = ''
        }
		if (e.target.type === "number") {
			setDriverDetails({ ...driverDetails, [e.target.name]: parseInt(value) })
		} else {
			setDriverDetails({ ...driverDetails, [e.target.name]: value })
		}
	}

	const validateInput = () => {
		const copyOfValidField = { ...validField }
		const isNameValid = (driverDetails.name !== "")
		const isAgeValid = (driverDetails.age > 18)
		const isDriverLicenseValid = (driverDetails.driver_license.length === 8)
		const isIDNumberValid = (driverDetails.identification_number.length === 13)
		const isTelValid = (/^0[0-9]{9}/.test(driverDetails.tel))
		const AllInputsValid = (isNameValid && isAgeValid && isDriverLicenseValid && isIDNumberValid && isTelValid)
		if (AllInputsValid) {
			setValidField(initialValidField)
			return true
		} else {
			copyOfValidField.name = isNameValid
			copyOfValidField.age = isAgeValid
			copyOfValidField.driver_license = isDriverLicenseValid
			copyOfValidField.identification_number = isIDNumberValid
			copyOfValidField.tel = isTelValid
			setValidField(copyOfValidField)
		}
	}

	const submitDetails = async () => {
		if (validateInput()) {
			const response = await createDriver(driverDetails)
			if (response !== 200) {
				setAlert(true, "error")
			} else {
				setAlert(true, "success")
			}
			router.push(`/carrier/driver/overview`, undefined, { shallow: true })
		}
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
					valid={validField.name}
				/>
				<InputComponent 
					name="identification_number"
					labelTH="เลขบัตรประชาชน"
					labelEN="ID Number"
					value={driverDetails.identification_number}
					handleOnChange={handleOnChange}
					valid={validField.identification_number}
					invalidText="กรุณากรอกเลขบัตรประชาชน 13 หลัก"
				/>
				<InputComponent 
					name="driver_license"
					labelTH="เลขใบอนุญาตขับขี่"
					labelEN="Driver License"
					value={driverDetails.driver_license}
					handleOnChange={handleOnChange}
					valid={validField.driver_license}
					invalidText="กรุณากรอกเลขใบอนุญาตขับขี่ 8 หลัก"
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
					value={driverDetails.age || ""}
					handleOnChange={handleOnChange}
					classifier={"ปี"}
					valid={validField.age}
					invalidText="พนักงานขับรถต้องมีอายุมากกว่า 18 ปี"
				/>
				<InputComponent 
					name="tel"
					labelTH="หมายเลขโทรศัพท์"
					labelEN="Phone Number"
					value={driverDetails.tel}
					handleOnChange={handleOnChange}
					valid={validField.tel}
					invalidText="กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก"
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
