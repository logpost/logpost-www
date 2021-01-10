import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import SearchBar from './SearchBar'
import SelectComponent from './SelectComponent'
import TableComponent from './TableComponent'
import { SecondaryButton } from '../styles/GlobalComponents'
import { TableComponentInterface } from '../../entities/interface/common'
import { FunctionComponent } from 'react'
import { filterWordState, filterStatusState } from '../../store/atoms/tableState'
import { useSetRecoilState } from 'recoil'

const ResourceOverviewContainer = styled.div`
	margin-top: 3.6rem;
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

interface ResourceOverviewInterface extends TableComponentInterface {
	headerTitle: string
	headerButton: string
	defaultSelect: string
	statusList: Object
	buttonOnClick: () => void
}

const ResourceOverview: FunctionComponent<ResourceOverviewInterface> = (props) => {
	const { headerTitle, headerButton, statusList, defaultSelect, columns, buttonOnClick, children } = props
	const setFilterWord = useSetRecoilState(filterWordState)
	const setFilterStatus = useSetRecoilState(filterStatusState)
	const [statusFilter, setStatusFilter] = useState(defaultSelect)

	useEffect(() => {
		const statusCode = Object.keys(statusList)[Object.values(statusList).indexOf(statusFilter)]
		setFilterStatus(statusCode)
	}, [statusFilter])

	return (
		<ResourceOverviewContainer>
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
			/>
			{children}
		</ResourceOverviewContainer>
	)
}

export default ResourceOverview
