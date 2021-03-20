import React, { ChangeEvent, ReactElement, useState } from 'react'
import styled from "styled-components"
import NavigationBar from '../../../components/common/NavigationBar'
import { FormActions, PrimaryButton, SecondaryButton, TableRowActions } from '../../../components/styles/GlobalComponents'
import { useRouter } from "next/router"
import { WarningIcon, CancelIcon, EditIcon, TruckIcon, OptionIcon, WeightIcon } from '../../../components/common/Icons'
import Modal from '../../../components/common/Modal'
import { GASOLINE_LIST, TRUCK_STATUS_LIST, TRUCK_TYPE_LIST } from '../../../data/carrier'
import ResourceOverview from '../../../components/common/ResourceOverview'
import { useEffect } from 'react'
import { deleteTruck, getTruck } from '../../../components/utilities/apis'
import { TruckDocument, TruckTable } from '../../../entities/interface/truck'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { filterResourceState, filterTruckState, filterWordState, tableDataState, truckFiltersState } from '../../../store/atoms/tableState'
import Alert from '../../../components/common/Alert'
import { alertPropertyState } from '../../../store/atoms/alertPropertyState'
import { BreakpointLG, BreakpointMD } from '../../../components/styles/Breakpoints'

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
`

const OverviewTruckPage = () => {
	const [truckToDelete, setTruckToDelete] = useState<TruckTable>()
	const [toggleModal, setToggleModal] = useState(false)
	const [trucks, setTrucks] = useState<TruckDocument[]>([])
	const [truckFilters, setTruckFilters] = useRecoilState(truckFiltersState)
	const setFilterWord = useSetRecoilState(filterWordState)
	const alertStatus = useRecoilValue(alertPropertyState)
	const [truckTableData, setTruckTableData] = useRecoilState(tableDataState)
	const router = useRouter()

	const toggleDeleteModal = (truck: TruckTable) => {
		setToggleModal(true)
		setTruckToDelete(truck)
	}

	const deleteSelectedTruck = async () => {
		const deletedIndex = truckTableData.indexOf(truckToDelete)
		if (deletedIndex > -1) {
			const newDriverTableData = truckTableData.slice()
			newDriverTableData.splice(deletedIndex, 1)
			setTruckTableData(newDriverTableData)
		}		
		const response = await deleteTruck(truckToDelete.truck_id)
		setToggleModal(false)
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
					<button onClick={() => toggleDeleteModal(truck)} ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	const truckDesktopColumns = [
		{
			id: "license_number",
			label: "เลขทะเบียน",
			width: "12%",
		},
		{
			id: "truck_type",
			label: "ประเภทรถ",
			width: "12%",
			format: (_: number, truck: TruckTable): ReactElement => (
				<span>{truck.truck_type.type}</span>
			)
		},
		{
			id: "option",
			label: "ส่วนเสริม",
			width: "10%",
			format: (_: number, truck: TruckTable): ReactElement => (
				<span>{truck.truck_type.option}</span>
			)
		},
		{
			id: "weight",
			label: "น้ำหนักบรรทุก",
			width: "15%",
			format: (_: number, truck: TruckTable): ReactElement => (
				<span>{`${truck.weight?.min} - ${truck.weight?.max} ตัน`}</span>
			)
		},
		{
			id: "age",
			label: "อายุรถ",
			width: "8%",
			format: (_: number, truck: TruckTable): ReactElement => (
				<span>{truck.age ? `${truck.age} ปี` : "ไม่ระบุ"}</span>
			)
		},
		{
			id: "gasoline",
			label: "น้ำมันรถ",
			width: "10%",
		},
		{
			id: "is_insure",
			label: "ประกันภัย",
			width: "10%",
			format: (_: number, truck: TruckTable): ReactElement => (
				<span>{truck.is_insure ? "มี" : "ไม่มี"}</span>
			)
		},
		{
			id: "status",
			label: "สถานะ",
			width: "10%",
			format: (_: number, truck: TruckTable): ReactElement => (
				<span>{TRUCK_STATUS_LIST[truck.status]}</span>
			)
		},
		{
			id: "truck_id",
			label: "",
			width: "8%",
			sortable: false,
			format: (_: number, truck: TruckTable): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/carrier/truck/edit/${truck.truck_id}`)}><EditIcon /></button>
					<button onClick={() => toggleDeleteModal(truck)} ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	const filterList = {
		0: [
			{
				type: "searchbar",
				placeholder: "ค้นหาจังหวัด สินค้า ประเภทรถ ฯลฯ",
				onChange: setFilterWord
			},
			{
				type: "dropdown",
				icon: TruckIcon,
				list: ["ทั้งหมด", ...Object.keys(TRUCK_TYPE_LIST)],
				value: truckFilters.truck.type,
				label: "ประเภทรถ",
				onChange: (value: string) => setTruckFilters({...truckFilters, truck: {...truckFilters.truck, type: value}})
			},
			
		],
		1: [{
			type: "selector",
			icon: OptionIcon,
			list: (truckFilters.truck.type === "ทั้งหมด" ? [] : ["ทั้งหมด", ...TRUCK_TYPE_LIST[truckFilters.truck.type].option]),
			label: "ส่วนเสริม",
			value: truckFilters.truck.option,
			enabled: (truckFilters.truck.type !== "ทั้งหมด"),
			onChange: (option: string) => setTruckFilters({...truckFilters, truck: {...truckFilters.truck, option: option}}),
		}],
		2: [
		{
			type: "inputrange",
			inputType: "number",
			icon: WeightIcon,
			value: {
				from: truckFilters.weight.min,
				to: truckFilters.weight.max
			},
			label: "น้ำหนักบรรทุก",
			classifier: "ตัน",
			onChange: (value, target: string) => setTruckFilters({...truckFilters, weight: {...truckFilters.weight, [target]: value}})
		},
		{
			type: "input",
			inputType: "number",
			icon: WeightIcon,
			label: "อายุ ไม่เกิน",
			classifier: "ปี",
			onChange: (e: ChangeEvent<HTMLInputElement>) => setTruckFilters({...truckFilters, age: e.target.value})
		}],
		3: [
		{
			type: "dropdown",
			icon: TruckIcon,
			list: ["ทั้งหมด", ...GASOLINE_LIST],
			value: truckFilters.gasoline,
			label: "น้ำมันรถ",
			onChange: (value: string) => setTruckFilters({...truckFilters, gasoline: value})
		},
		{
			type: "selector",
			icon: OptionIcon,
			list: ["ทั้งหมด", "มี", "ไม่มี"],
			label: "ประกันภัย",
			value: truckFilters.insurance,
			onChange: (option: string) => setTruckFilters({...truckFilters, insurance: option}),
		}
		]
	}

	const convertToTableFormat = (trucks: TruckDocument[]): TruckTable[] => {
		const truckTableData = []
		trucks.map((truck) => {
			const { truck_id, license_number, property, age, gasoline, is_insure, weight, status } = truck
			truckTableData.push({
				truck_id,
				license_number,
				truck_type: property,
				weight,
				age,
				gasoline,
				is_insure,
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
			<BreakpointMD>
				<ResourceOverview 
					headerTitle={"รถบรรทุก"}
					headerButton={"เพิ่มรถ"}
					buttonOnClick={navigateToAddTruckPage}
					defaultSelect={"ทุกสถานะ"}
					statusList={TRUCK_STATUS_LIST}
					columns={truckColumns}
					filterList={filterList}
					filterState={truckFiltersState}
				>
					<Modal toggle={toggleModal} setToggle={setToggleModal}>
						<ModalContent>
							<WarningIcon />
							<span>ยืนยันลบข้อมูลรถ <br /> ทะเบียน {truckToDelete?.license_number} หรือไม่ ?</span>
							<FormActions>
								<SecondaryButton onClick={() => setToggleModal(false)}>ยกเลิก</SecondaryButton>
								<PrimaryButton onClick={deleteSelectedTruck}>ยืนยันลบข้อมูล</PrimaryButton>
							</FormActions>
						</ModalContent>
					</Modal>
				</ResourceOverview>
			</BreakpointMD>
			<BreakpointLGCustom>
				<ResourceOverview 
					headerTitle={"รถบรรทุก"}
					headerButton={"เพิ่มรถ"}
					buttonOnClick={navigateToAddTruckPage}
					defaultSelect={"ทุกสถานะ"}
					statusList={TRUCK_STATUS_LIST}
					columns={truckDesktopColumns}
					filterList={filterList}
					filterState={truckFiltersState}
					filteredData={filterTruckState}
				>
					<Modal toggle={toggleModal} setToggle={setToggleModal}>
						<ModalContent>
							<WarningIcon />
							<span>ยืนยันลบข้อมูลรถ <br /> ทะเบียน {truckToDelete?.license_number} หรือไม่ ?</span>
							<FormActions>
								<SecondaryButton onClick={() => setToggleModal(false)}>ยกเลิก</SecondaryButton>
								<PrimaryButton onClick={deleteSelectedTruck}>ยืนยันลบข้อมูล</PrimaryButton>
							</FormActions>
						</ModalContent>
					</Modal>
				</ResourceOverview>
			</BreakpointLGCustom>
		</>
	)
}

export default OverviewTruckPage
