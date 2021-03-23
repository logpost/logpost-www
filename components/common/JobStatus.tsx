import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useRecoilState, useSetRecoilState } from "recoil"
import { jobStatusCountState } from "../../store/atoms/carrierProfileState"
import { getMyJob } from "../utilities/apis"
import { JobDocument } from "../../entities/interface/job"
import NavigationBar from "./NavigationBar"
import ScrollableTab from "./ScrollableTab"
import JobCard from "./JobCard"
import { BreakpointLG, BreakpointMD } from "../styles/Breakpoints"
import JobDesktopTable from "./JobDesktopTable"
import { filterByStatusState, filterStatusState } from "../../store/atoms/tableState"
import { resourceStatusCount } from "../utilities/helper"
import { STATUS_MAP } from "../../data/jobs"
import { JobNotFound } from "./Icons"
import { Spinner } from "../styles/GlobalComponents"
import { GooSpinner } from "react-spinners-kit"

const JobContainer = styled.div`
	padding-top: 6rem;
	min-height: calc(100vh - 18rem);
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	> div {
		width: 100%;
	}
`

const BreakpointLGCustom = styled(BreakpointLG)`
	background-color: hsla(228, 24%, 96%);
	width: calc(100% - 7rem);
`

const NotFoundContainer = styled.div`
	font-size: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> span {
		margin-top: 3rem;
	}
`

interface JobStatusInterface {
	role: string
}

const JobStatus = (props: JobStatusInterface) => {
	const { role } = props
	const router = useRouter()
	const [status, setStatus] = useState("all")
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{ [key: number]: number }>(jobStatusCountState)
	const [filteredJob, setTableData] = useRecoilState(filterByStatusState)
	const setStatusFilter = useSetRecoilState(filterStatusState)
	const [isLoading, setIsLoading] = useState(false)

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
		const status = router.query.status as string
        setStatus(status)
		setStatusFilter(STATUS_MAP[status])
		if (!Boolean(filteredJob[0])) {
			setIsLoading(true)
            getMyJob((jobs: JobDocument[]) => {
				setIsLoading(false)
				const jobTableData = convertJobToTableFormat(jobs)
				setTableData(jobTableData)
				resourceStatusCount(jobTableData, jobStatusCount, setJobStatusCount)
            })
        }
	}, [router.query])

	const changeStatus = (nextStatus: string) => {
		setStatus(nextStatus)
		setStatusFilter(STATUS_MAP[nextStatus])
		router.push(
			{
				pathname: `/${role}/jobs/`,
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
					{
						isLoading ? <Spinner>
							<GooSpinner size={150} />
						</Spinner> :
						(filteredJob.length > 0 ?
							filteredJob.map((job: JobDocument, index) => {
								return <JobCard key={index} origin="jobs-page" details={job} />
							}) : 
							<NotFoundContainer>
								<JobNotFound />
								<span>ไม่พบงานในสถานะนี้</span>
							</NotFoundContainer>
						)
					}
				</JobContainer>
			</BreakpointMD>
			<BreakpointLGCustom>
				<JobDesktopTable role={role} />
			</BreakpointLGCustom>
		</>
	)
}

export default JobStatus
