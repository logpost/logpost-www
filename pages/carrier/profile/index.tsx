import React, { ReactElement, useEffect } from "react"
import styled from "styled-components"
import {
	CancelIcon,
	EditIcon,
	JobIcon,
	JobSuccessIcon,
	RightArrow,
	TruckIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"
import { getCarrierProfile, getMyJob } from "../../../components/utilities/apis"
import { dateFormatter, resourceStatusCount, timeFormatter } from "../../../components/utilities/helper"
import { driverStatusCountState, truckStatusCountState, jobStatusCountState, myJobsState } from "../../../store/atoms/carrierProfileState"
import { JobDetails, JobDocument } from '../../../entities/interface/job'
import { BreakpointLG, BreakpointMD } from "../../../components/styles/Breakpoints"
import DesktopHeader from "../../../components/common/DesktopHeader"
import DesktopTable from "../../../components/common/DesktopTable"
import { HeaderTitle, HeaderTitleContainer, PrimaryButton, SeeAllButton, StatusHeader, TableRowActions } from "../../../components/styles/GlobalComponents"
import { useRouter } from "next/router"
import { filterState, jobFiltersState, tableDataState } from "../../../store/atoms/tableState"
import { JOB_STATUS_CODE } from "../../../data/jobs"
import withPrivateRoute from "../../../components/utilities/withPrivateRoute"

const ProfileStatusContainer = styled.div`
	margin-top: 1.8rem;
`

const Line = styled.div`
	height: 0.2rem;
	width: 100%;
	background-color: hsl(211, 28%, 90%);
	margin: 1.4rem 0;
`

const MetricsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    grid-gap: 3.2rem;
	padding: 3rem;

	> div {
		background-color: white;
		padding: 1.8rem 3.6rem;
		border-radius: 8px;
	}
`

const JobTableContainer = styled.div`
	background: white;
	padding: 1.8rem 0;
	margin: 0 3rem 3rem;
	border-radius: 8px;

	${StatusHeader}, > div:last-child > div:first-child {
		margin-left: 3rem;
		margin-right: 3rem;
	}
`

const BreakpointLGCustom = styled(BreakpointLG)`
	width: calc(100% - 7rem);
	background-color: hsla(228, 24%, 96%);
`

const CarrierProfilePage = () => {
	const router = useRouter()
	const carrierInfo = useRecoilValue(userInfoState)
	const [driverStatusCount, setDriverStatusCount] = useRecoilState<{[key: number]: number}>(driverStatusCountState)
	const [truckStatusCount, setTruckStatusCount] = useRecoilState<{[key: number]: number}>(truckStatusCountState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{[key: number]: number}>(jobStatusCountState)
	// const setMyJobs = useSetRecoilState(myJobsState)
	const setTableData = useSetRecoilState(tableDataState)

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

	const jobColumns = [
		{
			id: "pickup_location",
			label: "ขึ้นสินค้า",
			width: "10%",
			align: "left"
		},
		{
			id: "dropoff_location",
			label: "ลงสินค้า",
			width: "10%",
			align: "left"
		},
		{
			id: "pickup_date",
			label: "วันขึ้นสินค้า",
			width: "14%",
			align: "left",
			format: (_: number, job: JobDetails): ReactElement => (
				<span>{`${dateFormatter(job.pickup_date)} ${timeFormatter(job.pickup_date)}`.slice(0, -3)}</span>
			)
		},
		{
			id: "dropoff_date",
			label: "วันลงสินค้า",
			width: "14%",
			align: "left",
			format: (_: number, job: JobDetails): ReactElement => (
				<span>{`${dateFormatter(job.dropoff_date)} ${timeFormatter(job.dropoff_date)}`.slice(0, -3)}</span>
			)
		},
		{
			id: "product_type",
			label: "สินค้า",
			width: "8%",
			align: "left"
		},
		{
			id: "weight",
			label: "น้ำหนัก",
			width: "8%",
			align: "left",
			format: (_: number, job: JobDetails): ReactElement => (
				<span>{`${job.weight} ตัน`}</span>
			)
		},
		{
			id: "offer_price",
			label: "ราคา",
			width: "8%",
			align: "left",
			format: (_: number, job: JobDetails): ReactElement => (
				<span>{job.offer_price?.toLocaleString()}</span>
			)
		},
		{
			id: "truck_type",
			label: "ประเภทรถ",
			width: "12%",
			align: "left",
		},
		{
			id: "status",
			label: "สถานะ",
			width: "8%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{JOB_STATUS_CODE[job.status]?.status_name}</span>
			)
		},
		{
			id: "actions",
			label: "เลือก",
			width: "8%",
			sortable: false,
			align: "center",
			format: (_: number, job): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/jobs/edit/${job.job_id}`)}><EditIcon /></button>
					<button ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	useEffect(() => {
		if (carrierInfo.username) {
			getCarrierProfile(carrierInfo.username, (carrierProfile) => {
				resourceStatusCount(carrierProfile.drivers, driverStatusCount, setDriverStatusCount)
				resourceStatusCount(carrierProfile.trucks, truckStatusCount, setTruckStatusCount)
			})
			getMyJob((jobs: JobDocument[]) => {
				const jobTableData = convertJobToTableFormat(jobs)
				setTableData(jobTableData)
				resourceStatusCount(jobs, jobStatusCount, setJobStatusCount)
				// setMyJobs(jobs)
			})
		}
	}, [carrierInfo])

	return (
		<>
			<NavigationBar activeIndex={2} />
			<BreakpointMD>
				<Header enabledSetting={true}>
					{carrierInfo.displayName}
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
					<Line />
					<ProfileStatus
						title="รถบรรทุก"
						buttonText="จัดการรถบรรทุก"
						buttonLink="truck/overview"
						type="metric"
						items={[
							{
								name: "จอดว่าง",
								metric: truckStatusCount[100],
							},
							{
								name: "กำลังขนส่ง",
								metric: truckStatusCount[200],
							},
							{
								name: "ไม่รับงาน",
								metric: truckStatusCount[300],
							},
						]}
					/>
					{
					carrierInfo.accountType === "business" && <>
						<Line />
						<ProfileStatus
							title="พนักงานขับรถ"
							buttonText="จัดการพนักงาน"
							buttonLink="driver/overview"
							type="metric"
							items={[
								{
									name: "ว่าง",
									metric: driverStatusCount[100],
								},
								{
									name: "กำลังขนส่ง",
									metric: driverStatusCount[200],
								},
								{
									name: "ไม่รับงาน",
									metric: driverStatusCount[300],
								},
							]}
						/>
						</>
					}
				</ProfileStatusContainer>
			</BreakpointMD>
			<BreakpointLGCustom>
				<DesktopHeader>
					<HeaderTitleContainer>
						<HeaderTitle>ภาพรวม</HeaderTitle>
						<PrimaryButton onClick={() => router.push("/jobs")}>ค้นหางาน</PrimaryButton>
					</HeaderTitleContainer>
				</DesktopHeader>
				<MetricsContainer>
					<ProfileStatus
						title="รถบรรทุก"
						buttonText="จัดการรถบรรทุก"
						buttonLink="truck/overview"
						type="metric"
						items={[
							{
								name: "จอดว่าง",
								metric: truckStatusCount[100],
							},
							{
								name: "กำลังขนส่ง",
								metric: truckStatusCount[200],
							},
							{
								name: "ไม่รับงาน",
								metric: truckStatusCount[300],
							},
						]}
					/>
					{carrierInfo.accountType === "business" && <>
						<ProfileStatus
							title="พนักงานขับรถ"
							buttonText="จัดการพนักงาน"
							buttonLink="driver/overview"
							type="metric"
							items={[
								{
									name: "ว่าง",
									metric: driverStatusCount[100],
								},
								{
									name: "กำลังขนส่ง",
									metric: driverStatusCount[200],
								},
								{
									name: "ไม่รับงาน",
									metric: driverStatusCount[300],
								},
							]}
						/>
						</>
					}
				</MetricsContainer>
				<JobTableContainer>
					<StatusHeader>
						<span>งานล่าสุด</span>
						<SeeAllButton onClick={() => router.push("jobs?status=all")}>
							ดูงานทั้งหมด
							<RightArrow />
						</SeeAllButton >
					</StatusHeader>
					<DesktopTable 
						tabsList={[
							{
								code: [0],
								title: "ทุกสถานะ",
							},
							{
								code: [100],
								title: "รอผู้รับงาน",
							},
							{
								code: [200, 300, 400, 500, 600, 700],
								title: "กำลังขนส่ง",
							},
							{
								code: [800],
								title: "ขนส่งเสร็จสิ้น",
							},
						]}
						columns={jobColumns}
						filterSelector={filterState}
						filterState={jobFiltersState}
						rowPerPage={5}
						handleClickRow={(selectRow) => router.push(`/jobs/details/${(selectRow as JobDocument).job_id}`)}
					/>
				</JobTableContainer>
			</BreakpointLGCustom>
		</>
	)
}

export default withPrivateRoute(CarrierProfilePage, "carrier")
