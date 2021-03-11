import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'
import { HeaderTitle, NumberOfJobs, Pagination, PrimaryButton, TableRowActions } from '../styles/GlobalComponents'
import DesktopHeader from './DesktopHeader'
import TableComponent from './TableComponent'
import JobFilters from './JobFilters'
import { useRecoilState, useRecoilValue } from 'recoil'
import { filterState, jobFiltersState, tableDataState } from '../../store/atoms/tableState'
import { jobStatusCountState } from '../../store/atoms/carrierProfileState'
import { JobDetails } from '../../entities/interface/job'
import { dateFormatter, timeFormatter } from '../utilities/helper'
import { JOB_STATUS_CODE } from '../../data/jobs'
import { CancelIcon, EditIcon } from './Icons'
import { useRouter } from 'next/router'

interface TabItemInterface {
	isActive: boolean;
}

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
`

const TableContainer = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	border-radius: 0 8px 8px 8px;
	padding-bottom: 1.8rem;
	border-left: 3rem solid transparent;
	border-right: 3rem solid transparent;
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
	background-color: hsla(228, 24%, 96%);
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

interface JobTableInterface {
	rowPerPage?: number
}

const DesktopJobTable = (props: JobTableInterface) => {
	const router = useRouter()
	const [jobFilters, setJobFilters] = useRecoilState(jobFiltersState)
    const jobTableData = useRecoilValue(tableDataState)
    const jobStatusCount = useRecoilValue<{ [key: number]: number }>(jobStatusCountState)

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
				<span>{job.offer_price.toLocaleString()}</span>
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
				<span>{JOB_STATUS_CODE[job.status].status_name}</span>
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

    return (
		<ContentContainer>
			<TabContainer>
				<TablItem isActive={jobFilters.status[0] === 0} onClick={() => setJobFilters({...jobFilters, status: [0]})}>
					ทั้งหมด
					<NumberOfJobs>{jobTableData.length}</NumberOfJobs>
				</TablItem>
				<TablItem isActive={jobFilters.status[0] === 100} onClick={() => setJobFilters({...jobFilters, status: [100]})}>
					รอผู้รับงาน
					<NumberOfJobs>{jobStatusCount[100]}</NumberOfJobs>
				</TablItem>
				<TablItem 
					isActive={jobFilters.status.length > 1} 
					onClick={() => setJobFilters({...jobFilters, status: [200, 300, 400, 500, 600, 700]})}>
					กำลังขนส่ง
					<NumberOfJobs>{jobStatusCount[0]}</NumberOfJobs>
				</TablItem>
				<TablItem isActive={jobFilters.status[0] === 800} onClick={() => setJobFilters({...jobFilters, status: [800]})}>
					ขนส่งเสร็จสิ้น
					<NumberOfJobs>{jobStatusCount[800]}</NumberOfJobs>
				</TablItem>
			</TabContainer>
			<TableContainer>
				<TableComponent
					columns={jobColumns}
					tableStyle={{
						gap: "18px"
					}}
					RowStyle={TableRowStyle}
					HeaderStyle={TableHeaderStyle}
					PaginationStyle={TablePaginationStyle}
					filterSelector={filterState}
					{...props}
				/>
			</TableContainer>
		</ContentContainer>
    )
}

export default DesktopJobTable
