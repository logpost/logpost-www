import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useRecoilState, useSetRecoilState } from "recoil"
import { jobStatusCountState, myJobsState } from "../../store/atoms/carrierProfileState"
import { getMyJob } from "../utilities/apis"
import { JobDocument } from "../../entities/interface/job"
import NavigationBar from "./NavigationBar"
import ScrollableTab from "./ScrollableTab"
import JobCard from "./JobCard"
import { BreakpointLG, BreakpointMD } from "../styles/Breakpoints"
import JobDesktopTable from "./JobDesktopTable"
import { tableDataState } from "../../store/atoms/tableState"
import { resourceStatusCount } from "../utilities/helper"

const JobContainer = styled.div`
	padding-top: 6rem;
`

const BreakpointLGCustom = styled(BreakpointLG)`
	background-color: hsla(228, 24%, 96%);
	width: calc(100% - 7rem);
`

interface JobStatusInterface {
	role: string
}

const JobStatus = (props: JobStatusInterface) => {
	const { role } = props
	const router = useRouter()
	const [status, setStatus] = useState("all")
    const [myJobs, setMyJobs] = useRecoilState(myJobsState)
	const setTableData = useSetRecoilState(tableDataState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{ [key: number]: number }>(jobStatusCountState)

	const convertJobToTableFormat = (jobs: JobDocument[]) => {
		const jobTableData = []
		jobs.map((job) => {
			const { pickup_location, dropoff_location } = job
			jobTableData.push({
				...job, 
				pickup_location: pickup_location.province,
				dropoff_location: dropoff_location.province,
				truck_type: `${job.carrier_specification.truck.property.type} ${job.carrier_specification.truck.property.option}`
			})
		})
		return jobTableData
	}

	useEffect(() => {
        setStatus(router.query.status as string)
		if (!Boolean(myJobs[0])) {
            getMyJob((jobs: JobDocument[]) => {
				const jobTableData = convertJobToTableFormat(jobs)
				setTableData(jobTableData)
				resourceStatusCount(jobTableData, jobStatusCount, setJobStatusCount)
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
		<>
			<NavigationBar activeIndex={0} />
			<BreakpointMD>
				<ScrollableTab
					currentTab={status || "all"}
					setCurrentTab={changeStatus}
					tabs={[
						{ name: "all", content: "ทั้งหมด" },
						{ name: "waiting", content: `${role === "shipper" ? "รอผู้รับงาน" : "รอการขนส่ง"}`},
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
			</BreakpointMD>
			<BreakpointLGCustom>
				<JobDesktopTable role={role} />
			</BreakpointLGCustom>
		</>
	)
}

export default JobStatus
