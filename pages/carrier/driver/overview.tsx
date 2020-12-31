import React, { ReactElement, useState } from 'react'
import styled from "styled-components"
import NavigationBar from '../../../components/common/NavigationBar'
import { FormActions, PrimaryButton, SecondaryButton, TableRowActions } from '../../../components/styles/GlobalComponents'
import { useRouter } from "next/router"
import { AlertIcon, CancelIcon, EditIcon } from '../../../components/common/Icons'
import Modal from '../../../components/common/Modal'
import { DRIVER_STATUS_LIST } from '../../../data/carrier'
import { MOCKUP_DRIVER } from '../../../data/carrier.mock'
import ResourceOverview from '../../../components/common/ResourceOverview'

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

const OverviewDriverPage = () => {
	const [deleteDriverIndex, setDeleteDriverIndex] = useState(0)
	const [toggleModal, setToggleModal] = useState(false)
	const router = useRouter()

	const toggleDeleteModal = (index: number) => {
		setToggleModal(true)
		setDeleteDriverIndex(index)
	}

	const navigateToAddDriverPage = () => {
		router.push(`/carrier/driver/add`)
	}

	const driverColumns = [
		{
			id: "driver_id",
			label: "รหัส",
		},
		{
			id: "name",
			label: "ชื่อ - นามสกุล",
			align: "left",
			width: "30%"
		},
		{
			id: "driver_license_type",
			label: "ใบขับขี่",
			width: "15%"
		},
		{
			id: "status",
			label: "สถานะ",
			format: (_: number, statusCode: number): ReactElement => (
				<span>{DRIVER_STATUS_LIST[statusCode]}</span>
			)
		},
		{
			id: "actions",
			label: "",
			width: "15%",
			format: (driverIndex: number): ReactElement => (
				<TableRowActions>
					<button onClick={navigateToAddDriverPage}><EditIcon /></button>
					<button onClick={() => toggleDeleteModal(driverIndex)} ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	return (
		<>
			<NavigationBar />
			<ResourceOverview 
				headerTitle={"พนักงานขับรถ"}
				headerButton={"เพิ่มพนักงาน"}
				buttonOnClick={navigateToAddDriverPage}
				defaultSelect={"ทุกสถานะ"}
				statusList={DRIVER_STATUS_LIST}
				columns={driverColumns}
				data={MOCKUP_DRIVER}
			>
				<Modal toggle={toggleModal} setToggle={setToggleModal}>
					<ModalContent>
						<AlertIcon />
						<span>ยืนยันลบข้อมูลพนักงานขับรถ <br /> ชื่อ {MOCKUP_DRIVER[deleteDriverIndex].name} หรือไม่ ?</span>
						<FormActions>
							<SecondaryButton onClick={() => setToggleModal(false)}>ยกเลิก</SecondaryButton>
							<PrimaryButton onClick={() => setToggleModal(false)}>ยืนยันลบข้อมูล</PrimaryButton>
						</FormActions>
					</ModalContent>
				</Modal>
			</ResourceOverview>
		</>
	)
}

export default OverviewDriverPage
