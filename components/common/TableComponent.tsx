import React, { useState, ReactElement } from "react"
import styled from "styled-components"
import { RightArrow, DoubleRightArrow } from "./Icons"

interface TableComponentInterface {
	columns: {
		id: string
		label: string
		align?: string
		width?: string
		format?: (driver_index: number) => ReactElement
	}[]
	data: {
		id?: string
		driver_name?: string
		driver_license_type?: string
		license_number?: string
		wheel?: string
		add_on?: string
	}[]
}

interface CellInterface {
	width?: string
	cellAlign?: string
}

interface TableContainerInterface {
	height: boolean
}

const TableContainer = styled.div<TableContainerInterface>`
    height: ${props => props.height ? "auto" : "30rem"};
    width: 100%;
`

const Table = styled.table`
	width: 100%;
	-webkit-border-horizontal-spacing: 0;
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
`

const Cell = styled.td<CellInterface>`
	font-size: 1.6rem;
	padding: 0.8rem 0;
	text-align: ${(props) => props.cellAlign || "center"};
	max-width: 4rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`

const TableCaption = styled.div`
	font-size: 1.5rem;
	color: hsl(0, 0%, 66%);
	display: flex;
    justify-content: space-between;
	width: 100%;
    padding: 0 5%;
`

const Pagination = styled.div`
	display: flex;
    align-items: center;
	color: hsl(16, 56%, 51%);
	font-weight: 700;
	width: 50%;
    max-width: 16rem;
    justify-content: space-between;

	> span {
		padding: 0 0.8rem;
		text-align: center;
		width: 40%;
	}

	button {
		display: flex;
		
		svg {
			height: 1.6rem;
			width: 1.6rem;

			path {
				fill: hsl(16, 56%, 51%);
			}
		}

		&:disabled {
			svg path {
				fill: hsl(0, 0%, 93%);
			}
		}

		&:nth-child(-n + 2) {
			transform: rotate(-180deg)
		}
	}
`

const TableComponent = (props: TableComponentInterface) => {
	const { columns, data } = props
	const [currentPage, setCurrentPage] = useState(1)
	const numberOfRow = data.length
	const maxRowPerPage = 7
	const firstRowOfPage = (currentPage - 1)*maxRowPerPage
	const LastRowOfPage = currentPage*maxRowPerPage
	const maxPage = Math.ceil(numberOfRow / 7)
	const remainingRow = numberOfRow - firstRowOfPage

	return (
		<>
			<TableContainer height={numberOfRow < 7}>
				<Table>
					<tbody>
						<HeaderRow>
							{columns.map((cell) => {
								return <Header key={cell.id}>{cell.label}</Header>
							})}
						</HeaderRow>
						{data.slice(firstRowOfPage, LastRowOfPage).map((item, index) => {
							return (
								<Row key={index}>
									{columns.map((column) => {
										const cellValue = item[column.id]
										return (
											<Cell key={column.id} cellAlign={column.align} width={column.width}>
												{(column.format &&
													column.format(index)) ||
													cellValue}
											</Cell>
										)
									})}
								</Row>
							)
						})}
					</tbody>
				</Table>
			</TableContainer>
			<TableCaption>
				<span>แสดง {remainingRow < maxRowPerPage ? numberOfRow : maxRowPerPage * currentPage} จาก {numberOfRow}</span>
				<Pagination>
					<button disabled={currentPage <= 1} onClick={()=> setCurrentPage(1)}><DoubleRightArrow /></button>
					<button disabled={currentPage <= 1} onClick={()=> setCurrentPage(currentPage - 1)}><RightArrow/></button>
					<span>{currentPage} / {maxPage}</span>
					<button disabled={currentPage >= maxPage} onClick={()=> setCurrentPage(currentPage + 1)}><RightArrow/></button>
					<button disabled={currentPage >= maxPage} onClick={()=> setCurrentPage(maxPage)}><DoubleRightArrow /></button>
				</Pagination>
			</TableCaption>
		</>
	)
}

export default TableComponent
