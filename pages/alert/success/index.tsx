import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { SecondaryButton } from "../../../components/styles/GlobalComponents"
import { Success } from "../../../components/common/Icons"

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`

const Title = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  color: hsl(212, 28%, 28%);
`

const Detail = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: hsl(212, 28%, 28%);

  &:not(:first-child) {
    margin-top: 1.8rem;
  }
`

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  > button {
    margin-top: 1.8rem;
  }
`

const SuccessPage = () => {
  const router = useRouter()
  return (
    <SuccessContainer>
      <Success />
      <DetailContainer>
        <Title>ยืนยันเสร็จสิ้น</Title>
        <Detail>เริ่มใช้ LOGPOST กันเลย!</Detail>
      </DetailContainer>
      <SecondaryButton onClick={() => router.push("/")}>ไปยังหน้าแรก</SecondaryButton>
    </SuccessContainer>
  )
}

export default SuccessPage
