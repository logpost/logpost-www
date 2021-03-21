import React, { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import JobCard from "../../components/common/JobCard"
import { DownArrowLine, FilterIcon, OptionIcon, PlusIcon, PriceIcon, SearchIcon, TruckIcon, UpArrowLine, WeightIcon } from "../../components/common/Icons"
import { FilterContainer, HeaderTitle, PrimaryButton } from "../../components/styles/GlobalComponents"
import NavigationBar from "../../components/common/NavigationBar"
import { getAllJobs } from "../../components/utilities/apis"
import { JobDocument } from "../../entities/interface/job"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { alertPropertyState } from "../../store/atoms/alertPropertyState"
import Alert from "../../components/common/Alert"
import { userInfoState } from '../../store/atoms/userInfoState'
import { BreakpointLG } from "../../components/styles/Breakpoints"
import DesktopHeader from "../../components/common/DesktopHeader"
import FiltersComponent from "../../components/common/FiltersComponent"
import { filterWordState, jobFiltersState, filterState } from "../../store/atoms/tableState"
import { TRUCK_TYPE_LIST } from "../../data/carrier"
import { PROVINCES } from "../../data/jobs"
import SelectComponent from "../../components/common/SelectComponent"

interface FilterContainerInterface {
	expand: boolean
}

interface JobCardContainerInterface {
	expand: boolean
	isFloat: boolean
}

const Header = styled.div`
	display: flex;
	position: fixed;
	width: 100%;
	top: 0;
	justify-content: space-between;
	background-color: hsl(212, 28%, 28%);
	padding: 1.6rem 2rem;
	align-items: center;
	z-index: 1;

	${PrimaryButton} {
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0.45rem 1.2rem;
		display: flex;
		height: fit-content;
		margin-left: 2rem;

		svg {
			margin-right: 0.6rem;
		}
	}
`

const SearchBarContainer = styled.div`
	display: flex;
	border-radius: 3.3rem;
	align-items: center;
	padding: 0.4rem 1rem;
	background: white;
	width: 70%;
`

const SearchBar = styled.input`
	padding: 0 0.8rem;
	font-size: 1.6rem;
	border: 0;
	border-radius: 3.3rem;
	width: 100%;

	::placeholder {
		color: hsl(0, 0%, 66%);
	}
`

const AddJob = styled.button`
	padding: 1rem 2rem;
	background-color: hsl(16, 56%, 51%);
	position: fixed;
	z-index: 1;
	left: 50%;
	transform: translateX(-50%);
	bottom: 8rem;
	border-radius: 4rem;
	box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.3);
	font-size: 1.8rem;
	font-weight: 600;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		margin-right: 1rem;
		height: 2.2rem;
		width: 2.2rem;

		path {
			fill: white;
		}
	}
`

const JobCardContainer = styled.div<JobCardContainerInterface>`
	margin-top: ${props => props.expand ? 0 : "6rem"};
	margin-bottom: ${(props) => props.isFloat ? "6.2rem" : 0};
`

const FiltersContainer = styled.div<FilterContainerInterface>`
	background: white;
	padding: 0 1.6rem 1.6rem;
	margin: ${props => props.expand ? "6.4rem 0 0" : 0};
	height: ${props => props.expand ? "auto" : 0};
	overflow: hidden;
	box-shadow: 0px -2px 14px rgba(0, 0, 0, 0.1);
`

const JobsPage = () => {
	const router = useRouter()
	const [jobs, setJobs] = useRecoilState(filterState)
	const [showMoreFilter, setShowMoreFilter] = useState(false)
	const userInfo = useRecoilValue(userInfoState)
	const alertStatus = useRecoilValue(alertPropertyState)
	const setFilterWord = useSetRecoilState(filterWordState)
	const [jobFilters, setJobFilters] = useRecoilState(jobFiltersState)


	const filterList = {
		0: [
			{
				type: "dropdown",
				icon: UpArrowLine,
				label: "ต้นทาง",
				value: jobFilters.pickup_province,
				list: ["ทั้งหมด", ...PROVINCES],
				onChange: (value: string) => setJobFilters({ ...jobFilters, pickup_province: value })
			},
		],
		1: [
			{
				type: "dropdown",
				icon: DownArrowLine,
				label: "ปลายทาง",
				value: jobFilters.dropoff_province,
				list: ["ทั้งหมด", ...PROVINCES],
				onChange: (value: string) => setJobFilters({ ...jobFilters, dropoff_province: value })
			},
		],
		2: [
		{
			type: "date",
			name: "pickup_date",
			icon: UpArrowLine,
			label: "วันขึ้นสินค้า",
			value: jobFilters.pickup_date,
			setEnabled: (isEnabled: boolean) => filterDate("pickup_date", "isFilter", isEnabled),
			setStart: (value: Date) => setJobFilters({...jobFilters, pickup_date: {...jobFilters.pickup_date, start: new Date(value.setHours(0, 0, 0, 0))}}),
			setEnd: (value: Date) => setJobFilters({...jobFilters, pickup_date: {...jobFilters.pickup_date, end: new Date(value.setHours(23, 59, 59, 999))}})
		}],
		3: [{
			type: "date",
			name: "dropoff_date",
			icon: DownArrowLine,
			label: "วันลงสินค้า",
			value: jobFilters.dropoff_date,
			setEnabled: (isEnabled: boolean) => filterDate("dropoff_date", "isFilter", isEnabled),
			setStart: (value: Date) => setJobFilters({...jobFilters, dropoff_date: {...jobFilters.dropoff_date, start: new Date(value.setHours(0, 0, 0, 0))}}),
			setEnd: (value: Date) => setJobFilters({...jobFilters, dropoff_date: {...jobFilters.dropoff_date, end: new Date(value.setHours(23, 59, 59, 999))}}), 
		}],
		4: [{
			type: "input",
			inputType: "number",
			icon: WeightIcon,
			value: jobFilters.weight,
			label: "น้ำหนัก ไม่เกิน",
			classifier: "ตัน",
			onChange: (e: ChangeEvent<HTMLInputElement>) => setJobFilters({...jobFilters, weight: e.target.value})
		}],
		5: [{
			type: "input",
			inputType: "number",
			icon: PriceIcon,
			label: "ราคา ขั้นต่ำ",
			classifier: "บาท",
			onChange: (e: ChangeEvent<HTMLInputElement>) => setJobFilters({...jobFilters, price: e.target.value})
		}],
		6: [{
			type: "dropdown",
			icon: TruckIcon,
			list: ["ทั้งหมด", ...Object.keys(TRUCK_TYPE_LIST)],
			value: jobFilters.truck.type,
			label: "ประเภทรถ",
			onChange: (value: string) => setJobFilters({...jobFilters, truck: {...jobFilters.truck, type: value}})
		}],
		7: [{
			type: "selector",
			icon: OptionIcon,
			list: (jobFilters.truck.type === "ทั้งหมด" ? [] : ["ทั้งหมด", ...TRUCK_TYPE_LIST[jobFilters.truck.type].option]),
			label: "ส่วนเสริม",
			value: jobFilters.truck.option,
			enabled: (jobFilters.truck.type !== "ทั้งหมด"),
			onChange: (option: string) => setJobFilters({...jobFilters, truck: {...jobFilters.truck, option: option}}),
		}]
	}

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

	const convertJobToCardFormat = (jobs: JobDocument[]) => {
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
		getAllJobs((jobs: JobDocument[]) => {
			const jobCardData = convertJobToCardFormat(jobs)
			setJobs(jobCardData)
		})
	},[])

	return (
		<>
			<Alert>
				{alertStatus.type === "success" ? "เพิ่มงานสำเร็จ" : "เพิ่มงานสำเร็จ"}
			</Alert>
			<NavigationBar activeIndex={1} />
			{
				userInfo?.role === "shipper" && 
					<AddJob onClick={() => router.push("/jobs/add/1")}>
						<PlusIcon />
						สร้างงานใหม่
					</AddJob>
			}
			<Header>
				<SearchBarContainer>
					<SearchIcon />
					<SearchBar 
						onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterWord(e.target.value)} 
						placeholder="ค้นหา" 
					/>
				</SearchBarContainer>
				<PrimaryButton onClick={() => setShowMoreFilter(!showMoreFilter)}>
					<FilterIcon />
					ตัวกรอง
				</PrimaryButton>
			</Header>
			{
				showMoreFilter &&
				<FiltersContainer expand={showMoreFilter}>
					<FiltersComponent filterList={filterList} alwaysExpand={true} />
				</FiltersContainer>
			}
			{/* <BreakpointLG>
                <DesktopHeader>
                    <HeaderTitle>
                        งานทั้งหมด
                    </HeaderTitle>
				</DesktopHeader>
            </BreakpointLG> */}
			<JobCardContainer isFloat={Boolean(userInfo)} expand={showMoreFilter}>
				{jobs.map((job, index) => {
					return <JobCard key={index} origin="jobs-page" details={job} />
				})}
			</JobCardContainer>
		</>
	)
}

export default JobsPage
