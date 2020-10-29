import React, { useState } from "react"
import Progress from "../../../common/Progress"
import styled from "styled-components"
import InputComponent from "../../../common/Input"
import {
  FormActions,
  PrimaryButton,
  SecondaryButton,
} from "../../../styles/GlobalComponents"
import { JobAddInterface } from "../../../../entities/interface/common"
import { useRouter } from "next/router"

const JobMap = styled.div`
  background: url(/images/job-map.png) no-repeat;
  height: 19rem;
`

const Header = styled.div`
  background-color: hsl(0, 0%, 98%);
  padding: 1.4rem 2.4rem;
`

const InputContainer = styled.div`
  padding: 1.8rem 2.6rem;

  > div:not(:first-child) {
    margin-top: 2rem;
  }

  ${PrimaryButton} {
    margin-top: 3rem;
  }
`

const SectionHeader = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: hsl(16, 56%, 51%);
  display: flex;
  align-items: center;
  height: 2.5rem;

  div:first-child {
    padding-right: 1.8rem;
    position: absolute;
    background: white;
  }
`

const Line = styled.div`
  height: 0.2rem;
  border-radius: 10rem;
  background-color: hsl(16, 56%, 51%);
  width: 100%;
`

const JobAddStepOne = (props: JobAddInterface) => {
  const router = useRouter()
  const { details, setDetails } = props
  const [stepOneDetails, setStepOneDetails] = useState(details)
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setStepOneDetails({ ...stepOneDetails, [e.target.name]: value })
  }

  const submitDetails = () => {
    setDetails({
      ...details,
      pickup_location: stepOneDetails.pickup_location,
      dropoff_location: stepOneDetails.dropoff_location,
      pickup_date: stepOneDetails.pickup_date,
      dropoff_date: stepOneDetails.dropoff_date,
    })
    router.push(`/jobs/add/2`, undefined, { shallow: true })
  }

  return (
    <div>
      <Header>
        <Progress
          currentStep="จุดขึ้น - ลงสินค้า"
          nextStep="ข้อมูลสินค้าและราคา"
          percent={1 / 4}
        />
      </Header>
      <JobMap />
      <InputContainer>
        <SectionHeader>
          <div>ขึ้นสินค้า</div> <Line />
        </SectionHeader>
        <InputComponent
          name="pickup_location"
          labelEN="Location"
          labelTH="สถานที่"
          value={stepOneDetails.pickup_location}
          handleOnChange={handleInputOnChange}
        />
        <InputComponent
          name="pickup_date"
          labelEN="Date and Time"
          labelTH="วันและเวลา"
          value={stepOneDetails.pickup_date}
          handleOnChange={handleInputOnChange}
        />
        <SectionHeader>
          <div>ลงสินค้า</div> <Line />
        </SectionHeader>
        <InputComponent
          name="dropoff_location"
          labelEN="Location"
          labelTH="สถานที่"
          value={stepOneDetails.dropoff_location}
          handleOnChange={handleInputOnChange}
        />
        <InputComponent
          name="dropoff_date"
          labelEN="Date and Time"
          labelTH="วันและเวลา"
          value={stepOneDetails.dropoff_date}
          handleOnChange={handleInputOnChange}
        />
        <FormActions>
          <SecondaryButton>ยกเลิก</SecondaryButton>
          <PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
        </FormActions>
      </InputContainer>
    </div>
  )
}

export default JobAddStepOne
