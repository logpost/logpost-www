import React, { useState } from "react"
import styled, { css } from "styled-components"
import { TableComponentInterface } from "../../entities/interface/common"
import { RightArrow, DoubleRightArrow } from "./Icons"
import { useRecoilValue } from 'recoil'
import { filterState } from "../../store/atoms/tableState"
import { TruckTable } from "../../entities/interface/truck"
import { DriverTable } from "../../entities/interface/driver"
import { Pagination } from "../styles/GlobalComponents"

interface CellInterface {
	width?: string
	cellAlign?: string
}

interface TableContainerInterface {
	tableHeight: boolean,
}

interface TableInterface {
	width?: string,
	gap?: string
}

const TableContainer = styled.div<TableContainerInterface>`
    height: 100%;
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 30rem;
`

const Table = styled.table<TableInterface>`
	width: 100%;
	-webkit-border-horizontal-spacing: 0;
	width: ${props => props.width ? props.width : "100%"};

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

const Header = styled.th`
	font-size: 1.6rem;
	font-weight: bold;
	padding: 0.8rem 0;
	white-space: nowrap;

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
		PaginationStyle = Pagination
	} = props
	const [currentPage, setCurrentPage] = useState(1)
	const data = useRecoilValue<Object[]>(filterState)
	const numberOfRow = data.length
	const maxRowPerPage = 7
	const firstRowOfPage = (currentPage - 1)*maxRowPerPage
	const LastRowOfPage = currentPage*maxRowPerPage
	let maxPage = Math.ceil(numberOfRow / 7)
	const remainingRow = numberOfRow - firstRowOfPage

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
								return <Header key={cell.id}>{cell.label}</Header>
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
				<span>แสดง {remainingRow < maxRowPerPage ? numberOfRow : maxRowPerPage * currentPage} จาก {numberOfRow}</span>
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
