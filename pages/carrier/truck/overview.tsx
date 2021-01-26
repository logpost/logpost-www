import React, { ReactElement, useState } from 'react'
import styled from "styled-components"
import NavigationBar from '../../../components/common/NavigationBar'
import { FormActions, PrimaryButton, SecondaryButton, TableRowActions } from '../../../components/styles/GlobalComponents'
import { useRouter } from "next/router"
import { WarningIcon, CancelIcon, EditIcon } from '../../../components/common/Icons'
import Modal from '../../../components/common/Modal'
import { TRUCK_STATUS_LIST } from '../../../data/carrier'
import ResourceOverview from '../../../components/common/ResourceOverview'
import { useEffect } from 'react'
import { getTruck } from '../../../components/utilities/apis'
import { TruckDocument, TruckTable } from '../../../entities/interface/truck'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { tableDataState } from '../../../store/atoms/tableState'
import Alert from '../../../components/common/Alert'
import { alertPropertyState } from '../../../store/atoms/alertPropertyState'

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
	const [deleteLicenseNumber, setDeleteLicenseNumber] = useState("")
	const [toggleModal, setToggleModal] = useState(false)
	const [trucks, setTrucks] = useState<TruckDocument[]>([])
	const alertStatus = useRecoilValue(alertPropertyState)
	const setTruckTableData = useSetRecoilState(tableDataState)
	const router = useRouter()

	const toggleDeleteModal = (licenseNumber: string) => {
		setToggleModal(true)
		setDeleteLicenseNumber(licenseNumber)
	}

	const navigateToAddTruckPage = () => {
		router.push(`/carrier/truck/add`)
	}

	const truckColumns = [
		{
			id: "license_number",
			label: "ทะเบียน",
		},
		{
			id: "type",
			label: "ประเภท",
		},
		{
			id: "status",
			label: "สถานะ",
			format: (_: number, truck: TruckTable): ReactElement => (
				<span>{TRUCK_STATUS_LIST[truck.status]}</span>
			)
		},
		{
			id: "truck_id",
			label: "",
			width: "15%",
			get: "truck_id",
			format: (_: number, truck: TruckTable): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/carrier/truck/edit/${truck.truck_id}`)}><EditIcon /></button>
					<button onClick={() => toggleDeleteModal(truck.license_number)} ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	const convertToTableFormat = (trucks: TruckDocument[]): TruckTable[] => {
		const truckTableData = []
		trucks.map((truck) => {
			const { truck_id, license_number, property, status } = truck
			truckTableData.push({
				truck_id,
				license_number,
				type: property.type,
				status
			})
		})
		return truckTableData
	}

	useEffect(() => {
		getTruck((trucks: TruckDocument[]) => {
			setTrucks(trucks)
			setTruckTableData(convertToTableFormat(trucks))
		})
	}, [])

	return (
		<>
			<Alert>
				{alertStatus.type === "success" ? "เพิ่มรถบรรทุกสำเร็จ" : "เพิ่มรถบรรทุกไม่สำเร็จ"}
			</Alert>
			<NavigationBar activeIndex={2} />
			<ResourceOverview 
				headerTitle={"รถบรรทุก"}
				headerButton={"เพิ่มรถ"}
				buttonOnClick={navigateToAddTruckPage}
				defaultSelect={"ทุกสถานะ"}
				statusList={TRUCK_STATUS_LIST}
				columns={truckColumns}
			>
				<Modal toggle={toggleModal} setToggle={setToggleModal}>
					<ModalContent>
						<WarningIcon />
						<span>ยืนยันลบข้อมูลรถ <br /> ทะเบียน {deleteLicenseNumber} หรือไม่ ?</span>
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
