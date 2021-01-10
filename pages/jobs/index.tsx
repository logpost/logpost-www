import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import JobCard from "../../components/common/JobCard"
import { FilterIcon, PlusIcon, SearchIcon } from "../../components/common/Icons"
import { PrimaryButton } from "../../components/styles/GlobalComponents"
import NavigationBar from "../../components/common/NavigationBar"
import { getAllJobs } from "../../components/utilities/apis"
import { JobDocument } from "../../entities/interface/job"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { resourceCreatedState } from "../../store/atoms/overviewPageState"
import { alertPropertyState } from "../../store/atoms/alertPropertyState"
import Alert from "../../components/common/Alert"
import { userInfoState } from '../../store/atoms/userInfoState'

const Header = styled.div`
	display: flex;
	position: fixed;
	width: 100%;
	top: 0;
	justify-content: space-between;
	background-color: hsl(212, 28%, 28%);
	padding: 1.6rem 2rem;
	align-items: center;

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

const JobCardContainer = styled.div<{isFloat: boolean}>`
	margin-top: 6rem;
	margin-bottom: ${(props) => props.isFloat ? "6.2rem" : 0};
`

const JobsPage = () => {
	const router = useRouter()
	const [jobs, setJobs] = useState([])
	const userInfo = useRecoilValue(userInfoState)
	const createdStatus = useRecoilValue(resourceCreatedState)
	const setAlertProperty = useSetRecoilState(alertPropertyState)

	useEffect(() => {
		getAllJobs((jobs: JobDocument[]) => setJobs(jobs))
	},[])

	useEffect(() => {
		setAlertProperty({
			type: createdStatus,
			isShow: Boolean(createdStatus)
		})
	}, [createdStatus])

	return (
		<>
			{
				createdStatus &&
				<Alert>
					{createdStatus === "success" ? "สร้างงานสำเร็จ" : "สร้างงานไม่สำเร็จ"}
				</Alert>
			}
			<NavigationBar />
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
					<SearchBar placeholder="ค้นหา" />
				</SearchBarContainer>
				<PrimaryButton>
					<FilterIcon />
					ตัวกรอง
				</PrimaryButton>
			</Header>
			<JobCardContainer isFloat={Boolean(userInfo)}>
				{jobs.map((job, index) => {
					return <JobCard key={index} origin="jobs-page" details={job} />
				})}
			</JobCardContainer>
		</>
	)
}

export default JobsPage
