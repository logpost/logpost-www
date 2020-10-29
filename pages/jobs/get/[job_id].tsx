import React, { useState, ReactElement } from "react"
import styled from "styled-components"
import Header from "../../../components/common/Header"
import { useRouter } from 'next/router'
import {
  RightArrow,
  RightArrowLine,
} from "../../../components/common/Icons"
import {
  CarrierDetailsContainer,
  Detail,
  JobTitle,
  SecondaryButton,
  FormActions,
  PrimaryButton,
} from "../../../components/styles/GlobalComponents"
import DetailSection from "../../../components/common/DetailSection"
import Modal from "../../../components/common/Modal"
import TableComponent from "../../../components/common/TableComponent"
import NavigationBar from "../../../components/common/NavigationBar"

const MOCKUP_DRIVER = [
  {
    id: "01",
    driver_name: "คนขับหนึ่ง ส่งของ",
    driver_license_type: "ท.2",
  },
  {
    id: "02",
    driver_name: "คนขับหนึ่ง ขนส่ง",
    driver_license_type: "ท.2",
  },
  {
    id: "03",
    driver_name: "คนขับสอง ส่งของ",
    driver_license_type: "ท.2",
  },
]

const MOCKUP_TRUCK = [
  {
    license_number: "90-6179",
    wheel: "หัวลาก",
    add_on: "2 เพลา",
  },
  {
    license_number: "89-7280",
    wheel: "6 ล้อ",
    add_on: "-",
  },
  {
    license_number: "กข-1111",
    wheel: "4 ล้อ",
    add_on: "ตู้ทึบ",
  },
]

const JOB_MOCK_DETAILS = {
  shipper_id: "01",
  carrier_id: "02",
  driver_name: "",
  license_number: "",
  pickup_location: "กรุงเทพ",
  dropoff_location: "ชลบุรี",
  pickup_date: "20 ต.ค. 63 09:00 น.",
  dropoff_date: "20 ต.ค. 63 18:00 น.",
  weight: 2,
  product: "ไม้อัด",
  description: "งานด่วน ไม่ต้องรอขึ้นของ",
  waiting_time: 0,
  truck: {
    type: "รถ 6 ล้อ พื้นเรียบ",
    age: 5,
    driver_license_type: "ท.2",
  },
  offer_price: 8000,
  auto_price: 4800,
}

const JobDetails = styled.div`
  padding: 0 2rem;

  ${Detail} {
    span {
      margin-left: 1.1rem;
    }

    button,
    svg {
      margin-left: 1.1rem;
      color: hsl(16, 56%, 51%);

      path {
        fill: hsl(16, 56%, 51%);
      }
    }
  }

  ${FormActions} {
    margin-top: 2rem;
    
    > button {
      font-size: 1.6rem;
      margin-top: 0;
      font-weight: 500;
      border-radius: 0.6rem
    }

    ${PrimaryButton} {
      box-shadow: none;
      background-color: hsl(212, 28%, 28%);
    }
  }
`

const Warning = styled.div`
  margin-top: 2rem;
  color: hsl(16, 56%, 51%);
  font-size: 1.8rem;
  font-weight: 600;
`

const ModalContent = styled.div`
  display: flex;
  width: 30rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  > *:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  span:not(:last-child) {
    line-height: 3.24rem;
    padding: 0 1.2rem;
  }

  ${FormActions} {
    ${SecondaryButton}, ${PrimaryButton} {
      font-size: 1.6rem;
      box-shadow: none;
      margin-top: 0;
      height: fit-content;
      font-weight: 500;
    }
  }
`

const ModalTitle = styled.div`
  color: hsl(212, 28%, 28%);
  font-weight: 600;
  font-size: 2rem;
`

const GetJobPage = () => {
  const router = useRouter()
  const { job_id } = router.query 
  const [toggleDriverModal, setToggleDriverModal] = useState(false)
	const [toggleTruckModal, setToggleTruckModal] = useState(false)
  const [carrierDetails, setCarrierDetails] = useState({
		truck: "",
		driver: ""
	})

  const driverColumns = [
    {
      id: "id",
      label: "รหัส",
    },
    {
      id: "driver_name",
      label: "ชื่อ - นามสกุล",
    },
    {
      id: "driver_license_type",
      label: "ใบขับขี่",
    },
    {
      id: "actions",
      label: "เลือก",
      format: (driver_index: number): ReactElement => (
        <input type="radio" value={driver_index} name="driver" />
      ),
    },
  ]

  const truckColumns = [
    {
      id: "license_number",
      label: "ทะเบียน",
    },
    {
      id: "wheel",
      label: "ประเภท",
    },
    {
      id: "add_on",
      label: "เพิ่มเติม",
    },
    {
      id: "actions",
      label: "เลือก",
      format: (truck_index: number): ReactElement => (
        <input type="radio" value={truck_index} name="truck" />
      ),
    },
  ]

  const selectRow = (type:string) => {
    setToggleDriverModal(false)
    setToggleTruckModal(false)
    const element = document.querySelector(
      `input[name=${type}]:checked`
    ) as HTMLInputElement
    setCarrierDetails({...carrierDetails, [type]: element.value})
  }

  return (
    <div>
      <NavigationBar />
      <Modal toggle={toggleDriverModal} setToggle={setToggleDriverModal}>
        <ModalContent>
          <ModalTitle>เลือกพนักงานขับรถ</ModalTitle>
          <TableComponent columns={driverColumns} data={MOCKUP_DRIVER} />
          <FormActions>
            <SecondaryButton onClick={() => setToggleDriverModal(false)}>
              ย้อนกลับ
            </SecondaryButton>
            <PrimaryButton onClick={() => selectRow("driver")}>ยืนยันเลือก</PrimaryButton>
          </FormActions>
        </ModalContent>
      </Modal>
			<Modal toggle={toggleTruckModal} setToggle={setToggleTruckModal}>
        <ModalContent>
          <ModalTitle>เลือกรถบรรทุก</ModalTitle>
          <TableComponent columns={truckColumns} data={MOCKUP_TRUCK} />
          <FormActions>
            <SecondaryButton onClick={() => setToggleTruckModal(false)}>
              ย้อนกลับ
            </SecondaryButton>
            <PrimaryButton onClick={() => selectRow("truck")}>ยืนยันเลือก</PrimaryButton>
          </FormActions>
        </ModalContent>
      </Modal>
      <Header>
        <JobTitle>
          รับงาน กรุงเทพ
          <RightArrowLine />
          ชลบุรี
        </JobTitle>
      </Header>
      <JobDetails>
        <DetailSection details={JOB_MOCK_DETAILS} />
        <Warning>เลือกพนักงานและรถบรรทุกที่ใช้รับงาน</Warning>
        <CarrierDetailsContainer>
          <Detail>
            พนักงานขับรถ
            {carrierDetails.driver ? (
              <span>{MOCKUP_DRIVER[carrierDetails.driver].driver_name}</span>
            ) : (
              <button onClick={() => setToggleDriverModal(true)}>
                เลือกพนักงานขับรถ
                <RightArrow />
              </button>
            )}
          </Detail>
          <Detail>
            ทะเบียนรถ
            {carrierDetails.truck ? (
              <span>{MOCKUP_TRUCK[carrierDetails.truck].license_number}</span>
            ) : (
              <button onClick={() => setToggleTruckModal(true)}>
                เลือกรถบรรทุก
                <RightArrow />
              </button>
            )}
          </Detail>
        </CarrierDetailsContainer>
        <FormActions>
          <SecondaryButton>ย้อนกลับ</SecondaryButton>
          <PrimaryButton onClick={() => router.push(`/jobs/details/${job_id}`)}>ยืนยันรับงาน</PrimaryButton>
        </FormActions>
      </JobDetails>
    </div>
  )
}

export default GetJobPage
