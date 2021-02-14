import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { jobDetailsSelector } from '../../../store/atoms/jobDetailsState'
import { getJobDetailsByID } from '../../../components/utilities/apis'
import { JobDocument } from '../../../entities/interface/job'
import JobFormStepOne from '../../../components/common/JobFormStepOne'
import JobFormStepTwo from '../../../components/common/JobFormStepTwo'
import JobFormStepThree from '../../../components/common/JobFormStepThree'
import { FormActions, JobTitle, PrimaryButton, SecondaryButton } from '../../../components/styles/GlobalComponents'
import Header from '../../../components/common/Header'
import { RightArrowLine } from '../../../components/common/Icons'
import JobDetailsSection from '../../../components/common/JobDetailsSection'

const SectionHeader = styled.div`
    padding: 0 2.6rem;
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

const FormActionsCustom = styled(FormActions)`
	padding: 0 2.6rem;
	margin: 1.2rem 0 3rem 0;
`

const JobDetailsContainer = styled.div`
    margin: 1.8rem 2rem;
`;


const EditJobPage = () => {
    const router = useRouter()
    const jobID = router.query.job_id as string
    const [currentPage, setCurrentPage] = useState("edit")
    const [jobDetails, setJobDetails] = useRecoilState(jobDetailsSelector)

    const updateJob = () => {
		// router.push(`/jobs/add/4`, undefined, { shallow: true })
	}

    useEffect(() => {
        if (jobID) {
            getJobDetailsByID(jobID, (jobDocument: JobDocument) => {
                setJobDetails(jobDocument)
            })
        }
    }, [router.query])

    return (
        <div>
            <Header>
				<JobTitle>
					แก้ไขงาน <span>{jobDetails.pickup_location.province}</span>
					<RightArrowLine />
					<span>{jobDetails.dropoff_location.province}</span>
				</JobTitle>
			</Header>
                {currentPage === "edit" ? 
                    <>
                        <JobFormStepOne />
                        <SectionHeader>
                            <div>ข้อมูลสินค้า</div> <Line />
                        </SectionHeader>
                        <JobFormStepTwo />
                        <SectionHeader>
                            <div>ข้อมูลรถบรรทุก</div> <Line />
                        </SectionHeader>
                        <JobFormStepThree />
                        <FormActionsCustom>
                            <SecondaryButton onClick={() => router.back()}>
                                ยกเลิก
                            </SecondaryButton>
                            <PrimaryButton onClick={() => setCurrentPage("sample")}>ดูตัวอย่างงาน</PrimaryButton>
			            </FormActionsCustom>
                    </> :
                    <JobDetailsContainer>
                        <JobDetailsSection 
                            isShowCarrierDetails={false}
                            isShowAutoPrice={false}
                        />
                        <FormActions>
                            <SecondaryButton onClick={() => setCurrentPage("edit")}>
                                กลับไปแก้ไข
                            </SecondaryButton>
                            <PrimaryButton onClick={updateJob}>ยืนยันแก้ไขงาน</PrimaryButton>
                        </FormActions>
                    </JobDetailsContainer> 
                } 
        </div>
    )
}

export default EditJobPage
