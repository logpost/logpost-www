import React, { ChangeEvent, useEffect } from "react"
import styled from "styled-components"
import {
	DownArrowLine,
	JobIcon,
	JobSuccessIcon,
	OptionIcon,
	PriceIcon,
	TruckIcon,
	UpArrowLine,
	WeightIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"
import { jobStatusCountState } from "../../../store/atoms/carrierProfileState"
import { resourceStatusCount } from "../../../components/utilities/helper"
import { getMyJob } from "../../../components/utilities/apis"
import { JobDocument } from '../../../entities/interface/job'
import { BreakpointLG, BreakpointMD } from "../../../components/styles/Breakpoints"
import { tableDataState, jobFiltersState, filterWordState } from "../../../store/atoms/tableState"
import DesktopJobTable from "../../../components/common/DesktopJobTable"
import DesktopHeader from "../../../components/common/DesktopHeader"
import { HeaderTitle, HeaderTitleContainer, PrimaryButton } from "../../../components/styles/GlobalComponents"
import FiltersComponent from "../../../components/common/FiltersComponent"
import { TRUCK_TYPE_LIST } from "../../../data/carrier"
import { PROVINCES } from "../../../data/jobs"

const ProfileStatusContainer = styled.div`
	margin-top: 1.8rem;
`

const BreakpointLGCustom = styled(BreakpointLG)`
	background-color: hsla(228, 24%, 96%);
	width: calc(100% - 7rem);
`

const JobTableContainer = styled.div`
	padding: 3rem;
`

const ShipperProfilePage = () => {
	const shipperInfo = useRecoilValue(userInfoState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{ [key: number]: number }>(jobStatusCountState)
	const setTableData = useSetRecoilState(tableDataState)
	const setFilterWord = useSetRecoilState(filterWordState)
	const [jobFilters, setJobFilters] = useRecoilState(jobFiltersState)

	const filterDate = (filterField: string, targetField: string, value: (Date | boolean)) => {
		const updateFilterDate = {
			...jobFilters,
			[filterField]: {
				...jobFilters[filterField],
				[targetField]: value
			}
		}
		setJobFilters(updateFilterDate)
	}

	const filterList = {
		0: [
			{
				type: "searchbar",
				placeholder: "ค้นหาจังหวัด สินค้า ประเภทรถ ฯลฯ",
				onChange: setFilterWord
			},
			{
				type: "dropdown",
				icon: UpArrowLine,
				label: "ต้นทาง",
				value: jobFilters.pickup_province,
				list: ["ทั้งหมด", ...PROVINCES],
				onChange: (value: string) => setJobFilters({ ...jobFilters, pickup_province: value })
			},
			{
				type: "dropdown",
				icon: DownArrowLine,
				label: "ปลายทาง",
				value: jobFilters.dropoff_province,
				list: ["ทั้งหมด", ...PROVINCES],
				onChange: (value: string) => setJobFilters({ ...jobFilters, dropoff_province: value })
			},
		],
		1: [{
			type: "date",
			name: "pickup_date",
			icon: UpArrowLine,
			label: "วันขึ้นสินค้า",
			value: jobFilters.pickup_date,
			setEnabled: (isEnabled: boolean) => filterDate("pickup_date", "isFilter", isEnabled),
			setStart: (value: Date) => setJobFilters({...jobFilters, pickup_date: {...jobFilters.pickup_date, start: new Date(value.setHours(0, 0, 0, 0))}}),
			setEnd: (value: Date) => setJobFilters({...jobFilters, pickup_date: {...jobFilters.pickup_date, end: new Date(value.setHours(23, 59, 59, 999))}})
		}],
		2: [{
			type: "date",
			name: "dropoff_date",
			icon: DownArrowLine,
			label: "วันลงสินค้า",
			value: jobFilters.dropoff_date,
			setEnabled: (isEnabled: boolean) => filterDate("dropoff_date", "isFilter", isEnabled),
			setStart: (value: Date) => setJobFilters({...jobFilters, dropoff_date: {...jobFilters.dropoff_date, start: new Date(value.setHours(0, 0, 0, 0))}}),
			setEnd: (value: Date) => setJobFilters({...jobFilters, dropoff_date: {...jobFilters.dropoff_date, end: new Date(value.setHours(23, 59, 59, 999))}}), 
		}],
		3: [{
			type: "input",
			inputType: "number",
			icon: WeightIcon,
			value: jobFilters.weight,
			label: "น้ำหนัก ไม่เกิน",
			classifier: "ตัน",
			onChange: (e: ChangeEvent<HTMLInputElement>) => setJobFilters({...jobFilters, weight: e.target.value})
		},
		{
			type: "input",
			inputType: "number",
			icon: PriceIcon,
			label: "ราคา ขั้นต่ำ",
			classifier: "บาท",
			onChange: (e: ChangeEvent<HTMLInputElement>) => setJobFilters({...jobFilters, price: e.target.value})
		}],
		4: [{
			type: "dropdown",
			icon: TruckIcon,
			list: ["ทั้งหมด", ...Object.keys(TRUCK_TYPE_LIST)],
			value: jobFilters.truck.type,
			label: "ประเภทรถ",
			onChange: (value: string) => setJobFilters({...jobFilters, truck: {...jobFilters.truck, type: value}})
		},
		{
			type: "selector",
			icon: OptionIcon,
			list: (jobFilters.truck.type === "ทั้งหมด" ? [] : ["ทั้งหมด", ...TRUCK_TYPE_LIST[jobFilters.truck.type].option]),
			label: "ส่วนเสริม",
			value: jobFilters.truck.option,
			enabled: (jobFilters.truck.type !== "ทั้งหมด"),
			onChange: (option: string) => setJobFilters({...jobFilters, truck: {...jobFilters.truck, option: option}}),
		},
		]
	}

 	// useEffect(() => {
	// 	resourceStatusCount(filteredData, {
	// 		0: 0,
	// 		100: 0,
	// 		800: 0
	// 	}, setJobStatusCount)
	// }, [filteredData])

	const convertJobToTableFormat = (jobs: JobDocument[]) => {
		const jobTableData = []
		jobs.map((job) => {
			const { pickup_location, dropoff_location } = job
			jobTableData.push({
				...job, 
				pickup_location: pickup_location.province,
				dropoff_location: dropoff_location.province,
				truck_type: `${job.carrier_specification.truck.property.type} ${job.carrier_specification.truck.property.option}`
			})
		})
		return jobTableData
	}

	useEffect(() => {
		if (shipperInfo.username) {
			getMyJob((jobs: JobDocument[]) => {
				const jobTableData = convertJobToTableFormat(jobs)
				setTableData(jobTableData)
				resourceStatusCount(jobTableData, jobStatusCount, setJobStatusCount)
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
			<BreakpointLGCustom>
				<DesktopHeader>
					<HeaderTitleContainer>
						<HeaderTitle>รายการงาน</HeaderTitle>
						<PrimaryButton>สร้างงานใหม่</PrimaryButton>
					</HeaderTitleContainer>
					<FiltersComponent filterList={filterList} />
				</DesktopHeader>
				<JobTableContainer>
					<DesktopJobTable />
				</JobTableContainer>
			</BreakpointLGCustom>
		</>
	)
}

export default ShipperProfilePage
