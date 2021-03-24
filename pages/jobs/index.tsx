import React, { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled, { css } from "styled-components"
import JobCard from "../../components/common/JobCard"
import { DownArrowLine, FilterIcon, JobNotFound, OptionIcon, PlusIcon, PriceIcon, SearchIcon, TruckIcon, UpArrowLine, WeightIcon } from "../../components/common/Icons"
import { HeaderTitle, PrimaryButton, HeaderTitleContainer, Spinner } from "../../components/styles/GlobalComponents"
import NavigationBar from "../../components/common/NavigationBar"
import { getAllJobs } from "../../components/utilities/apis"
import { CountProvinceInterface, JobDocument } from "../../entities/interface/job"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { alertPropertyState } from "../../store/atoms/alertPropertyState"
import Alert from "../../components/common/Alert"
import { userInfoState } from '../../store/atoms/userInfoState'
import { BreakpointLG, BreakpointMD } from "../../components/styles/Breakpoints"
import DesktopHeader from "../../components/common/DesktopHeader"
import FiltersComponent from "../../components/common/FiltersComponent"
import { filterWordState, jobFiltersState, filterState } from "../../store/atoms/tableState"
import { TRUCK_TYPE_LIST } from "../../data/carrier"
import { PROVINCES, PROVINCES_OBJECT } from "../../data/jobs"
import { countJobInProvinceState } from "../../store/atoms/jobDocumentState"
import ThailandMap from "../../components/common/ThailandMap"
import breakpointGenerator from "../../components/utilities/breakpoint"
import { GooSpinner } from "react-spinners-kit"

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

	& ~ ${Spinner} {
		margin-top: 20rem;
	}

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
	height: fit-content;

	${breakpointGenerator({
		large: css`
			margin: 2rem 0;
			display: grid;
			grid-gap: 2.5rem;
			padding: 1rem 4rem 0 2rem;
			max-height: 66rem;
			overflow-y: scroll;
		`
	})}
`

const FiltersContainer = styled.div<FilterContainerInterface>`
	background: white;
	padding: 0 1.6rem 1.6rem;
	margin: ${props => props.expand ? "6.4rem 0 0" : 0};
	height: ${props => props.expand ? "auto" : 0};
	overflow: hidden;
	box-shadow: 0px -2px 14px rgba(0, 0, 0, 0.1);
`

const AllJobContainer = styled.div`
	background: hsl(228, 24%, 96%);
`

const ContentContainer = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: 45rem 1fr;

	> ${Spinner} {
		align-items: center;
	}
`

const BreakpointLGCustom = styled(BreakpointLG)`
	width: calc(100% - 7rem);
`

const NotFoundContainer = styled.div`
	font-size: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 80vh;

	> span {
		margin-top: 3rem;
	}
`

const JobsPage = () => {
	const router = useRouter()
	const [jobs, setJobs] = useRecoilState(filterState)
	const [showMoreFilter, setShowMoreFilter] = useState(false)
	const userInfo = useRecoilValue(userInfoState)
	const alertStatus = useRecoilValue(alertPropertyState)
	const setFilterWord = useSetRecoilState(filterWordState)
	const [jobFilters, setJobFilters] = useRecoilState(jobFiltersState)
	const setCountJobInProvince = useSetRecoilState(countJobInProvinceState)
	const [isLoading, setIsLoading] = useState(true)

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
		const countPickupProvince = {...PROVINCES_OBJECT}
		const countDropoffProvince = {...PROVINCES_OBJECT}
		jobs.map((job) => {
			const { pickup_location, dropoff_location } = job
			countPickupProvince[pickup_location.province] += 1
			countDropoffProvince[dropoff_location.province] += 1
			jobTableData.push({
				...job, 
				pickup_location: pickup_location.province,
				dropoff_location: dropoff_location.province,
				truck_type: `${job.carrier_specification.truck.property.type} ${job.carrier_specification.truck.property.option}`
			})
		})
		return [jobTableData, countPickupProvince, countDropoffProvince]
	}

	useEffect(() => {
		const countPickupProvince = {...PROVINCES_OBJECT}
		const countDropoffProvince = {...PROVINCES_OBJECT}
		jobs.map((job) => {
			const { pickup_location, dropoff_location } = job
			countPickupProvince[pickup_location] += 1
			countDropoffProvince[dropoff_location] += 1
		})
		setCountJobInProvince({
			pickup: countPickupProvince,
			dropoff: countDropoffProvince
		})
	}, [jobFilters.pickup_province, jobFilters.dropoff_province])

	useEffect(() => {
		setIsLoading(true)
		getAllJobs((jobs: JobDocument[]) => {
			setIsLoading(false)
			const [jobCardData, countPickupProvince, countDropoffProvince] = convertJobToCardFormat(jobs)
			setJobs(jobCardData as JobDocument[])
			setCountJobInProvince({
				pickup: countPickupProvince as CountProvinceInterface,
				dropoff: countDropoffProvince as CountProvinceInterface
			})
		})
	},[])

	return (
		<>
			<Alert />
			<NavigationBar activeIndex={1} />
			<BreakpointMD>
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
				{
					isLoading ? <Spinner><GooSpinner size={120} /></Spinner> :
					<JobCardContainer isFloat={Boolean(userInfo)} expand={showMoreFilter}>
						{
							jobs.length > 0 ? 
							jobs.map((job, index) => {
								return <JobCard key={index} origin="jobs-page" details={job} />
							}) : 
							<NotFoundContainer>
								<JobNotFound />
								<span>ไม่พบงานที่คุณค้นหา</span>
							</NotFoundContainer>
						}
					</JobCardContainer>	
				}
			</BreakpointMD>
			<BreakpointLGCustom>
				<AllJobContainer>
					<DesktopHeader>
						<HeaderTitleContainer>
							<HeaderTitle>
								งานทั้งหมด
							</HeaderTitle>
							{
								userInfo?.role === "shipper" && 
								<PrimaryButton onClick={() => router.push("/jobs/add/1")}>สร้างงานใหม่</PrimaryButton>
							}
						</HeaderTitleContainer>
						<FiltersComponent 
							filterList={{
								...filterList,
								0: [{
									type: "searchbar",
									placeholder: "ค้นหาจังหวัด สินค้า ประเภทรถ ฯลฯ",
									onChange: setFilterWord
								}, ...filterList[0]]
							}} 
						/>
					</DesktopHeader>
					<ContentContainer>
						<ThailandMap
							provinceFilter={{
								pickup: jobFilters.pickup_province,
								dropoff: jobFilters.dropoff_province
							}} 
							setProvinceFilter={(value: {
								pickup: string,
								dropoff: string
							}) => setJobFilters({...jobFilters, 
								pickup_province: value.pickup,
								dropoff_province: value.dropoff
							})}
						/>
						{
							isLoading ? <Spinner><GooSpinner size={120} /></Spinner>
							: <JobCardContainer isFloat={Boolean(userInfo)} expand={showMoreFilter}>
								{
									jobs.length > 0 ?
										jobs.map((job, index) => {
											return <JobCard key={index} origin="jobs-page" details={job} />
										}) :
									<NotFoundContainer>
										<JobNotFound />
										<span>ไม่พบงานที่คุณค้นหา</span>
									</NotFoundContainer>	
								}
							</JobCardContainer>
						}
					</ContentContainer>
				</AllJobContainer>
			</BreakpointLGCustom>
		</>
	)
}

export default JobsPage
