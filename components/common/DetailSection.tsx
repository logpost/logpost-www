import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { DetailRow, Detail } from "../styles/GlobalComponents"
import { DownArrowLine, UpArrowLine } from "./Icons"
import { JobDetailsInterface } from '../../entities/interface/common'

interface DetailInterface {
  details: JobDetailsInterface
}

const DetailSectionContainer = styled.div`
  > div {
    margin-top: 2rem;

    &:not(#space-between) {
      justify-content: flex-start;

      ${Detail}:first-child {
        margin-right: 1.2rem;
      }
    }
  }
`

const SectionHeader = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: hsl(212, 28%, 28%);
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
  background-color: hsl(212, 28%, 88%);
  width: 100%;
`

const PickUpDeliverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.6rem;
  border: solid 0.2rem hsl(16, 56%, 51%);
  color: hsl(16, 56%, 51%);
  padding: 0.9rem 1.55rem;
  font-weight: 600;

  &:first-child {
    color: hsl(212, 28%, 28%);
    border-color: hsl(212, 28%, 28%);

    svg path {
      fill: hsl(212, 28%, 28%);
    }
  }

  span:not(:first-child) {
    margin-top: 0.6rem;
  }

  > span {
    font-size: 1.4rem;

    &:nth-child(2) {
      font-size: 1.8rem;
      font-weight: bold;
    }

    &:last-child {
      font-weight: 500;
    }
  }
`

const DetailSection = (props: DetailInterface) => {
  const { details } = props

  return (
    <DetailSectionContainer>
      <SectionHeader>
        <div>รายละเอียดงาน</div> <Line />
      </SectionHeader>
      <>
        <DetailRow id="space-between">
          <PickUpDeliverContainer>
            <span>
              ขึ้นสินค้า <UpArrowLine />
            </span>
            <span>{details.pickup_location}</span>
            {/* <span>{details.pickup_date}</span> */}
            <span>30 ต.ค. 63 09:00 น.</span>
          </PickUpDeliverContainer>
          <PickUpDeliverContainer>
            <span>
              ลงสินค้า <DownArrowLine />
            </span>
            <span>{details.dropoff_location}</span>
            {/* <span>{details.dropoff_date}</span> */}
            <span>31 ต.ค. 63 10:00 น.</span>
          </PickUpDeliverContainer>
        </DetailRow>
        <DetailRow>
          <Detail>
            สินค้า <span>{details.product_type}</span>
          </Detail>
          <Detail>
            น้ำหนัก <span>{details.weight}</span> <span>ตัน</span>
          </Detail>
        </DetailRow>
        <Detail>
          ขึ้นลงสินค้า <span>{details.waiting_time}</span> <span>ชั่วโมง</span>
        </Detail>
        <Detail>
          คำอธิบาย <span>{details.description}</span>
        </Detail>
      </>
      <SectionHeader>
        <div>รายละเอียดรถบรรทุก</div> <Line />
      </SectionHeader>
      <>
        <DetailRow>
          <Detail>
            ประเภทรถ <span>รถ {details.carrier_specification.truck.type.wheel} ล้อ {details.carrier_specification.truck.type.option}</span>
          </Detail>
          <Detail>
            อายุไม่เกิน <span>{details.carrier_specification.truck.age}</span> <span>ปี</span>
          </Detail>
        </DetailRow>
        <Detail>
          พนักงานขับรถใบขับขี่ <span>{details.carrier_specification.driver.driver_license_type}</span>
        </Detail>
      </>
    </DetailSectionContainer>
  )
}

export default DetailSection
