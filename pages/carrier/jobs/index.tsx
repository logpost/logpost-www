import React, { useState, useEffect } from "react"
import styled from "styled-components"
import JobCard from "../../../components/common/JobCard"
import { useRouter } from "next/router"
import ScrollableTab from "../../../components/common/ScrollableTab"
import NavigationBar from '../../../components/common/NavigationBar'
import { useRecoilState } from "recoil"
import { myJobsState } from "../../../store/atoms/carrierProfileState"
import { JobDocument } from '../../../entities/interface/job'
import { getMyJob } from "../../../components/utilities/apis"

const JobContainer = styled.div`
	padding-top: 6rem;
`

const JobStatusPage = () => {
	const router = useRouter()
	const [status, setStatus] = useState("all")
	const [myJobs, setMyJobs] = useRecoilState(myJobsState)

	useEffect(() => {
		setStatus(router.query.status as string)
		if (!Boolean(myJobs[0].pickup_date)) {
			getMyJob((jobs: JobDocument[]) => {
				setMyJobs(jobs)
			})
		}
	}, [router.query])

	const changeStatus = (nextStatus: string) => {
		setStatus(nextStatus)
		router.push(
			{
				pathname: `/carrier/jobs/`,
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
			<NavigationBar />
			<ScrollableTab
				currentTab={status || "all"}
				setCurrentTab={changeStatus}
				tabs={[
					{ name: "all", content: "ทั้งหมด" },
					{ name: "waiting", content: "รอการขนส่ง" },
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

export default JobStatusPage
