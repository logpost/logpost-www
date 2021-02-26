import React, { ReactElement, useEffect, useState } from "react"
import styled, { css, StyledComponent } from "styled-components"
import {
	CancelIcon,
	DownArrowLine,
	EditIcon,
	JobIcon,
	JobSuccessIcon,
	TruckIcon,
	UpArrowLine,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"
import { jobStatusCountState, myJobsState } from "../../../store/atoms/carrierProfileState"
import { dateFormatter, resourceStatusCount, timeFormatter } from "../../../components/utilities/helper"
import { getMyJob } from "../../../components/utilities/apis"
import { JobDocument } from '../../../entities/interface/job'
import { BreakpointLG, BreakpointMD } from "../../../components/styles/Breakpoints"
import DesktopHeader from "../../../components/common/DesktopHeader"
import { HeaderTitle, NumberOfJobs, Pagination, PrimaryButton, TableRowActions } from "../../../components/styles/GlobalComponents"
import SearchBar from "../../../components/common/SearchBar"
import SelectComponent from "../../../components/common/SelectComponent"
import { JOB_STATUS_CODE, PROVINCES } from "../../../data/jobs"
import TableComponent from "../../../components/common/TableComponent"
import { filterLocationState, filterState, filterStatusState, filterWordState, tableDataState } from "../../../store/atoms/tableState"
import { useRouter } from "next/router"

interface TabItemInterface {
	isActive: boolean;
}

const ProfileStatusContainer = styled.div`
	margin-top: 1.8rem;
`

const HeaderTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;

	${HeaderTitle} {
		color: hsl(212, 28%, 28%);
        font-weight: 600;
	}

	${PrimaryButton} {
		background-color: hsl(212, 28%, 28%);
		padding: 0.6rem 1.6rem;
		border-radius: 6px;
	}
`

const FilterContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 1.4rem;

	> div:first-child {
		border: 1px solid hsl(0, 0%, 66%);
		background-color: white;
		max-width: 39rem;
		height: max-content;

		input {
			background-color: white;
		}
	}

	> div:not(:last-child) {
		margin-right: 2.2rem;
	}
`

const LocationSelectContainer = styled.div`
	font-size: 1.6rem;
	display: flex;
	align-items: center;

	> svg {
		margin-right: 0.5rem;
	}

	> span {
		margin-right: 1.4rem;
		white-space: nowrap;
	}

	> div {
		width: 14.2rem;
		margin-top: 0;
	}
`

const ContentContainer = styled.div`
	background-color: hsla(211, 28%, 28%, 0.06);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3rem; 
`

const TableContainer = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	border-radius: 0 8px 8px 8px;
	padding-bottom: 1.8rem;
`

const TableRowStyle = styled.tr`
	background-color: hsl(211, 22%, 96%);
	border-radius: 6px;
	font-weight: 300;

	td {
		padding: 1.4rem 0.6rem;
		
		&:first-child {
			border-radius: 6px 0 0 6px;
		}

		&:last-child {
			border-radius: 0 6px 6px 0;
		}
	}
`

const TableHeaderStyle = styled.tr`
	background-color: transparent;
	box-shadow: none;

	> th {
		padding: 0;
	}
`

const TablePaginationStyle = styled(Pagination)`
	&& {
		color: hsl(212, 28%, 28%);

		> span {
			width: 50%
		}
		
		svg {
			path {
				fill: hsl(212, 28%, 28%);
			}
		}
	}
`

const TabContainer = styled.div`
	display: flex;
	align-self: flex-start;
	border-radius: 8px 8px 0 0;
	background-color: transparent;
`

const TablItem = styled.button<TabItemInterface>`
	padding: 1rem 2rem;
	font-size: 1.7rem;
	display: flex;
	align-items: center;
	color: hsl(212, 28%, 28%);

	${NumberOfJobs} {
		position: static;
		margin-left: 0.9rem;
		background-color: hsl(211, 28%, 90%);
		color: hsl(228, 22%, 57%);
		height: 2.5rem;
		width: 2.5rem;
		font-size: 1.3rem;
		border-radius: 20px;
	}

	${props => props.isActive && 
		css`
			background-color: white;
			font-weight: 600;
			border-radius: 8px 8px 0 0;
			
			${NumberOfJobs} {
				color: white;
				background-color: hsl(212, 28%, 28%);
			}
		` 
	}

`

const ShipperProfilePage = () => {
	const shipperInfo = useRecoilValue(userInfoState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{ [key: number]: number }>(jobStatusCountState)
	const [filters, setFilters] = useState({
		search: "",
		pickup_province: "ทั้งหมด",
		dropoff_province: "ทั้งหมด",
		status: [0]
	})
	const setTableData = useSetRecoilState(tableDataState)
	const router = useRouter()
	const filteredData = useRecoilValue(filterState)
	const setFilterWord = useSetRecoilState(filterWordState)
	const setFilterLocation = useSetRecoilState(filterLocationState)
	const setFilterStatus = useSetRecoilState(filterStatusState)

	useEffect(() => {
		setFilterStatus(filters.status)
	}, [filters.status])

	useEffect(() => {
		setFilterLocation({
			pickup: filters.pickup_province,
			dropoff: filters.dropoff_province
		})
	}, [filters.pickup_province, filters.dropoff_province])

	useEffect(() => {
		resourceStatusCount(filteredData, {
			0: 0,
			100: 0,
			800: 0
		}, setJobStatusCount)
	}, [filteredData])

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
			align: "left"
		},
		{
			id: "dropoff_date",
			label: "วันลงสินค้า",
			width: "14%",
			align: "left"
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
			align: "left"
		},
		{
			id: "offer_price",
			label: "ราคา",
			width: "8%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{job.offer_price.toLocaleString()}</span>
			)
		},
		{
			id: "truck_type",
			label: "ประเภทรถ",
			width: "12%",
			align: "left"
		},
		{
			id: "status",
			label: "สถานะ",
			width: "8%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{JOB_STATUS_CODE[job.status].status_name}</span>
			)
		},
		{
			id: "actions",
			label: "เลือก",
			width: "8%",
			format: (_: number, job): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/jobs/edit/${job.job_id}`)}><EditIcon /></button>
					<button ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	const convertJobToTableFormat = (jobs: JobDocument[]) => {
		const jobTableData = []
		jobs.map((job) => {
			const { 
				job_id,
				pickup_location, 
				dropoff_location, 
				pickup_date, 
				dropoff_date, 
				product_type, 
				weight, 
				offer_price, 
				carrier_specification,
				status } = job
			jobTableData.push({
				job_id,
				pickup_location: pickup_location.province,
				dropoff_location: dropoff_location.province,
				pickup_date: `${dateFormatter(pickup_date)} ${timeFormatter(pickup_date)}`.slice(0, -3),
				dropoff_date: `${dateFormatter(dropoff_date)} ${timeFormatter(dropoff_date)}`.slice(0, -3), 
				product_type,
				weight: `${weight} ตัน`,
				offer_price,
				truck_type: `${carrier_specification.truck.property.type} ${carrier_specification.truck.property.option}`,
				status
			})
		})
		return jobTableData
	}

	useEffect(() => {
		if (shipperInfo.username) {
			getMyJob((jobs: JobDocument[]) => {
				const jobTableData = convertJobToTableFormat(jobs)
				setTableData(jobTableData)
			})
		}
	}, [shipperInfo])

	return (
		<>
			<NavigationBar activeIndex={2} />
			<BreakpointMD>
				<Header enabledSetting={true}>
					{shipperInfo.displayName}
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
			<BreakpointLG>
				<DesktopHeader>
					<HeaderTitleContainer>
						<HeaderTitle>รายการงาน</HeaderTitle>
						<PrimaryButton>สร้างงานใหม่</PrimaryButton>
					</HeaderTitleContainer>
					<FilterContainer>
						<SearchBar
							placeholder="ค้นหา"
							setValue={setFilterWord}
						/>
						<LocationSelectContainer>
							<UpArrowLine />
							<span>ต้นทาง</span>
							<SelectComponent
								value={filters.pickup_province}
								setValue={(value: string) => setFilters({ ...filters, pickup_province: value })}
								menuList={["ทั้งหมด", ...PROVINCES]}
							/>
						</LocationSelectContainer>
						<LocationSelectContainer>
							<DownArrowLine />
							<span>ปลายทาง</span>
							<SelectComponent
								value={filters.dropoff_province}
								setValue={(value: string) => setFilters({ ...filters, dropoff_province: value })}
								menuList={["ทั้งหมด", ...PROVINCES]}
							/>
						</LocationSelectContainer>
					</FilterContainer>
				</DesktopHeader>
				<ContentContainer>
					<TabContainer>
						<TablItem isActive={filters.status[0] === 0} onClick={() => setFilters({...filters, status: [0]})}>
							ทั้งหมด
							<NumberOfJobs>{filteredData.length}</NumberOfJobs>
						</TablItem>
						<TablItem isActive={filters.status[0] === 100} onClick={() => setFilters({...filters, status: [100]})}>
							รอผู้รับงาน
							<NumberOfJobs>{jobStatusCount[100]}</NumberOfJobs>
						</TablItem>
						<TablItem 
							isActive={filters.status.length > 1} 
							onClick={() => setFilters({...filters, status: [200, 300, 400, 500, 600, 700]})}>
							กำลังขนส่ง
							<NumberOfJobs>{jobStatusCount[0]}</NumberOfJobs>
						</TablItem>
						<TablItem isActive={filters.status[0] === 800} onClick={() => setFilters({...filters, status: [800]})}>
							ขนส่งเสร็จสิ้น
							<NumberOfJobs>{jobStatusCount[800]}</NumberOfJobs>
						</TablItem>
					</TabContainer>
					<TableContainer>
						<TableComponent
							columns={jobColumns}
							tableStyle={{
								width: "95%",
								gap: "18px"
							}}
							RowStyle={TableRowStyle}
							HeaderStyle={TableHeaderStyle}
							PaginationStyle={TablePaginationStyle}
						/>
					</TableContainer>
				</ContentContainer>
			</BreakpointLG>
		</>
	)
}

export default ShipperProfilePage
