import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactElement } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { TRUCK_TYPE_LIST } from '../../data/carrier'
import { JOB_STATUS_CODE, PROVINCES } from '../../data/jobs'
import { JobDetails, JobDocument } from '../../entities/interface/job'
import { filterState, filterWordState, jobFiltersState } from '../../store/atoms/tableState'
import { HeaderTitle, HeaderTitleContainer, PrimaryButton, TableRowActions } from '../styles/GlobalComponents'
import { dateFormatter, timeFormatter } from '../utilities/helper'
import DesktopHeader from './DesktopHeader'
import DesktopTable from './DesktopTable'
import FiltersComponent from './FiltersComponent'
import { CancelIcon, DownArrowLine, EditIcon, OptionIcon, PriceIcon, TruckIcon, UpArrowLine, WeightIcon } from './Icons'

const JobTableContainer = styled.div`
	min-height: 80vh;
	padding: 3rem;
`

interface JobDesktopTableInterface {
    role: string
}

const JobDesktopTable = (props: JobDesktopTableInterface) => {
    const { role } = props
    const router = useRouter()
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
			format: (_: number, job: JobDetails): ReactElement => (
				<span>{`${dateFormatter(job.pickup_date)} ${timeFormatter(job.pickup_date)}`.slice(0, -3)}</span>
			)
		},
		{
			id: "dropoff_date",
			label: "วันลงสินค้า",
			width: "14%",
			align: "left",
			format: (_: number, job: JobDetails): ReactElement => (
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
			format: (_: number, job: JobDetails): ReactElement => (
				<span>{`${job.weight} ตัน`}</span>
			)
		},
		{
			id: "offer_price",
			label: "ราคา",
			width: "8%",
			align: "left",
			format: (_: number, job: JobDetails): ReactElement => (
				<span>{job.offer_price?.toLocaleString()}</span>
			)
		},
		{
			id: "truck_type",
			label: "ประเภทรถ",
			width: "12%",
			align: "left",
		},
		{
			id: "status",
			label: "สถานะ",
			width: "8%",
			align: "left",
			format: (_: number, job): ReactElement => (
				<span>{JOB_STATUS_CODE[job.status]?.status_name}</span>
			)
		},
		{
			id: "actions",
			label: "เลือก",
			width: "8%",
			sortable: false,
			align: "center",
			format: (_: number, job): ReactElement => (
				<TableRowActions>
					<button onClick={() => router.push(`/jobs/edit/${job.job_id}`)}><EditIcon /></button>
					<button ><CancelIcon /></button>
				</TableRowActions>
			),
		},
	]

    return (
        <>
            <DesktopHeader>
                <HeaderTitleContainer>
                    <HeaderTitle>รายการงาน</HeaderTitle>
                    <PrimaryButton onClick={() => router.push("/jobs/add/1")}>{role === "shipper" ? "สร้างงานใหม่" : "ค้นหางาน"}</PrimaryButton>
                </HeaderTitleContainer>
                <FiltersComponent filterList={filterList} />
            </DesktopHeader>
            <JobTableContainer>
                <DesktopTable
                    tabsList={[
                        {
                            code: [0],
                            title: "ทุกสถานะ",
                        },
                        {
                            code: [100],
                            title: `${role === "shipper" ? "รอผู้รับงาน" : "รอการขนส่ง"}`,
                        },
                        {
                            code: [200, 300, 400, 500, 600, 700],
                            title: "กำลังขนส่ง",
                        },
                        {
                            code: [800],
                            title: "ขนส่งเสร็จสิ้น",
                        },
                    ]}
                    columns={jobColumns}
                    filterSelector={filterState}
                    filterState={jobFiltersState}
					handleClickRow={(selectRow) => router.push(`/jobs/details/${(selectRow as JobDocument).job_id}`)}
                />
            </JobTableContainer>
        </>
    )
}

export default JobDesktopTable
