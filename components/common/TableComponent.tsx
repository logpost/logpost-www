import React, { useState } from "react"
import styled, { css } from "styled-components"
import { FilterSelector, TableComponentInterface } from "../../entities/interface/common"
import { RightArrow, DoubleRightArrow, UpArrowLine, DownArrowLine } from "./Icons"
import { useRecoilState } from 'recoil'
import { TruckTable } from "../../entities/interface/truck"
import { DriverTable } from "../../entities/interface/driver"
import { Pagination } from "../styles/GlobalComponents"
import { JobDetails } from "../../entities/interface/job"

interface CellInterface {
	cellAlign?: string
}

interface TableContainerInterface {
	tableHeight: boolean,
}

interface TableInterface {
	width?: string,
	gap?: string
	minWidth?: string
}

interface HeaderInterface {
	width?: string
	sortActive?: boolean
	cellAlign?: string
}

const TableContainer = styled.div<TableContainerInterface>`
    height: 100%;
	display: flex;
	justify-content: flex-start;
	overflow-x: scroll;
	width: 100%;
`

const Table = styled.table<TableInterface>`
	-webkit-border-horizontal-spacing: 0;
	table-layout: fixed;
	width: ${props => props.width ? props.width : "100%"};
	min-width: ${props => props.minWidth ? props.minWidth : 0};

	${props => props.gap && 
		css`
			border-spacing: 0 ${props.gap};
		`
	}
`

const HeaderRow = styled.tr`
	box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.08);
`

const Row = styled.tr`
	&:nth-child(odd) {
		background-color: hsl(220, 27%, 96%);
	}
`

const Header = styled.th<HeaderInterface>`
	font-size: 1.6rem;
	font-weight: bold;
	padding: 0.8rem 0.5rem;
	white-space: nowrap;

	> div {
		display: flex;
		align-items: center;
		justify-content: ${props => 
			props.cellAlign === "center" ? "center" :
				props.cellAlign === "left" ? "flex-start" : "flex-end"};

		> button {
			display: flex;
			
			svg {
				margin-left: 0.4rem;
				min-height: 1.8rem;
				min-width: 1.8rem;

				path {
					fill: ${props => props.sortActive ? "hsl(16, 56%, 51%)" : "hsl(0, 0%, 80%)"};
				}
			}
		}

	}

	&:first-child {
		padding: 0.8rem 0.5rem 0.8rem 1.8rem;
	}
`

const Cell = styled.td<CellInterface>`
	font-size: 1.6rem;
	padding: 0.8rem 0.5rem;
	text-align: ${(props) => props.cellAlign || "center"};
	max-width: 4rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	&:first-child {
		padding: 0.8rem 0.5rem 0.8rem 1.8rem;
	}
`

const TableCaption = styled.div`
	font-size: 1.5rem;
	color: hsl(0, 0%, 66%);
	display: flex;
    justify-content: space-between;
	width: 100%;
    padding: 0 5%;
	margin-top: 1.4rem;
`

const TableComponent = (props: TableComponentInterface) => {
	const { 
		columns, 
		tableStyle,
		RowStyle = Row,
		HeaderStyle = HeaderRow,
		PaginationStyle = Pagination,
		filterSelector,
		rowPerPage = 7
	} = props
	const [currentPage, setCurrentPage] = useState(1)
	const [sortOrder, setSortOrder] = useState({
		field: "",
		isAscending: false,
	})
	const [data, setData] = useRecoilState<Object[]>(filterSelector)
	const numberOfRow = data.length
	const firstRowOfPage = (currentPage - 1)*rowPerPage
	const LastRowOfPage = currentPage*rowPerPage
	let maxPage = Math.ceil(numberOfRow / 7)
	const remainingRow = numberOfRow - firstRowOfPage

	const compare = (a: JobDetails, b: JobDetails, field: string) => {
		let rowA: number | string, rowB: number | string
		if (Number.isInteger(a[field])) {
			rowA = a[field]
			rowB = b[field]
		} else {
			rowA = a[field].toLowerCase()
			rowB = b[field].toLowerCase()
		}
		const isCurrentDescending = (sortOrder.field === field ? !sortOrder.isAscending : true)
		setSortOrder({
			field,
			isAscending: isCurrentDescending
		})
		if (isCurrentDescending) {
			if (rowA < rowB)
				return -1 
			if (rowA > rowB)
				return 1
		} else {
			if (rowA > rowB)
				return -1 
			if (rowA < rowB)
				return 1
		}
		return 0
	}

	const sortField = (field: string) => {
		const sortedData = [...data].sort((a: JobDetails, b: JobDetails) => 
			compare(a, b, field)
		)
		setData(sortedData)
	}	

	if (maxPage <= 0) {
		maxPage = 1
	}

	return (
		<>
			<TableContainer tableHeight={numberOfRow < 7}>
				<Table {...tableStyle}>
					<tbody>
						<HeaderStyle>
							{columns.map((cell) => {
								return (
									<Header key={cell.id} width={cell.width} sortActive={sortOrder.field === cell.id} cellAlign={cell.align}>
										<div>
											<span>{cell.label}</span>
											{
												cell.sortable !== false &&
												<button onClick={() => sortField(cell.id)}>
													{ sortOrder.field === cell.id ? (sortOrder.isAscending ? <DownArrowLine /> : <UpArrowLine/>) : <DownArrowLine /> }
												</button>
											}
										</div>
									</Header>
								)
							})}
						</HeaderStyle>
						{data.slice(firstRowOfPage, LastRowOfPage).map((item: (TruckTable | DriverTable), index) => {
							return (
								<RowStyle key={index}>
									{columns.map((column) => {
										const cellValue = item[column.id]
										return (
											<Cell key={column.id} cellAlign={column.align} width={column.width}>
												{(column.format &&
													column.format(index, item)) ||
													cellValue}
											</Cell>
										)
									})}
								</RowStyle>
							)
						})}
					</tbody>
				</Table>
			</TableContainer>
			<TableCaption>
				<span>แสดง {remainingRow < rowPerPage ? numberOfRow : rowPerPage * currentPage} จาก {numberOfRow}</span>
				<PaginationStyle>
					<button disabled={currentPage <= 1} onClick={()=> setCurrentPage(1)}><DoubleRightArrow /></button>
					<button disabled={currentPage <= 1} onClick={()=> setCurrentPage(currentPage - 1)}><RightArrow/></button>
					<span>{currentPage} / {maxPage}</span>
					<button disabled={currentPage >= maxPage} onClick={()=> setCurrentPage(currentPage + 1)}><RightArrow/></button>
					<button disabled={currentPage >= maxPage} onClick={()=> setCurrentPage(maxPage)}><DoubleRightArrow /></button>
				</PaginationStyle>
			</TableCaption>
		</>
	)
}

export default TableComponent
