import React from "react"
import Progress from "../../../common/Progress"
import styled from "styled-components"
import {
  FormActions,
  PrimaryButton,
  SecondaryButton,
  Detail,
} from "../../../styles/GlobalComponents"
import { JobDetailsInterface } from "../../../../entities/interface/common"
import DetailSection from "../../../common/DetailSection"
import { useRouter } from "next/router"

const JobMap = styled.div`
  background: url(/images/job-map.png) no-repeat;
  background-size: cover;
  height: 19rem;
`

const Header = styled.div`
  background-color: hsl(0, 0%, 98%);
  padding: 1.4rem 2.4rem;
`

const JobDetailsContainer = styled.div`
  margin: 1.8rem 2rem;
  ${PrimaryButton} {
    margin-top: 3rem;
  }
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
    align-self: flex-end;
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

const JobAddStepFour = (props: { details: JobDetailsInterface }) => {
  const router = useRouter()
  const { details } = props

  const createJob = () => {
    router.push(`/shipper/profile`)
  }

  return (
    <div>
      <Header>
        <Progress currentStep="ตัวอย่างงาน" percent={4 / 4} />
      </Header>
      <JobMap />
      <JobDetailsContainer>
        <DetailSection details={details} />
        <JobPrice>
          <Price>{details.offer_price} บาท</Price>
          <span>
            <Detail>
              โดย <span>ล็อกค้าไม้</span>
            </Detail>
            <span>18 ต.ค. 63 13.00 น.</span>
          </span>
        </JobPrice>
        <FormActions>
          <SecondaryButton onClick={() => router.push(`/jobs/add/3`)}>
            ย้อนกลับ
          </SecondaryButton>
          <PrimaryButton onClick={createJob}>สร้างงาน</PrimaryButton>
        </FormActions>
      </JobDetailsContainer>
    </div>
  )
}

export default JobAddStepFour
