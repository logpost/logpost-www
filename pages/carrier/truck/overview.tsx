import React, { ReactElement, useState } from 'react'
import styled from "styled-components"
import NavigationBar from '../../../components/common/NavigationBar'
import { FormActions, PrimaryButton, SecondaryButton } from '../../../components/styles/GlobalComponents'
import { useRouter } from "next/router"
import { AlertIcon, CancelIcon, EditIcon } from '../../../components/common/Icons'
import Modal from '../../../components/common/Modal'
import { TRUCK_STATUS_LIST } from '../../../data/carrier'
import { MOCKUP_TRUCK } from '../../../data/carrier.mock'
import ResourceOverview from '../../../components/common/ResourceOverview'

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

const OverviewTruckPage = () => {
	const [deleteTruckIndex, setDeleteTruckIndex] = useState(0)
	const [toggleModal, setToggleModal] = useState(false)
	const router = useRouter()

	const toggleDeleteModal = (index: number) => {
		setToggleModal(true)
		setDeleteTruckIndex(index)
	}

	const navigateToAddTruckPage = () => {
		router.push(`/carrier/truck/add/1`)
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
					<button onClick={navigateToAddTruckPage}><EditIcon /></button>
					<button onClick={() => toggleDeleteModal(truckIndex)} ><CancelIcon /></button>
				</RowAction>
			),
		},
	]

	return (
		<>
			<NavigationBar />
			<ResourceOverview 
				headerTitle={"รถบรรทุก"}
				headerButton={"เพิ่มรถ"}
				buttonOnClick={navigateToAddTruckPage}
				defaultSelect={"ทุกสถานะ"}
				statusList={TRUCK_STATUS_LIST}
				columns={truckColumns}
				data={MOCKUP_TRUCK}
			>
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
			</ResourceOverview>
		</>
	)
}

export default OverviewTruckPage
