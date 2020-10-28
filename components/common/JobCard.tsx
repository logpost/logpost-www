import React from "react"
import styled from "styled-components"
import { PrimaryButton } from "../styles/GlobalComponents"
import {
  DownArrowLine,
  PersonIcon,
  ProductIcon,
  RightArrowLine,
  TruckIcon,
  UpArrowLine,
} from "./Icon"

const CardContainer = styled.div`
  display: flex;
  padding: 1.8rem 2rem;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;

  &:nth-child(even) {
    background-color: hsl(220, 27%, 96%);
  }

  > div:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`

const Locations = styled.div`
  display: flex;
  width: 16.5rem;
  justify-content: space-between;
  font-size: 1.8rem;
  font-weight: bold;
  color: hsl(217, 16%, 16%);
`

const DateAndTime = styled.div`
  display: flex;

  svg {
    margin-right: 0.6rem;
  }

  span {
    margin: 0 0.8rem;
  }
`

const PrimaryButtonCustom = styled(PrimaryButton)`
  box-shadow: none;
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
  align-self: flex-end;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
`

const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    font-size: 1.8rem;
    margin-bottom: 0.6rem;
  }
`

const Detail = styled.div`
  display: flex;
  margin-right: 1.6rem;

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;

    path {
      stroke: hsl(16, 56%, 51%);

      &#person {
        stroke-width: 0.2rem;
      }

      &#truck {
        stroke-width: 0.3rem;
      }
    }
  }
`

const JobCard = () => {

  return (
    <CardContainer>
      <Locations>
        กรุงเทพ
        <RightArrowLine />
        ชลบุรี
      </Locations>
      <DetailRow>
        <DateAndTime>
          <UpArrowLine />
          20 ต.ค. 63 <span>|</span> 09:00 น.
        </DateAndTime>
        <DateAndTime>
          <DownArrowLine />
          20 ต.ค. 63 <span>|</span> 18:00 น.
        </DateAndTime>
      </DetailRow>
      <DetailRow>
        <DetailColumn>
          <DetailRow>
            <Detail>
              <TruckIcon />
              รถ 6 ล้อ
            </Detail>
            <Detail>
              <ProductIcon />
              ไม้อัด 2 ตัน
            </Detail>
          </DetailRow>
          <Detail>
            <PersonIcon />
            นายคนขับ ขนส่ง
          </Detail>
        </DetailColumn>
        <DetailColumn>
          <span>8,000 บาท</span>
          <PrimaryButtonCustom>รายละเอียด</PrimaryButtonCustom>
        </DetailColumn>
      </DetailRow>
    </CardContainer>
  )
}

export default JobCard