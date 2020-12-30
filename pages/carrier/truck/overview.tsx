import React, { ReactElement, useState, useEffect } from 'react'
import styled from "styled-components"
import NavigationBar from '../../../components/common/NavigationBar'
import SearchBar from '../../../components/common/SearchBar'
import SelectComponent from '../../../components/common/SelectComponent'
import TableComponent from '../../../components/common/TableComponent'
import { FormActions, PrimaryButton, SecondaryButton } from '../../../components/styles/GlobalComponents'
import { filterData } from '../../../components/utilities/helper'
import { useRouter } from "next/router"
import { AlertIcon, CancelIcon, EditIcon } from '../../../components/common/Icons'
import Modal from '../../../components/common/Modal'
import { TRUCK_STATUS_LIST } from '../../../data/carrier'
import { MOCKUP_TRUCK } from '../../../data/carrier.mock'

const OverviewCarPageContainer = styled.div`
	margin-top: 3.6rem;

	${SecondaryButton} {
		color: hsl(16, 56%, 51%);
		border: 2px solid hsl(16, 56%, 51%);
		border-radius: 6px;
		padding: 0.6rem 1.8rem;
	}
`

const Header = styled.div`
	font-weight: 800;
	font-size: 30px;
	color: hsl(212, 28%, 28%);
	display: flex;
	justify-content: space-between;
	padding: 0 2rem;
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

const RowAction = styled.div`
	display: flex;
	justify-content: space-evenly;

	button:last-child {
		svg {
			height: 1.4rem;
			width: 1.4rem;

			path {
				stroke: hsl(0, 0%, 66%);
			}
		}
	}
`

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 0 3rem;

	> *:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	span:not(:last-child) {
		line-height: 3.24rem;
		padding: 0 1.2rem;
	}

	${FormActions} {
		${SecondaryButton}, ${PrimaryButton}	{
			font-size: 1.6rem;
			box-shadow: none;
			font-weight: 500;
		}
	}
`

const OverviewCarPage = () => {
	const [filteredData, setFilteredData] = useState([])
	const [statusFilter, setStatusFilter] = useState("ทุกสถานะ")
	const [filter, setFilter] = useState("")
	const [toggleModal, setToggleModal] = useState(false)
	const [deleteTruckIndex, setDeleteTruckIndex] = useState(0)
	const router = useRouter()

	const toggleDeleteModal = (index: number) => {
		setToggleModal(true)
		setDeleteTruckIndex(index)
	}

	const truckColumns = [
		{
			id: "license_number",
			label: "ทะเบียน",
		},
		{
			id: "wheel",
			label: "ประเภท",
		},
		{
			id: "status",
			label: "สถานะ",
			format: (_: number, statusCode: number): ReactElement => (
				<span>{TRUCK_STATUS_LIST[statusCode]}</span>
			)
		},
		{
			id: "actions",
			label: "",
			width: "15%",
			format: (truckIndex: number): ReactElement => (
				<RowAction>
					<button onClick={() => router.push(`/carrier/truck/add/1`)}><EditIcon /></button>
					<button onClick={() => toggleDeleteModal(truckIndex)} ><CancelIcon /></button>
				</RowAction>
			),
		},
	]

	useEffect(() => {
		if (statusFilter === "ทุกสถานะ") {
			filterData(MOCKUP_TRUCK, filter, setFilteredData)
		} else {
			filterData(filteredData, filter, setFilteredData)
		}
	}, [filter])

	useEffect(() => {
		const statusCode = Object.keys(TRUCK_STATUS_LIST)[Object.values(TRUCK_STATUS_LIST).indexOf(statusFilter)]
		if (statusFilter !== "ทุกสถานะ") {
			filterData(MOCKUP_TRUCK, statusCode, setFilteredData)
		} else {
			setFilteredData(MOCKUP_TRUCK)
		}
	}, [statusFilter])

	return (
		<OverviewCarPageContainer>
			<NavigationBar />
			<Header>
				รถบรรทุก
				<SecondaryButton onClick={() => router.push(`/carrier/truck/add/1`)}>เพิ่มรถ</SecondaryButton>
			</Header>
			<TableHeader>
				<SearchBar
					placeholder="ค้นหา"
					setValue={setFilter}
				/>
				<SelectComponent
					menuList={Object.values(TRUCK_STATUS_LIST)}
					value={statusFilter}
					setValue={(value: string) => setStatusFilter(value)}
				/>
			</TableHeader>
			<TableComponent
				columns={truckColumns}
				data={filteredData}
			/>
			<Modal toggle={toggleModal} setToggle={setToggleModal}>
				<ModalContent>
					<AlertIcon />
					<span>ยืนยันลบข้อมูลรถ <br /> ทะเบียน {MOCKUP_TRUCK[deleteTruckIndex].license_number} หรือไม่ ?</span>
					<FormActions>
						<SecondaryButton onClick={() => setToggleModal(false)}>ยกเลิก</SecondaryButton>
						<PrimaryButton onClick={() => setToggleModal(false)}>ยืนยันลบข้อมูล</PrimaryButton>
					</FormActions>
				</ModalContent>
			</Modal>
		</OverviewCarPageContainer>
	)
}

export default OverviewCarPage
