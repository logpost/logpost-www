import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { myJobsState } from "../../store/atoms/carrierProfileState"
import { getMyJob } from "../utilities/apis"
import { JobDocument } from "../../entities/interface/job"
import NavigationBar from "./NavigationBar"
import ScrollableTab from "./ScrollableTab"
import JobCard from "./JobCard"

const JobContainer = styled.div`
	padding-top: 6rem;
`

const JobStatus = () => {
	const router = useRouter()
	const [status, setStatus] = useState("all")
    const [myJobs, setMyJobs] = useRecoilState(myJobsState)

	useEffect(() => {
        setStatus(router.query.status as string)
		if (!Boolean(myJobs[0])) {
            getMyJob((jobs: JobDocument[]) => {
                setMyJobs(jobs)
            })
        }
	}, [router.query])

	const changeStatus = (nextStatus: string) => {
		setStatus(nextStatus)
		router.push(
			{
				pathname: `/shipper/jobs/`,
				query: {
					status: nextStatus,
				},
			},
			undefined,
			{ shallow: true }
		)
	}

	return (
		<div>
			<NavigationBar activeIndex={0} />
			<ScrollableTab
				currentTab={status || "all"}
				setCurrentTab={changeStatus}
				tabs={[
					{ name: "all", content: "ทั้งหมด" },
					{ name: "waiting", content: "รอผู้รับงาน" },
					{ name: "shipping", content: "กำลังขนส่ง" },
					{ name: "finished", content: "ขนส่งเสร็จสิ้น" },
				]}
				scrollAtIndex={2}
			/>
			<JobContainer>
				{ status === "all" && myJobs.map((job: JobDocument, index) => {
					return <JobCard key={index} origin="jobs-page" details={job} />
				})}
				{ status === "waiting" && myJobs.map((job: JobDocument, index) => {
					if (job.status === 100) {
						return <JobCard key={index} origin="jobs-page" details={job} />
					}
				})}
				{ status === "shipping" && myJobs.map((job: JobDocument, index) => {
					if (job.status > 100 && job.status < 800) {
						return <JobCard key={index} origin="jobs-page" details={job} />
					}
				})}
				{ status === "finished" && myJobs.map((job: JobDocument, index) => {
					if (job.status === 800) {
						return <JobCard key={index} origin="jobs-page" details={job} />
					}
				})}
			</JobContainer>
		</div>
	)
}

export default JobStatus
