import React, { useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Header from "../../../components/common/Header"
import { RightArrowLine } from "../../../components/common/Icons"
import Progress from "../../../components/common/Progress"
import {
  DetailRow,
  Detail,
  SecondaryButton,
} from "../../../components/styles/GlobalComponents"
import NavigationBar from "../../../components/common/NavigationBar"
import DetailSection from "../../../components/common/DetailSection"
import { JobDetailsInterface } from "../../../entities/interface/common"
import Modal from "../../../components/common/Modal"

const STATUS_CODE = {
  100: "รอผู้รับงาน",
  200: "เตรียมเริ่มงาน",
  300: "เดินทางไปรับสินค้า",
  400: "นำสินค้าขึ้น ณ ต้นทาง",
  500: "นำส่งสินค้า",
  600: "นำสินค้าลง ณ ปลายทาง",
  700: "ขนส่งเสร็จสิ้น",
}

const JOB_MOCK_DETAILS = {
  shipper_id: "01",
  carrier_id: "01",
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

const PAGE_TEST = [
  {
    user_id: "01",
    role: "carrier",
    status: 200,
  },
]

const PageContainer = styled.div`
  margin-bottom: 8rem;

  ${DetailRow} {
    > span {
      align-self: flex-end;
      font-size: 1.4rem;
      font-weight: 500;
      color: hsl(0, 0%, 66%);
    }
  }
`

const JobTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 0.2rem 0;

  svg {
    margin: 0 1.4rem;

    path {
      fill: white;
    }
  }
`

const JobMap = styled.div`
  background: url(/images/job-map.png) no-repeat;
  height: 19rem;
`

const JobDetailsContainer = styled.div`
  margin: 1.8rem 2rem;
`

const HorizontalLine = styled.div`
  height: auto;
  background-color: hsl(212, 28%, 88%);
  width: 0.2rem;
`

const JobPrice = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 500;
  color: hsl(0, 0%, 66%);

  ${Detail} {
    justify-content: flex-end;
  }

  > span {
    justify-content: flex-end;
  }
`

const Price = styled.div`
  font-size: 2rem;
  color: white;
  padding: 0.4rem 1.6rem;
  font-weight: 500;
  border-radius: 6px;
  background-color: hsl(212, 28%, 28%);
  height: fit-content;
`

const SecondaryButtonCustom = styled(SecondaryButton)`
  padding: 0.6rem 0;
  width: 38%;
  border-radius: 6px;
  font-weight: 600;
  height: fit-content;
`

const PrimaryButton = styled(SecondaryButtonCustom)`
  background-color: hsl(212, 28%, 28%);
  color: white;
  width: 51%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;

  > button:not(:last-child) {
    margin-right: 1.6rem;
  }
`

const PriceDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`

const PriceItem = styled.div`
  font-size: 1.6rem;
  color: hsl(218, 9%, 25%);
  font-weight: 500;

  > span {
    font-weight: 500;
    font-size: 1.2rem;
    color: hsl(0, 0%, 66%);
  }

  &:last-child {
    div {
      color: ${props => props["data-price"] ? "green" : "red"};
    }
  }

  div {
    margin-top: 1.1rem;


    span {
      color: hsl(0, 0%, 51%);
    }
  }
`

const CarrierDetailsContainer = styled.div`
  margin-top: 2rem;
  padding: 0.8rem 1.6rem;
  background-color: hsl(211, 28%, 94%);

  > div:not(:first-child) {
    margin-top: 0.8rem;
  }
`

const ShipperPage = (props: JobDetailsInterface) => {
  const { role, status, user_id } = PAGE_TEST[0]
  const router = useRouter()
  const { job_id } = router.query
  const [ isPositive, setIsPositive ] = useState(true)
  const [ toggleModal, setToggleModal ] = useState(false)

  const calculateProfit = (offerPrice:number, autoPrice:number):string => {
    const profit = offerPrice - autoPrice
    if (profit < 0) {
      setIsPositive(false)
    }
    return profit.toLocaleString()
  }

  return (
    <PageContainer>
      <NavigationBar />
      <Header>
        <JobTitle>
          งาน กรุงเทพ
          <RightArrowLine />
          ชลบุรี
        </JobTitle>
      </Header>
      <JobMap />
      <JobDetailsContainer>
        <Progress
          currentStep={STATUS_CODE[status]}
          nextStep={STATUS_CODE[status + 100]}
          percent={(status - 100) / 600}
          label="สถานะ"
        />
        <DetailSection details={JOB_MOCK_DETAILS} />
        {status > 100 && (
          <CarrierDetailsContainer>
            { role !== "carrier" &&
              <Detail>
                ขนส่งโดย <span>ล็อกโพสต์ ขนส่ง จำกัด</span>
              </Detail>
            }
            <Detail>
              พนักงานขับรถ <span>คนขับหนึ่ง</span>
            </Detail>
            <Detail>
              ทะเบียนรถ <span>89-7280</span>
            </Detail>
          </CarrierDetailsContainer>
        )}
        {role === "carrier" && (
          <PriceDetailsContainer>
            <PriceItem>
              ราคาเสนอ
              <div>
                {JOB_MOCK_DETAILS.offer_price.toLocaleString()} <span>บาท</span>
              </div>
            </PriceItem>
            <HorizontalLine />
            <PriceItem>
              ต้นทุน <span>ประมาณ</span>
              <div>
                {JOB_MOCK_DETAILS.auto_price.toLocaleString()} <span>บาท</span>
              </div>
            </PriceItem>
            <HorizontalLine />
            <PriceItem data-price={isPositive}>
              กำไร
              <div>
                {calculateProfit(JOB_MOCK_DETAILS.offer_price, JOB_MOCK_DETAILS.auto_price)} <span>บาท</span>
              </div>
            </PriceItem>
          </PriceDetailsContainer>
        )}
        { role !== "carrier" &&
          <JobPrice>
            <Price>8,000 บาท</Price>
            <span>
              {
                user_id !== JOB_MOCK_DETAILS.shipper_id &&
                <Detail>โดย <span>ล็อกค้าไม้</span></Detail>
              }
              <span>18 ต.ค. 63 13.00 น.</span>
            </span>
          </JobPrice>
        }
        {status === 100 && (
          <ButtonContainer>
            <SecondaryButtonCustom>ลบงาน</SecondaryButtonCustom>
            <SecondaryButtonCustom>แก้ไขงาน</SecondaryButtonCustom>
          </ButtonContainer>
        )}
        {
          status === 200 && JOB_MOCK_DETAILS.carrier_id === user_id && 
          <>
            <Modal toggle={toggleModal} setToggle={setToggleModal} />
            <ButtonContainer>
              <SecondaryButtonCustom>ยกเลิก</SecondaryButtonCustom>
              <SecondaryButtonCustom>แก้ไข</SecondaryButtonCustom>
              <PrimaryButton onClick={() => setToggleModal(true)}>เริ่มงาน</PrimaryButton>
            </ButtonContainer>
          </>
        }
      </JobDetailsContainer>
    </PageContainer>
  )
}

export default ShipperPage
