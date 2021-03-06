import React, { useState, useEffect, ReactElement } from 'react'
import styled, { css } from "styled-components"
import SearchBar from './SearchBar'
import SelectComponent from './SelectComponent'
import TableComponent from './TableComponent'
import { HeaderTitle, HeaderTitleContainer, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents'
import { FunctionComponent } from 'react'
import { filterWordState, filterStatusState, filterResourceState, jobFiltersState } from '../../store/atoms/tableState'
import { RecoilState, useSetRecoilState } from 'recoil'
import { TruckTable } from '../../entities/interface/truck'
import { DriverTable } from '../../entities/interface/driver'
import { BreakpointLG, BreakpointMD } from '../styles/Breakpoints'
import DesktopHeader from './DesktopHeader'
import { useRouter } from 'next/router'
import breakpointGenerator from '../utilities/breakpoint'
import FiltersComponent from './FiltersComponent'
import { Filter } from '../../entities/interface/common'
import DesktopTable from './DesktopTable'

const ResourcesTableContainer = styled.div`
	padding: 3rem;
	min-height: 80vh;
`

const ResourceOverviewContainer = styled.div`
	margin-top: 3.6rem;

	${breakpointGenerator({
		medium: css`
		`,
		large: css`
			margin-top: 0;
		`
	})}
`

const Header = styled.div`
	font-weight: 800;
	font-size: 30px;
	color: hsl(212, 28%, 28%);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;

	> ${SecondaryButton} {
		color: hsl(16, 56%, 51%);
		border: 2px solid hsl(16, 56%, 51%);
		border-radius: 6px;
		padding: 0.6rem 1.8rem;
		height: fit-content;
		margin-left: 0.4rem;
	}
`

const TableHeader = styled.div`
    display: flex;
	margin-top: 2.1rem;
	margin-bottom: 1.8rem;
	padding: 0 2rem;

	> div {
		margin-top: 0;
		height: 2.8rem;

		&:first-child {
			margin-right: 1.8rem;
		}

		&:last-child {
			width: 16rem;

			.MuiPopover-paper {
				width: 16rem;
			}

			.MuiSelect-select {
				min-width: 8rem;
			}

			svg {
				height: 27px;
    			width: 27px;
			}
		}
	}
`

interface ResourceOverviewInterface {
	columns: {
		id: string
		label: string
		align?: string
		width?: string
		sortable?: boolean
		format?: (index: number, item?: (TruckTable | DriverTable)) => ReactElement
	}[]
	headerTitle: string
	headerButton: string
	defaultSelect: string
	statusList?: Object
	filterList?: {
		[key: number]: Filter[]
	}
	filterState?: RecoilState<{
		status?: number[]
	}>
	filteredData?: RecoilState<any[]>
	buttonOnClick: () => void
	tabsList?: {
		code: number[]
		title: string 
	}[]
	tabCountState?: RecoilState<{
		[key: number]: number,
		other?: number
	}>
}

const ResourceOverview: FunctionComponent<ResourceOverviewInterface> = (props) => {
	const { headerTitle, headerButton, statusList, defaultSelect, columns, buttonOnClick, children, 
		filterList = {}, 
		filterState = jobFiltersState, 
		filteredData = filterResourceState,
		tabsList = [],
		tabCountState
	} = props
	const setFilterWord = useSetRecoilState(filterWordState)
	const setFilterStatus = useSetRecoilState(filterStatusState)
	const [statusFilter, setStatusFilter] = useState(defaultSelect)

	useEffect(() => {
		const statusCode = Object.keys(statusList)[Object.values(statusList).indexOf(statusFilter)]
		setFilterStatus([parseInt(statusCode)])
	}, [statusFilter])

	return (
		<ResourceOverviewContainer>
			<BreakpointMD>
				<Header>
					{headerTitle}
					<SecondaryButton onClick={buttonOnClick}>{headerButton}</SecondaryButton>
				</Header>
				<TableHeader>
					<SearchBar
						placeholder="ค้นหา"
						setValue={setFilterWord}
					/>
					<SelectComponent
						menuList={Object.values(statusList)}
						value={statusFilter}
						setValue={(value: string) => setStatusFilter(value)}
					/>
				</TableHeader>
				<TableComponent
					columns={columns}
					filterSelector={filterResourceState}
				/>
				{children}
			</BreakpointMD>
			<BreakpointLG>
				<DesktopHeader>
					<HeaderTitleContainer>
						<HeaderTitle>{headerTitle}</HeaderTitle>
						<PrimaryButton onClick={buttonOnClick}>{headerButton}</PrimaryButton>
					</HeaderTitleContainer>
					<FiltersComponent filterList={filterList} />
				</DesktopHeader>
				<ResourcesTableContainer>
					<DesktopTable
						tabsList={tabsList}
						tabCountState={tabCountState}
						columns={columns}
						filterSelector={filteredData}
						filterState={filterState}
					/>
				</ResourcesTableContainer>
			</BreakpointLG>
		</ResourceOverviewContainer>
	)
}

export default ResourceOverview
