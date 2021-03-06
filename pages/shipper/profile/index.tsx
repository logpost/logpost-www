import React, { ReactElement, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import {
	CancelIcon,
	DownArrowLine,
	EditIcon,
	JobIcon,
	JobSuccessIcon,
	OptionIcon,
	PriceIcon,
	RightArrow,
	TruckIcon,
	UpArrowLine,
	WeightIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"
import { jobStatusCountState, myJobsState } from "../../../store/atoms/carrierProfileState"
import { dateFormatter, resourceStatusCount, timeFormatter } from "../../../components/utilities/helper"
import { getMyJob } from "../../../components/utilities/apis"
import { JobDocument } from '../../../entities/interface/job'
import { BreakpointLG, BreakpointMD } from "../../../components/styles/Breakpoints"
import DesktopHeader from "../../../components/common/DesktopHeader"
import { ButtonGroupContainer, ButtonItem, HeaderTitle, NumberOfJobs, Pagination, PrimaryButton, RadioButton, TableRowActions, TextButton } from "../../../components/styles/GlobalComponents"
import SearchBar from "../../../components/common/SearchBar"
import SelectComponent from "../../../components/common/SelectComponent"
import { JOB_STATUS_CODE, PROVINCES } from "../../../data/jobs"
import TableComponent from "../../../components/common/TableComponent"
import { filterDropoffDateState, filterLocationState, filterPickupDateState, filterPriceState, filterState, filterStatusState, filterTruckState, filterWeightState, filterWordState, tableDataState } from "../../../store/atoms/tableState"
import { useRouter } from "next/router"
import InputComponent from "../../../components/common/InputComponent"
import DateAndTimePicker from "../../../components/common/DateAndTimePicker"
import { TRUCK_TYPE_LIST } from "../../../data/carrier"

interface TabItemInterface {
	isActive: boolean;
}

interface FiltersContainerInterface {
	isExpand: boolean;
}

const ProfileStatusContainer = styled.div`
	margin-top: 1.8rem;
`

const HeaderTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;

	${HeaderTitle} {
		color: hsl(212, 28%, 28%);
        font-weight: 600;
	}

	${PrimaryButton} {
		background-color: hsl(212, 28%, 28%);
		padding: 0.6rem 1.6rem;
		border-radius: 6px;
	}
`

const FilterContainer = styled.div`
	font-size: 1.4rem;
	display: flex;
	align-items: center;
	width: 50%;

	&#option {
		width: 100%;

		> ${ButtonGroupContainer} {
			width: 100%;
			grid-template-columns: repeat(auto-fill, 8.5rem);

			${ButtonItem} {
				font-size: 1.4rem;
				height: 3.2rem;
				width: 8.2rem;
				padding: 0;
			}
		}
	}

	input {
		margin-top: 0;
		font-size: 1.4rem;
		height: 3.2rem;

		& ~ div {
			font-size: 1.4rem;
			margin-left: 1.4rem;
		}
	}

	> svg {
		margin-right: 0.5rem;
		min-height: 1.8rem;
		min-width: 1.8rem;
	}

	> div {
		margin-top: 0;

		&.MuiInputBase-root {
			width: 70%;
			max-width: 17rem;
			min-width: 12rem;
			font-size: 1.4rem;
			height: 2.8rem;

			> svg {
				height: 2.6rem;
				width: 2.6rem;
				padding: 0.9rem;
			}
		}
		
		.react-datepicker__input-container input {
			font-size: 1.4rem;
			margin-top: 0;
			height: 3.2rem;
		}
	}

	> span {
		margin: 0 1.4rem;
	}
`

const FilterRow = styled.div`
	display: flex;
	align-items: center;

	${FilterContainer}:not(:first-child) {
		margin-left: 1.4rem;
	}

	&:not(:first-child) {
		justify-content: flex-start;

		> div {
			width: auto;
		}
	}

	&:first-child {
		justify-content: space-between;

		> div {
			display: flex;
			width: 80%;

			> div:first-child {
				border: 1px solid hsl(0, 0%, 66%);
				background-color: white;
				min-width: 15rem;
				height: max-content;
		
				input {
					background-color: white;
				}
			}
		}

		${TextButton} {
			text-decoration: none;
			font-size: 1.4rem;
			justify-self: flex-end;

			svg {
				transform: rotate(90deg);
				margin-left: 0.8rem;
			}
		}
	}
`

const FiltersContainer = styled.div<FiltersContainerInterface>`
	display: flex;
	flex-direction: column;
	margin-top: 1.4rem;
	width: 100%;
	height: ${(props) => props.isExpand ? "auto" : "3.4rem"};
	transition: all 300ms ease-in-out;

	> div:not(:first-child) {
		margin-top: 1.8rem;
		opacity: ${(props) => props.isExpand ? 1 : 0};
		transition: all 300ms ease-in-out;
	}
`

const ContentContainer = styled.div`
	background-color: hsla(211, 28%, 28%, 0.06);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3rem; 
`

const TableContainer = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	border-radius: 0 8px 8px 8px;
	padding-bottom: 1.8rem;
`

const TableRowStyle = styled.tr`
	background-color: hsl(211, 22%, 96%);
	border-radius: 6px;
	font-weight: 300;

	td {
		padding: 1.4rem 0.6rem;
		
		&:first-child {
			border-radius: 6px 0 0 6px;
		}

		&:last-child {
			border-radius: 0 6px 6px 0;
		}
	}
`

const TableHeaderStyle = styled.tr`
	background-color: transparent;
	box-shadow: none;

	> th {
		padding: 0;
	}
`

const TablePaginationStyle = styled(Pagination)`
	&& {
		color: hsl(212, 28%, 28%);

		> span {
			width: 50%
		}
		
		svg {
			path {
				fill: hsl(212, 28%, 28%);
			}
		}
	}
`

const TabContainer = styled.div`
	display: flex;
	align-self: flex-start;
	border-radius: 8px 8px 0 0;
	background-color: transparent;
`

const TablItem = styled.button<TabItemInterface>`
	padding: 1rem 2rem;
	font-size: 1.7rem;
	display: flex;
	align-items: center;
	color: hsl(212, 28%, 28%);

	${NumberOfJobs} {
		position: static;
		margin-left: 0.9rem;
		background-color: hsl(211, 28%, 90%);
		color: hsl(228, 22%, 57%);
		height: 2.5rem;
		width: 2.5rem;
		font-size: 1.3rem;
		border-radius: 20px;
	}

	${props => props.isActive && 
		css`
			background-color: white;
			font-weight: 600;
			border-radius: 8px 8px 0 0;
			
			${NumberOfJobs} {
				color: white;
				background-color: hsl(212, 28%, 28%);
			}
		` 
	}
`

const RadioContainer = styled.div`
	display: flex;
	margin-right: 1.4rem;
	
	> div {
		display: flex;

		&:last-child {
			margin-left: 1.4rem;
		}

		${RadioButton} {
			margin: 0;
		}

		> span {
			margin-left: 1rem;
			white-space: nowrap;
		}
	}
`

const FilterLabel = styled.div`
	white-space: nowrap;
	display: flex;
	margin-right: 1.4rem;

	svg {
		margin-right: 1rem;
		height: 20px;
		width: 20px; 
		
		#truck {
			stroke: hsl(16, 56%, 51%);
			stroke-width: 3px;
		}
	}
`

const ShipperProfilePage = () => {
	const shipperInfo = useRecoilValue(userInfoState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{ [key: number]: number }>(jobStatusCountState)
	const [filters, setFilters] = useState({
		search: "",
		pickup_province: "ทั้งหมด",
		dropoff_province: "ทั้งหมด",
		status: [0],
		pickup_date: {
			isFilter: false,
			start: new Date(new Date().setHours(0, 0, 0, 0)),
			end: new Date(new Date().setHours(23, 59, 59, 999))
		},
		dropoff_date: {
			isFilter: false,
			start: new Date(new Date().setHours(0, 0, 0, 0)),
			end: new Date(new Date().setHours(23, 59, 59, 999))
		},
		weight: undefined,
		price: undefined,
		truck: {
			type: "ทั้งหมด",
			option: "ตู้ทึบ",
		}
	})
	const [jobTableData, setTableData] = useRecoilState(tableDataState)
	const router = useRouter()
	const filteredData = useRecoilValue(filterState)
	const setFilterWord = useSetRecoilState(filterWordState)
	const setFilterLocation = useSetRecoilState(filterLocationState)
	const setFilterPickupDate = useSetRecoilState(filterPickupDateState)
	const setFilterDropoffDate = useSetRecoilState(filterDropoffDateState)
	const setFilterStatus = useSetRecoilState(filterStatusState)
	const setFilterWeight = useSetRecoilState(filterWeightState)
	const setFilterPrice = useSetRecoilState(filterPriceState)
	const setFilterTruck = useSetRecoilState(filterTruckState)
	const [showMoreFilter, setShowMoreFilter] = useState(false)

	useEffect(() => {
		setFilterStatus(filters.status)
	}, [filters.status])

	useEffect(() => {
		setFilterLocation({
			pickup: filters.pickup_province,
			dropoff: filters.dropoff_province
		})
	}, [filters.pickup_province, filters.dropoff_province])

	useEffect(() => {
		setFilterPickupDate(filters.pickup_date)
	}, [filters.pickup_date])

	useEffect(() => {
		setFilterDropoffDate(filters.dropoff_date)
	}, [filters.dropoff_date])

	useEffect(() => {
		setFilterWeight(filters.weight)
		console.log(parseInt(filters.weight))
	}, [filters.weight])

	useEffect(() => {
		setFilterPrice(filters.price)
	}, [filters.price])

	useEffect(() => {
		setFilterTruck(filters.truck)
	}, [filters.truck])

	const filterDate = (filterField: string, targetField: string, value: (Date | boolean)) => {
		const updateFilterDate = {
			...filters,
			[filterField]: {
				...filters[filterField],
				[targetField]: value
			}
		}
		setFilters(updateFilterDate)
	}
 	// useEffect(() => {
	// 	resourceStatusCount(filteredData, {
	// 		0: 0,
	// 		100: 0,
	// 		800: 0
	// 	}, setJobStatusCount)
	// }, [filteredData])

	const jobColumns = [
		{
			id: "pickup_location",
			label: "ขึ้นสินค้า",
			width: "10%",
			align: "left"
		},
		{
			id: "dropoff_location",
			label: "ลงสินค้า",
			width: "10%",
			align: "left"
		},
		{
			id: "pickup_date",
			label: "วันขึ้นสินค้า",
			width: "14%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{`${dateFormatter(job.pickup_date)} ${timeFormatter(job.pickup_date)}`.slice(0, -3)}</span>
			)
		},
		{
			id: "dropoff_date",
			label: "วันลงสินค้า",
			width: "14%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{`${dateFormatter(job.dropoff_date)} ${timeFormatter(job.dropoff_date)}`.slice(0, -3)}</span>
			)
		},
		{
			id: "product_type",
			label: "สินค้า",
			width: "8%",
			align: "left"
		},
		{
			id: "weight",
			label: "น้ำหนัก",
			width: "8%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{`${job.weight} ตัน`}</span>
			)
		},
		{
			id: "offer_price",
			label: "ราคา",
			width: "8%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{job.offer_price.toLocaleString()}</span>
			)
		},
		{
			id: "truck_type",
			label: "ประเภทรถ",
			width: "12%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{`${job.carrier_specification.truck.property.type} ${job.carrier_specification.truck.property.option}`}</span>
			)
		},
		{
			id: "status",
			label: "สถานะ",
			width: "8%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{JOB_STATUS_CODE[job.status].status_name}</span>
			)
		},
		{
			id: "actions",
			label: "เลือก",
			width: "8%",
			format: (_: number, job): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/jobs/edit/${job.job_id}`)}><EditIcon /></button>
					<button ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

	const convertJobToTableFormat = (jobs: JobDocument[]) => {
		const jobTableData = []
		jobs.map((job) => {
			const { pickup_location, dropoff_location } = job
			jobTableData.push({
				...job, 
				pickup_location: pickup_location.province,
				dropoff_location: dropoff_location.province,
			})
		})
		return jobTableData
	}

	useEffect(() => {
		if (shipperInfo.username) {
			getMyJob((jobs: JobDocument[]) => {
				const jobTableData = convertJobToTableFormat(jobs)
				setTableData(jobTableData)
				resourceStatusCount(jobTableData, {
					0: 0,
					100: 0,
					800: 0
				}, setJobStatusCount)
			})
		}
	}, [shipperInfo])

	return (
		<>
			<NavigationBar activeIndex={2} />
			<BreakpointMD>
				<Header enabledSetting={true}>
					{shipperInfo.displayName}
				</Header>
				<ProfileStatusContainer>
					<ProfileStatus
						title="รายการงาน"
						buttonText="รายการทั้งหมด"
						buttonLink="jobs?status=all"
						type="button"
						items={[
							{
								name: "รอผู้รับงาน",
								onClickLink: "jobs?status=waiting",
								icon: <JobIcon />,
								noOfJobs: jobStatusCount[100],
							},
							{
								name: "กำลังขนส่ง",
								onClickLink: "jobs?status=shipping",
								icon: <TruckIcon />,
								noOfJobs: jobStatusCount[0],
							},
							{
								name: "ขนส่งเสร็จสิ้น",
								onClickLink: "jobs?status=finished",
								icon: <JobSuccessIcon />,
								noOfJobs: jobStatusCount[800],
							},
						]}
					/>
				</ProfileStatusContainer>
			</BreakpointMD>
			<BreakpointLG>
				<DesktopHeader>
					<HeaderTitleContainer>
						<HeaderTitle>รายการงาน</HeaderTitle>
						<PrimaryButton>สร้างงานใหม่</PrimaryButton>
					</HeaderTitleContainer>
					<FiltersContainer isExpand={showMoreFilter}>
						<FilterRow>
							<div>
								<SearchBar
									placeholder="ค้นหาจังหวัด สินค้า ประเภทรถ ฯลฯ"
									setValue={setFilterWord}
								/>
								<FilterContainer>
									<FilterLabel>
										<UpArrowLine />
										<span>ต้นทาง</span>
									</FilterLabel>
									<SelectComponent
										value={filters.pickup_province}
										setValue={(value: string) => setFilters({ ...filters, pickup_province: value })}
										menuList={["ทั้งหมด", ...PROVINCES]}
									/>
								</FilterContainer>
								<FilterContainer>
									<FilterLabel>
										<DownArrowLine />
										<span>ปลายทาง</span>
									</FilterLabel>
									<SelectComponent
										value={filters.dropoff_province}
										setValue={(value: string) => setFilters({ ...filters, dropoff_province: value })}
										menuList={["ทั้งหมด", ...PROVINCES]}
									/>
								</FilterContainer>
							</div>
							<TextButton onClick={() => setShowMoreFilter(!showMoreFilter)}><span>แสดงตัวกรองอื่น ๆ</span><RightArrow/></TextButton>
						</FilterRow>
						<FilterContainer>
							<FilterLabel>
								<UpArrowLine />
								<span>วันขึ้นสินค้า</span>
							</FilterLabel>
							<RadioContainer>
								<div>
									<RadioButton>
										<input 
											defaultChecked 
											type="radio" 
											value="ทุกวัน" 
											name="pickup_date" 
											onChange={() => filterDate("pickup_date", "isFilter", false)} />
										<JobSuccessIcon />
									</RadioButton>
									<span>ทุกวัน</span>
								</div>
								<div>
									<RadioButton>
										<input 
											type="radio" 
											value="เลือกช่วง" 
											name="pickup_date" 
											onChange={() => filterDate("pickup_date", "isFilter", true)} />
										<JobSuccessIcon />
									</RadioButton>
									<span>เลือกช่วง</span>
								</div>
							</RadioContainer>
							<DateAndTimePicker 
								dateAndTime={filters.pickup_date.start}
								setDateAndTime={(value: Date) => setFilters({...filters, pickup_date: {...filters.pickup_date, start: new Date(value.setHours(0, 0, 0, 0))}})}
								hideTime={true}
								disabledDate={!filters.pickup_date.isFilter}
								minDate={new Date(2000)}
							/>
							<span>ถึง</span>
							<DateAndTimePicker 
								dateAndTime={filters.pickup_date.end < filters.pickup_date.start ? filters.pickup_date.start : filters.pickup_date.end}
								setDateAndTime={(value: Date) => setFilters({...filters, pickup_date: {...filters.pickup_date, end: new Date(value.setHours(23, 59, 59, 999))}})}
								minDate={filters.pickup_date.start}
								hideTime={true}
								disabledDate={!filters.pickup_date.isFilter}
							/>
						</FilterContainer>
						<FilterContainer>
							<FilterLabel>
								<DownArrowLine />
								<span>วันลงสินค้า</span>
							</FilterLabel>
							<RadioContainer>
								<div>
									<RadioButton>
										<input 
											defaultChecked 
											type="radio" 
											value="ทุกวัน" 
											name="dropoff_date" 
											onChange={() => filterDate("dropoff_date", "isFilter", false)} />
										<JobSuccessIcon />
									</RadioButton>
									<span>ทุกวัน</span>
								</div>
								<div>
									<RadioButton>
										<input 
											type="radio" 
											value="เลือกช่วง" 
											name="dropoff_date" 
											onChange={() => filterDate("dropoff_date", "isFilter", true)} />
										<JobSuccessIcon />
									</RadioButton>
									<span>เลือกช่วง</span>
								</div>
							</RadioContainer>
							<DateAndTimePicker 
								dateAndTime={filters.dropoff_date.start}
								setDateAndTime={(value: Date) => setFilters({...filters, dropoff_date: {...filters.dropoff_date, start: new Date(value.setHours(0, 0, 0, 0))}})}
								hideTime={true}
								disabledDate={!filters.dropoff_date.isFilter}
								minDate={new Date(2000)}
							/>
							<span>ถึง</span>
							<DateAndTimePicker 
								dateAndTime={filters.dropoff_date.end < filters.dropoff_date.start ? filters.dropoff_date.start : filters.dropoff_date.end}
								setDateAndTime={(value: Date) => setFilters({...filters, dropoff_date: {...filters.dropoff_date, end: new Date(value.setHours(23, 59, 59, 999))}})}
								minDate={filters.dropoff_date.start}
								hideTime={true}
								disabledDate={!filters.dropoff_date.isFilter}
							/>
						</FilterContainer>
						<FilterRow>
							<FilterContainer>
								<FilterLabel>
									<WeightIcon />
									<span>น้ำหนัก ไม่เกิน</span>
								</FilterLabel>
								<InputComponent
									type="number"
									classifier="ตัน"
									disableLabel={true}
									value={filters.weight}
									handleOnChange={(e) => setFilters({...filters, weight: e.target.value})}
								/>
							</FilterContainer>
							<FilterContainer>
								<FilterLabel>
									<PriceIcon />
									<span>ราคา ขั้นต่ำ</span>
								</FilterLabel>
								<InputComponent
									type="number"
									classifier="บาท"
									disableLabel={true}
									value={filters.price}
									handleOnChange={(e) => setFilters({...filters, price: e.target.value})}
								/>
							</FilterContainer>
						</FilterRow>
						<FilterRow>
							<FilterContainer>
								<FilterLabel>
									<TruckIcon />
									<span>ประเภทรถ</span>
								</FilterLabel>
								<SelectComponent
									menuList={["ทั้งหมด", ...Object.keys(TRUCK_TYPE_LIST)]}
									value={filters.truck.type}
									setValue={(value: string) => setFilters({...filters, truck: {...filters.truck, type: value}})}
								/>
							</FilterContainer>
							{
								filters.truck.type !== "ทั้งหมด" &&
								<FilterContainer id="option">
									<FilterLabel>
										<OptionIcon />
										<span>ส่วนเสริม</span>
									</FilterLabel>
									<ButtonGroupContainer>
										{	
											["ทั้งหมด", ...TRUCK_TYPE_LIST[filters.truck.type].option].map((option: string, index: number) => {
												return (
													<ButtonItem
														key={index}
														onClick={() => setFilters({...filters, truck: {...filters.truck, option: option}})}
														name={option}
														value={filters.truck.option}
													>
														{option}
													</ButtonItem>
												)
											})
										}
									</ButtonGroupContainer>
								</FilterContainer>
							}
						</FilterRow>
					</FiltersContainer>
				</DesktopHeader>
				<ContentContainer>
					<TabContainer>
						<TablItem isActive={filters.status[0] === 0} onClick={() => setFilters({...filters, status: [0]})}>
							ทั้งหมด
							<NumberOfJobs>{jobTableData.length}</NumberOfJobs>
						</TablItem>
						<TablItem isActive={filters.status[0] === 100} onClick={() => setFilters({...filters, status: [100]})}>
							รอผู้รับงาน
							<NumberOfJobs>{jobStatusCount[100]}</NumberOfJobs>
						</TablItem>
						<TablItem 
							isActive={filters.status.length > 1} 
							onClick={() => setFilters({...filters, status: [200, 300, 400, 500, 600, 700]})}>
							กำลังขนส่ง
							<NumberOfJobs>{jobStatusCount[0]}</NumberOfJobs>
						</TablItem>
						<TablItem isActive={filters.status[0] === 800} onClick={() => setFilters({...filters, status: [800]})}>
							ขนส่งเสร็จสิ้น
							<NumberOfJobs>{jobStatusCount[800]}</NumberOfJobs>
						</TablItem>
					</TabContainer>
					<TableContainer>
						<TableComponent
							columns={jobColumns}
							tableStyle={{
								width: "95%",
								gap: "18px"
							}}
							RowStyle={TableRowStyle}
							HeaderStyle={TableHeaderStyle}
							PaginationStyle={TablePaginationStyle}
						/>
					</TableContainer>
				</ContentContainer>
			</BreakpointLG>
		</>
	)
}

export default ShipperProfilePage
