import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'
import { NumberOfJobs, Pagination } from '../styles/GlobalComponents'
import TableComponent from './TableComponent'
import { RecoilState, useRecoilState, useRecoilValue, RecoilValue, DefaultValue } from 'recoil'
import { tableDataState } from '../../store/atoms/tableState'
import { jobStatusCountState } from '../../store/atoms/carrierProfileState'
import { JobDetails } from '../../entities/interface/job'
import { TruckTable } from '../../entities/interface/truck'
import { DriverTable } from '../../entities/interface/driver'

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
	columns: {
		id: string
		label: string
		align?: string
		width?: string
		sortable?: boolean
		format?: (index: number, item?: (TruckTable | DriverTable | JobDetails)) => ReactElement
	}[]
	filterSelector: RecoilState<any[]>
	filterState: RecoilState<{
		status?: number[]
	}>
}

const DesktopTable = (props: JobTableInterface) => {
	const { filterState } = props
	const [filter, setFilter] = useRecoilState(filterState)
    const jobTableData = useRecoilValue(tableDataState)
    const jobStatusCount = useRecoilValue<{ [key: number]: number }>(jobStatusCountState)

    return (
		<ContentContainer>
			<TabContainer>
				<TablItem isActive={filter.status[0] === 0} onClick={() => setFilter({...filter, status: [0]})}>
					ทั้งหมด
					<NumberOfJobs>{jobTableData.length}</NumberOfJobs>
				</TablItem>
				<TablItem isActive={filter.status[0] === 100} onClick={() => setFilter({...filter, status: [100]})}>
					รอผู้รับงาน
					<NumberOfJobs>{jobStatusCount[100]}</NumberOfJobs>
				</TablItem>
				<TablItem 
					isActive={filter.status.length > 1} 
					onClick={() => setFilter({...filter, status: [200, 300, 400, 500, 600, 700]})}>
					กำลังขนส่ง
					<NumberOfJobs>{jobStatusCount[0]}</NumberOfJobs>
				</TablItem>
				<TablItem isActive={filter.status[0] === 800} onClick={() => setFilter({...filter, status: [800]})}>
					ขนส่งเสร็จสิ้น
					<NumberOfJobs>{jobStatusCount[800]}</NumberOfJobs>
				</TablItem>
			</TabContainer>
			<TableContainer>
				<TableComponent
					tableStyle={{
						gap: "18px"
					}}
					RowStyle={TableRowStyle}
					HeaderStyle={TableHeaderStyle}
					PaginationStyle={TablePaginationStyle}
					{...props}
				/>
			</TableContainer>
		</ContentContainer>
    )
}

export default DesktopTable
