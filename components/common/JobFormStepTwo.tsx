import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { JobFormInterface } from '../../entities/interface/job'
import { jobDetailsState, jobStepTwoSelector } from '../../store/atoms/jobDetailsState'
import { FormInputContainer } from '../styles/GlobalComponents'
import { offerCalculator } from '../utilities/costCalculater'
import { handleChangedField } from '../utilities/helper'
import InputComponent from './InputComponent'

const JobFormStepTwo = (props: JobFormInterface) => {
    const { changedField, setChangedField } = props

    const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
    const stepTwoDetails = useRecoilValue(jobStepTwoSelector)
    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const field = e.target.name
        handleChangedField(changedField, setChangedField, [field])
        if (e.target.type === "number") {
            setJobDetails({ ...jobDetails, [field]: parseInt(value)})
        } else {
            setJobDetails({ ...jobDetails, [field]: value })
        }
    }
    
    return (
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
                value={stepTwoDetails.weight || ""}
                handleOnChange={handleInputOnChange}
            />
            <InputComponent
                name="offer_price"
                labelEN="Offer Price"
                labelTH="ราคาเสนอ"
                description={`ราคาที่เหมาะสมของงานนี้คือ ${offerCalculator(parseInt(stepTwoDetails.weight))}`}
                type="number"
                classifier="บาท"
                value={stepTwoDetails.offer_price || ""}
                handleOnChange={handleInputOnChange}
            />
            <InputComponent
                name="waiting_time"
                labelEN="Waiting Time"
                type="number"
                labelTH="เวลารอขึ้น - ลงสินค้า"
                classifier="ชั่วโมง"
                required={false}
                value={stepTwoDetails.waiting_time || ""}
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
        </FormInputContainer>
    )
}

export default JobFormStepTwo
