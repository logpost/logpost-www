import React, { ReactElement } from "react"
import styled from "styled-components"

interface TableComponentInterface {
	columns: {
		id: string
		label: string
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

const Table = styled.table`
  width: 100%;
	-webkit-border-horizontal-spacing: 0;
`

const HeaderRow = styled.tr`
	box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.08);
`

const Row = styled.tr`
	&:nth-child(even) {
		background-color: hsl(220, 27%, 96%);
	}
`

const Header = styled.th`
	font-size: 1.6rem;
  font-weight: bold;
	padding: 0.8rem 0;
`	

const Cell = styled.td`
	font-size: 1.6rem;
	padding: 0.8rem 0;
	text-align: center;
`

const TableComponent = (props: TableComponentInterface) => {
	const { columns, data } = props

  return (
    <Table>
			<tbody>
				<HeaderRow>
					{
						columns.map((cell) => {
							return (
								<Header key={cell.id}>{cell.label}</Header>
							)
						})
					}
				</HeaderRow>
				{
					data.map((item, index) => {
						return (
							<Row key={index}>
								{
									columns.map((column) => {
										const cellValue = item[column.id]
										return (
											<Cell key={column.id}>
												{(column.format && column.format(index)) || cellValue}
											</Cell>
										)
									})
								}
							</Row>
						)
					})
				}
				<Row>
				
				</Row>
			</tbody>
    </Table>
  )
}

export default TableComponent
