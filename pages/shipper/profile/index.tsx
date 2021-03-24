import React, { ChangeEvent, ReactElement, useEffect } from "react"
import styled from "styled-components"
import {
	JobIcon,
	JobSuccessIcon,
	TruckIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"
import { useRecoilValue, useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"
import { jobStatusCountState } from "../../../store/atoms/carrierProfileState"
import { resourceStatusCount } from "../../../components/utilities/helper"
import { getMyJob } from "../../../components/utilities/apis"
import { JobDocument } from '../../../entities/interface/job'
import { BreakpointLG, BreakpointMD } from "../../../components/styles/Breakpoints"
import { tableDataState, jobFiltersState, filterWordState } from "../../../store/atoms/tableState"
import JobDesktopTable from "../../../components/common/JobDesktopTable"
import withPrivateRoute from '../../../components/utilities/withPrivateRoute';

const ProfileStatusContainer = styled.div`
	margin-top: 1.8rem;
`

const BreakpointLGCustom = styled(BreakpointLG)`
	background-color: hsla(228, 24%, 96%);
	width: calc(100% - 7rem);
`

const JobTableContainer = styled.div`
	padding: 3rem;
`

const ShipperProfilePage = () => {
	const shipperInfo = useRecoilValue(userInfoState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{ [key: number]: number }>(jobStatusCountState)
	const setTableData = useSetRecoilState(tableDataState)
	const resetFilter = useResetRecoilState(jobFiltersState)
	const resetTableData = useResetRecoilState(tableDataState)

 	// useEffect(() => {
	// 	resourceStatusCount(filteredData, {
	// 		0: 0,
	// 		100: 0,
	// 		800: 0
	// 	}, setJobStatusCount)
	// }, [filteredData])

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
		if (shipperInfo?.username) {
			resetTableData()
			resetFilter()
			getMyJob((jobs: JobDocument[]) => {
				const jobTableData = convertJobToTableFormat(jobs)
				setTableData(jobTableData)
				resourceStatusCount(jobTableData, jobStatusCount, setJobStatusCount)
			})
		}
	}, [])

	return (
		<>
			<NavigationBar activeIndex={2} />
			<BreakpointMD>
				<Header enabledSetting={true}>
					{shipperInfo?.displayName}
				</Header>
				<ProfileStatusContainer>
					<ProfileStatus
						title="รายการงาน"
						buttonText="รายการทั้งหมด"
						buttonLink="jobs?status=all"
						type="button"
						items={[
							{
								name: "รอผู้รับงาน",
								onClickLink: "jobs?status=waiting",
								icon: <JobIcon />,
								noOfJobs: jobStatusCount[100],
							},
							{
								name: "กำลังขนส่ง",
								onClickLink: "jobs?status=shipping",
								icon: <TruckIcon />,
								noOfJobs: jobStatusCount[0],
							},
							{
								name: "ขนส่งเสร็จสิ้น",
								onClickLink: "jobs?status=finished",
								icon: <JobSuccessIcon />,
								noOfJobs: jobStatusCount[800],
							},
						]}
					/>
				</ProfileStatusContainer>
			</BreakpointMD>
			<BreakpointLGCustom>
				<JobDesktopTable role="shipper" />
			</BreakpointLGCustom>
		</>
	)
}

export default withPrivateRoute(ShipperProfilePage, "shipper")
