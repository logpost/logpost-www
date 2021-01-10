import React, { ReactElement, useState } from 'react'
import styled from "styled-components"
import NavigationBar from '../../../components/common/NavigationBar'
import { FormActions, PrimaryButton, SecondaryButton, TableRowActions } from '../../../components/styles/GlobalComponents'
import { useRouter } from "next/router"
import { WarningIcon, CancelIcon, EditIcon } from '../../../components/common/Icons'
import Modal from '../../../components/common/Modal'
import { DRIVER_STATUS_LIST } from '../../../data/carrier'
import { MOCKUP_DRIVER } from '../../../data/carrier.mock'
import ResourceOverview from '../../../components/common/ResourceOverview'
import { useEffect } from 'react'
import { getDriver } from '../../../components/utilities/apis'
import { DriverDocument, DriverTable } from '../../../entities/interface/driver'
import { resourceCreatedState } from '../../../store/atoms/overviewPageState'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { tableDataState } from '../../../store/atoms/tableState'
import { alertPropertyState } from '../../../store/atoms/alertPropertyState'
import Alert from '../../../components/common/Alert'

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
	const [drivers, setDrivers] = useState<DriverDocument[]>([])
	const createdStatus = useRecoilValue(resourceCreatedState)
	const setDriverTableData = useSetRecoilState(tableDataState)
	const setAlertProperty = useSetRecoilState(alertPropertyState)
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
			id: "name",
			label: "ชื่อ - นามสกุล",
			align: "left",
		},
		{
			id: "driver_license_type",
			label: "ใบขับขี่",
			width: "25%"
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

	const convertToTableFormat = (drivers: DriverDocument[]): DriverTable[] => {
		const driverTableData = []
		drivers.map((driver) => {
			const { name, driver_license_type, status } = driver
			driverTableData.push({
				name,
				driver_license_type: driver_license_type.replace("ประเภท", ""),
				status
			})
		})
		return driverTableData
	}

	useEffect(() => {
		getDriver((drivers: DriverDocument[]) => {
			setDrivers(drivers)
			setDriverTableData(convertToTableFormat(drivers))
		})
	}, [])

	useEffect(() => {
		setAlertProperty({
			type: createdStatus,
			isShow: true
		})
	}, [createdStatus])

	return (
		<>
			{
				createdStatus &&
				<Alert>
					{createdStatus === "success" ? "เพิ่มพนักงานขับรถสำเร็จ" : "เพิ่มพนักงานขับรถไม่สำเร็จ"}
				</Alert>
			}
			<NavigationBar />
			<ResourceOverview 
				headerTitle={"พนักงานขับรถ"}
				headerButton={"เพิ่มพนักงาน"}
				buttonOnClick={navigateToAddDriverPage}
				defaultSelect={"ทุกสถานะ"}
				statusList={DRIVER_STATUS_LIST}
				columns={driverColumns}
			>
				<Modal toggle={toggleModal} setToggle={setToggleModal}>
					<ModalContent>
						<WarningIcon />
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
