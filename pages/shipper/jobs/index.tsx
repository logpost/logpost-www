import React, { useState, useEffect } from "react"
import styled from "styled-components"
import JobCard from "../../../components/common/JobCard"
import { useRouter } from "next/router"
import ScrollableTab from "../../../components/common/ScrollableTab"

const JobContainer = styled.div`
	padding-top: 6rem;
`

const JobStatusPage = () => {
	const router = useRouter()
	const [status, setStatus] = useState("all")

	useEffect(() => {
		setStatus(router.query.status as string)
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
			<ScrollableTab
				currentTab={status || "all"}
				setCurrentTab={changeStatus}
				tabs={[
					{ name: "all", content: "ทั้งหมด" },
					{ name: "waiting", content: "รอผู้รับงาน" },
					{ name: "shipping", content: "กำลังขนส่ง" },
					{ name: "finished", content: "ขนส่งเสร็จสิ้น" },
				]}
				scrollAtIndex={3}
			/>
			<JobContainer>
				{/* <JobCard /> */}
				{/* <JobCard /> */}
			</JobContainer>
		</div>
	)
}

export default JobStatusPage
