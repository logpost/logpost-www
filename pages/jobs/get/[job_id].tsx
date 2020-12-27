import React, { useState, useEffect, ReactElement } from "react"
import styled from "styled-components"
import Header from "../../../components/common/Header"
import { useRouter } from "next/router"
import {
	RightArrow,
	RightArrowLine,
	SuccessIcon,
} from "../../../components/common/Icons"
import {
	CarrierDetailsContainer,
	Detail,
	JobTitle,
	SecondaryButton,
	FormActions,
	PrimaryButton,
} from "../../../components/styles/GlobalComponents"
import DetailSection from "../../../components/common/DetailSection"
import Modal from "../../../components/common/Modal"
import TableComponent from "../../../components/common/TableComponent"
import NavigationBar from "../../../components/common/NavigationBar"
import SearchBar from "../../../components/common/SearchBar"
import { filterData } from "../../../components/utilities/helper"

const MOCKUP_DRIVER = [
	{
		id: "01",
		driver_name: "อสมาภรณ์ ดีวรัตน์",
		driver_license_type: "ท.2",
	},
	{
		id: "02",
		driver_name: "ปูรณ์ โชตธีรวสุ",
		driver_license_type: "ท.4",
	},
	{
		id: "03",
		driver_name: "ชัญญา พุกกะรัตน​์",
		driver_license_type: "ท.2",
	},
	{
		id: "04",
		driver_name: "ชิษณุพงศ์ วรวิจิตรชัยกุล",
		driver_license_type: "ท.3",
	},
	{
		id: "05",
		driver_name: "จิรัชฌา วิทยาชีวะ",
		driver_license_type: "ท.3",
	},
	{
		id: "06",
		driver_name: "นรเศรษฐ์ โพธิ์ทอง",
		driver_license_type: "ท.3",
	},
	{
		id: "07",
		driver_name: "ศิวกร ไทยแท้",
		driver_license_type: "ท.4",
	},
	{
		id: "08",
		driver_name: "ฐิติวัชร์ นาพรหม",
		driver_license_type: "ท.2",
	},
	{
		id: "09",
		driver_name: "ณัฐพัชร์ วัฒนชาญสิทธิ์",
		driver_license_type: "ท.1",
	},
	{
		id: "10",
		driver_name: "ชัชวิน แท่งทอง",
		driver_license_type: "ท.3",
	},
	{
		id: "11",
		driver_name: "จารวี ทองเจริญ",
		driver_license_type: "ท.1",
	},
	{
		id: "12",
		driver_name: "กฤตพล จันทร์ศุภกุล",
		driver_license_type: "ท.1",
	},
	{
		id: "13",
		driver_name: "ธีรธัชช์ นักร้อง",
		driver_license_type: "ท.1",
	},
	{
		id: "14",
		driver_name: "ปัณฑา ปราโมทย์กุล",
		driver_license_type: "ท.3",
	},
	{
		id: "15",
		driver_name: "พรรษชล เผ่าทิตธรรม",
		driver_license_type: "ท.4",
	}
]

const MOCKUP_TRUCK = [
	{
		license_number: "90-6179",
		wheel: "หัวลาก",
		add_on: "2 เพลา",
	},
	{
		license_number: "89-7280",
		wheel: "6 ล้อ",
		add_on: "-",
	},
	{
		license_number: "กข-1111",
		wheel: "4 ล้อ",
		add_on: "ตู้ทึบ",
	},
]

const JOB_MOCK_DETAILS = {
	shipper_id: "01",
	carrier_id: "",
	driver_name: "",
	license_number: "",
	pickup_location: "กรุงเทพ",
	dropoff_location: "ชลบุรี",
	pickup_date: "20 ต.ค. 63 09:00 น.",
	dropoff_date: "20 ต.ค. 63 18:00 น.",
	weight: 2,
	product_type: "ไม้อัด",
	description: "งานด่วน ไม่ต้องรอขึ้นของ",
	waiting_time: 0,
	carrier_specification: {
		truck: {
			age: 5,
			type: {
				wheel: 6,
				options: "ตู้ทึบ",
			},
		},
		driver: {
			driver_license_type: "12345555",
		},
	},
	offer_price: 8000,
	auto_price: 4800,
}

const FormActionsCustom = styled(FormActions)`
	${PrimaryButton}, ${SecondaryButton} {
		font-size: 1.6rem;
		font-weight: 500;
		border-radius: 0.6rem;
	}

	${PrimaryButton} {
		box-shadow: none;
		background-color: hsl(212, 28%, 28%);
	}
`

const JobDetails = styled.div`
	padding: 0 2rem;
	margin-bottom: 8rem;

	${Detail} {
		white-space: nowrap;

		span {
			margin-left: 1.2rem;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		button {
			text-overflow: ellipsis;
			overflow: hidden;
		}

		button,
		svg {
			margin-left: 0.6rem;
			color: hsl(16, 56%, 51%);

			path {
				fill: hsl(16, 56%, 51%);
			}
		}
	}

	${FormActionsCustom} {
		margin-top: 2rem;
	}
`

const Warning = styled.div`
	margin-top: 2rem;
	color: hsl(16, 56%, 51%);
	font-size: 1.8rem;
	font-weight: 600;
`

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	white-space: nowrap;

	> *:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	${Warning} {
		font-size: 1.6rem;
		margin-top: 0;
	}

	${FormActionsCustom} {
		padding: 0 1.6rem;
	}
`

const ModalTitle = styled.div`
	color: hsl(212, 28%, 28%);
	font-weight: 600;
	font-size: 2rem;
`

const RadioButton = styled.div`
	position: relative;
	width: 1.6rem;
	height: 1.6rem;
	border: 0.1rem solid hsl(16, 56%, 51%);
	border-radius: 50%;
	margin: auto;
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 0 0 0 6px hsl(16, 56%, 51%, 10%);
	}

	svg {
		width: 2.7rem;
		height: 2.7rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		#circle {
			display: none;
		}

		#check {
			fill: transparent;
		}
	}

	input {
		position: absolute;
		height: 1.6rem;
		width: 1.6rem;
		margin: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		opacity: 0;

		&:checked {
			& ~ svg {
				#check {
					fill: white;
				}

				#background {
					fill: hsl(16, 56%, 51%);
				}
			}
		}
	}
`

const GetJobPage = () => {
	const router = useRouter()
	const { job_id } = router.query
	const [toggleDriverModal, setToggleDriverModal] = useState(false)
	const [toggleTruckModal, setToggleTruckModal] = useState(false)
	const [filteredData, setFilteredData] = useState([])
	const [filter, setFilter] = useState("")
	const [isRadioSelected, setIsRadioSelected] = useState(true)
	const [carrierDetails, setCarrierDetails] = useState({
		truck: null,
		driver: null,
	})

	const driverColumns = [
		{
			id: "id",
			label: "รหัส",
		},
		{
			id: "driver_name",
			label: "ชื่อ - นามสกุล",
			align: "left",
			width: "35%"
		},
		{
			id: "driver_license_type",
			label: "ใบขับขี่",
		},
		{
			id: "actions",
			label: "เลือก",
			format: (driver_index: number): ReactElement => (
				<RadioButton>
					<input type="radio" value={driver_index} name="driver" />
					<SuccessIcon />
				</RadioButton>
			),
		},
	]

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
			id: "add_on",
			label: "เพิ่มเติม",
		},
		{
			id: "actions",
			label: "เลือก",
			format: (truck_index: number): ReactElement => (
				<RadioButton>
					<input type="radio" value={truck_index} name="truck" />
					<SuccessIcon />
				</RadioButton>
			),
		},
	]

	const selectRow = (type: string) => {
		const element = document.querySelector(
			`input[name=${type}]:checked`
		) as HTMLInputElement
		if (element) {
			setToggleDriverModal(false)
			setToggleTruckModal(false)
			setIsRadioSelected(true)
			setCarrierDetails({ ...carrierDetails, [type]: element.value })
		} else {
			setIsRadioSelected(false)
		}
	}

	const toggleModal = (target: string) => {
		if (target === "driver") {
			setToggleDriverModal(true)
			setFilteredData(MOCKUP_DRIVER)
		} else if (target === "truck") {
			setToggleTruckModal(true)
			setFilteredData(MOCKUP_TRUCK)
		}
	}

	useEffect(() => {
		if (toggleDriverModal) {
			filterData(MOCKUP_DRIVER, filter, setFilteredData)
		} else if (toggleTruckModal) {
			filterData(MOCKUP_TRUCK, filter, setFilteredData)
		}
	}, [filter])

	return (
		<div>
			<NavigationBar />
			<Modal toggle={toggleDriverModal} setToggle={setToggleDriverModal}>
				<ModalContent>
					<ModalTitle>เลือกพนักงานขับรถ</ModalTitle>
					<SearchBar
						placeholder="ค้นหารหัส, ชื่อหรือประเภทใบขับขี่"
						setValue={setFilter}
					/>
					<TableComponent
						columns={driverColumns}
						data={filteredData}
					/>
					{!isRadioSelected && (
						<Warning>กรุณาเลือกพนักงานขับรถ</Warning>
					)}
					<FormActionsCustom>
						<SecondaryButton
							onClick={() => setToggleDriverModal(false)}
						>
							ย้อนกลับ
						</SecondaryButton>
						<PrimaryButton onClick={() => selectRow("driver")}>
							ยืนยันเลือก
						</PrimaryButton>
					</FormActionsCustom>
				</ModalContent>
			</Modal>
			<Modal toggle={toggleTruckModal} setToggle={setToggleTruckModal}>
				<ModalContent>
					<ModalTitle>เลือกรถบรรทุก</ModalTitle>
					<SearchBar
						placeholder="ค้นหาทะเบียนหรือประเภทรถ"
						setValue={setFilter}
					/>
					<TableComponent
						columns={truckColumns}
						data={filteredData}
					/>
					{!isRadioSelected && <Warning>กรุณาเลือกรถบรรทุก</Warning>}
					<FormActionsCustom>
						<SecondaryButton
							onClick={() => setToggleTruckModal(false)}
						>
							ย้อนกลับ
						</SecondaryButton>
						<PrimaryButton onClick={() => selectRow("truck")}>
							ยืนยันเลือก
						</PrimaryButton>
					</FormActionsCustom>
				</ModalContent>
			</Modal>
			<Header>
				<JobTitle>
					รับงาน กรุงเทพ
					<RightArrowLine />
					ชลบุรี
				</JobTitle>
			</Header>
			<JobDetails>
				<DetailSection details={JOB_MOCK_DETAILS} />
				<Warning>เลือกพนักงานและรถที่ใช้รับงาน</Warning>
				<CarrierDetailsContainer>
					<Detail>
						พนักงานขับรถ
						{carrierDetails.driver && (
							<span>
								{
									MOCKUP_DRIVER[carrierDetails.driver]
										.driver_name
								}
							</span>
						)}
						<button onClick={() => toggleModal("driver")}>
							{carrierDetails.driver
								? "แก้ไข"
								: "เลือกพนักงานขับรถ"}
							<RightArrow />
						</button>
					</Detail>
					<Detail>
						รถบรรทุก
						{carrierDetails.truck && (
							<span>
								{
									MOCKUP_TRUCK[carrierDetails.truck]
										.license_number
								}
							</span>
						)}
						<button onClick={() => toggleModal("truck")}>
							{carrierDetails.truck ? "แก้ไข" : "เลือกรถบรรทุก"}
							<RightArrow />
						</button>
					</Detail>
				</CarrierDetailsContainer>
				<FormActionsCustom>
					<SecondaryButton>ย้อนกลับ</SecondaryButton>
					<PrimaryButton
						onClick={() => router.push(`/jobs/details/${job_id}`)}
					>
						ยืนยันรับงาน
					</PrimaryButton>
				</FormActionsCustom>
			</JobDetails>
		</div>
	)
}

export default GetJobPage
