import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react'
import styled from "styled-components"
import NavigationBar from '../../../components/common/NavigationBar'
import { FormActions, PrimaryButton, SecondaryButton, TableRowActions } from '../../../components/styles/GlobalComponents'
import { useRouter } from "next/router"
import { WarningIcon, CancelIcon, EditIcon, TruckIcon, WeightIcon } from '../../../components/common/Icons'
import Modal from '../../../components/common/Modal'
import { DRIVER_LICENSE_TYPE, DRIVER_STATUS_LIST } from '../../../data/carrier'
import ResourceOverview from '../../../components/common/ResourceOverview'
import { getDriver, deleteDriver } from '../../../components/utilities/apis'
import { DriverDocument, DriverTable } from '../../../entities/interface/driver'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { driverFiltersState, filterDriverState, filterWordState, tableDataState } from '../../../store/atoms/tableState'
import { alertPropertyState } from '../../../store/atoms/alertPropertyState'
import Alert from '../../../components/common/Alert'
import { BreakpointLG, BreakpointMD } from '../../../components/styles/Breakpoints'
import { driverStatusCountState } from '../../../store/atoms/carrierProfileState'
import { resourceStatusCount } from '../../../components/utilities/helper'
import withPrivateRoute from '../../../components/utilities/withPrivateRoute'

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

const BreakpointLGCustom = styled(BreakpointLG)`
	background-color: hsla(228, 24%, 96%);
	width: calc(100% - 7rem);

	table {
		min-width: 100%;
	}
`

const OverviewDriverPage = () => {
	const [driverToDelete, setDriverToDelete] = useState<DriverTable>()
	const [toggleModal, setToggleModal] = useState(false)
	const [drivers, setDrivers] = useState<DriverDocument[]>([])
	const setFilterWord = useSetRecoilState(filterWordState)
	const alertStatus = useRecoilValue(alertPropertyState)
	const [driverTableData, setDriverTableData] = useRecoilState(tableDataState)
	const [driverFilters, setDriverFilters] = useRecoilState(driverFiltersState)
	const [driverStatusCount, setDriverStatusCount] = useRecoilState(driverStatusCountState)
	const router = useRouter()

	const toggleDeleteModal = (driver: DriverTable) => {
		setToggleModal(true)
		setDriverToDelete(driver)
	}

	const deleteSelectedDriver = async () => {
		const deletedIndex = driverTableData.indexOf(driverToDelete)
		if (deletedIndex > -1) {
			const newDriverTableData = driverTableData.slice()
			newDriverTableData.splice(deletedIndex, 1)
			setDriverTableData(newDriverTableData)
		}		
		const response = await deleteDriver(driverToDelete.driver_id)
		setToggleModal(false)
	}

	const navigateToAddDriverPage = () => {
		router.push(`/carrier/driver/add`)
	}

	const filterList = {
		0: [
			{
				type: "searchbar",
				placeholder: "ค้นหาชื่อ นามสกุล เลขใบขับขี่ ฯลฯ",
				onChange: setFilterWord
			},
			{
				type: "dropdown",
				icon: TruckIcon,
				list: ["ทั้งหมด", ...DRIVER_LICENSE_TYPE],
				value: driverFilters.driver_license_type,
				label: "ชนิดใบขับขี่",
				onChange: (value: string) => setDriverFilters({...driverFilters, driver_license_type: value})
			},
			{
				type: "input",
				inputType: "number",
				icon: WeightIcon,
				label: "อายุ ไม่เกิน",
				classifier: "ปี",
				onChange: (e: ChangeEvent<HTMLInputElement>) => setDriverFilters({...driverFilters, age: e.target.value})
			}
		]
	}

	const driverDesktopColumns = [
		{
			id: "driver_license",
			label: "เลขใบขับขี่",
			align: "left",
			width: "20%",
		},
		{
			id: "name",
			label: "ชื่อ - นามสกุล",
			align: "left",
			width: "20%",
		},
		{
			id: "age",
			label: "อายุ",
			align: "left",
			width: "8%",
		},
		{
			id: "driver_license_type",
			label: "ชนิดใบขับขี่",
			align: "left",
			width: "20%",
		},
		{
			id: "status",
			label: "สถานะ",
			align: "center",
			width: "10%",
			format: (_: number, driver: DriverTable): ReactElement => (
				<span>{DRIVER_STATUS_LIST[driver.status]}</span>
			)
		},
		{
			id: "actions",
			label: "",
			width: "10%",
			sortable: false,
			format: (_: number, driver: DriverTable): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/carrier/driver/edit/${driver.driver_id}`)}><EditIcon /></button>
					<button onClick={() => toggleDeleteModal(driver)} ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

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
			format: (_: number, driver: DriverTable): ReactElement => (
				<span>{DRIVER_STATUS_LIST[driver.status]}</span>
			)
		},
		{
			id: "actions",
			label: "",
			width: "15%",
			format: (_: number, driver: DriverTable): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/carrier/driver/edit/${driver.driver_id}`)}><EditIcon /></button>
					<button onClick={() => toggleDeleteModal(driver)} ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	useEffect(() => {
		getDriver((drivers: DriverDocument[]) => {
			setDrivers(drivers)
			setDriverTableData(drivers)
			if (driverStatusCount[0] === 0) {
				resourceStatusCount(drivers, driverStatusCount, setDriverStatusCount)
			}
		})
	}, [])

	return (
		<>
			<Alert>
				{alertStatus.type === "success" ? "เพิ่มพนักงานขับรถสำเร็จ" : "เพิ่มพนักงานขับรถไม่สำเร็จ"}
			</Alert>
			<NavigationBar activeIndex={2} />
			<BreakpointMD>
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
							<span>ยืนยันลบข้อมูลพนักงานขับรถ <br /> ชื่อ {driverToDelete?.name} หรือไม่ ?</span>
							<FormActions>
								<SecondaryButton onClick={() => setToggleModal(false)}>ยกเลิก</SecondaryButton>
								<PrimaryButton onClick={deleteSelectedDriver}>ยืนยันลบข้อมูล</PrimaryButton>
							</FormActions>
						</ModalContent>
					</Modal>
				</ResourceOverview>
			</BreakpointMD>
			<BreakpointLGCustom>
				<ResourceOverview 
					headerTitle={"พนักงานขับรถ"}
					headerButton={"เพิ่มพนักงาน"}
					buttonOnClick={navigateToAddDriverPage}
					defaultSelect={"ทุกสถานะ"}
					statusList={DRIVER_STATUS_LIST}
					columns={driverDesktopColumns}
					filterList={filterList}
					filterState={driverFiltersState}
					filteredData={filterDriverState}
					tabsList={[
						{
							code: [0],
							title: "ทุกสถานะ",
						},
						{
							code: [100],
							title: "ว่าง",
						},
						{
							code: [200],
							title: "กำลังขนส่ง",
						},
						{
							code: [300],
							title: "ไม่รับงาน",
						},
					]}
					tabCountState={driverStatusCountState}
				>
					<Modal toggle={toggleModal} setToggle={setToggleModal}>
						<ModalContent>
							<WarningIcon />
							<span>ยืนยันลบข้อมูลพนักงานขับรถ <br /> ชื่อ {driverToDelete?.name} หรือไม่ ?</span>
							<FormActions>
								<SecondaryButton onClick={() => setToggleModal(false)}>ยกเลิก</SecondaryButton>
								<PrimaryButton onClick={deleteSelectedDriver}>ยืนยันลบข้อมูล</PrimaryButton>
							</FormActions>
						</ModalContent>
					</Modal>
				</ResourceOverview>
			</BreakpointLGCustom>
		</>
	)
}

export default withPrivateRoute(OverviewDriverPage, "carrier")
