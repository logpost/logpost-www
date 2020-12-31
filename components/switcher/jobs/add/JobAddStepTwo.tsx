import React, { useState } from "react"
import Progress from "../../../common/Progress"
import styled from "styled-components"
import InputComponent from "../../../common/InputComponent"
import {
	FormActions,
	PrimaryButton,
	SecondaryButton,
	FormInputContainer,
	FormHeader
} from "../../../styles/GlobalComponents"
import { JobAddInterface } from "../../../../entities/interface/common"
import { useRouter } from "next/router"

const JobAddStepTwo = (props: JobAddInterface) => {
	const router = useRouter()
	const { details, setDetails } = props
	const [stepTwoDetails, setStepTwoDetails] = useState(details)
	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setStepTwoDetails({ ...stepTwoDetails, [e.target.name]: value })
	}

	const submitDetails = () => {
		setDetails({
			...details,
			product_type: stepTwoDetails.product_type,
			weight: stepTwoDetails.weight,
			waiting_time: stepTwoDetails.waiting_time,
			offer_price: stepTwoDetails.offer_price,
			description: stepTwoDetails.description,
		})
		router.push(`/jobs/add/3`, undefined, { shallow: true })
	}

	return (
		<div>
			<FormHeader>
				<Progress
					currentStep="ข้อมูลสินค้าและราคา"
					nextStep="ข้อมูลรถบรรทุก"
					percent={2 / 4}
				/>
			</FormHeader>
			<FormInputContainer>
				<InputComponent
					name="product_type"
					labelEN="Product Type"
					labelTH="ชนิดสินค้า"
					value={stepTwoDetails.product_type}
					handleOnChange={handleInputOnChange}
				/>
				<InputComponent
					name="weight"
					labelEN="Product Weight"
					labelTH="น้ำหนักสินค้า"
					type="number"
					description="1 ตัน = 1,000 กิโลกรัม"
					classifier="ตัน"
					value={`${stepTwoDetails.weight}`}
					handleOnChange={handleInputOnChange}
				/>
				<InputComponent
					name="offer_price"
					labelEN="Offer Price"
					labelTH="ราคาเสนอ"
					type="short"
					classifier="บาท"
					value={`${stepTwoDetails.offer_price}`}
					handleOnChange={handleInputOnChange}
				/>
				<InputComponent
					name="waiting_time"
					labelEN="Waiting Time"
					type="number"
					labelTH="เวลารอขึ้น - ลงสินค้า"
					classifier="ชั่วโมง"
					required={false}
					value={`${stepTwoDetails.waiting_time}`}
					handleOnChange={handleInputOnChange}
				/>
				<InputComponent
					name="description"
					labelEN="Description"
					labelTH="คำอธิบายเพิ่มเติม"
					required={false}
					value={stepTwoDetails.description}
					handleOnChange={handleInputOnChange}
				/>
				<FormActions>
					<SecondaryButton onClick={() => router.push(`/jobs/add/1`)}>ย้อนกลับ</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</div>
	)
}

export default JobAddStepTwo