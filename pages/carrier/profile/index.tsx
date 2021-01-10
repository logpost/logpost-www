import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
	JobIcon,
	JobSuccessIcon,
	TruckIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"
import { useRecoilValue, useRecoilState } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"
import { getCarrierProfile } from "../../../components/utilities/apis"
import { resourceStatusCount } from "../../../components/utilities/helper"
import { driverStatusCountState, truckStatusCountState, jobStatusCountState } from "../../../store/atoms/carrierProfileState"

const ProfileStatusContainer = styled.div`
	margin-top: 1.8rem;
`

const Line = styled.div`
	height: 0.2rem;
	width: 100%;
	background-color: hsl(211, 28%, 90%);
	margin: 1.4rem 0;
`

const CarrierProfilePage = () => {
	const carrierInfo = useRecoilValue(userInfoState)
	const [driverStatusCount, setDriverStatusCount] = useRecoilState<{[key: number]: number}>(driverStatusCountState)
	const [truckStatusCount, setTruckStatusCount] = useRecoilState<{[key: number]: number}>(truckStatusCountState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{[key: number]: number}>(jobStatusCountState)

	useEffect(() => {
		if (carrierInfo.username) {
			getCarrierProfile(carrierInfo.username, (carrierProfile) => {
				resourceStatusCount(carrierProfile.drivers, driverStatusCount, setDriverStatusCount)
				resourceStatusCount(carrierProfile.trucks, truckStatusCount, setTruckStatusCount)
				resourceStatusCount(carrierProfile.job_history, jobStatusCount, setJobStatusCount)
			})
		}
	}, [carrierInfo])

	return (
		<>
			<NavigationBar />
			<Header enabledSetting={true}>
				{carrierInfo.displayName}
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
				<Line />
				<ProfileStatus
					title="รถบรรทุก"
					buttonText="จัดการรถบรรทุก"
					buttonLink="truck/overview"
					type="metric"
					items={[
						{
							name: "จอดว่าง",
							metric: truckStatusCount[100],
						},
						{
							name: "กำลังขนส่ง",
							metric: truckStatusCount[200],
						},
						{
							name: "ไม่รับงาน",
							metric: truckStatusCount[300],
						},
					]}
				/>
				{
				 carrierInfo.accountType === "business" && <>
					<Line />
					<ProfileStatus
						title="พนักงานขับรถ"
						buttonText="จัดการพนักงาน"
						buttonLink="driver/overview"
						type="metric"
						items={[
							{
								name: "ว่าง",
								metric: driverStatusCount[100],
							},
							{
								name: "กำลังขนส่ง",
								metric: driverStatusCount[200],
							},
							{
								name: "ไม่รับงาน",
								metric: driverStatusCount[300],
							},
						]}
					/>
					</>
				}
			</ProfileStatusContainer>
		</>
	)
}

export default CarrierProfilePage
