import React, { useEffect } from "react"
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
import { jobStatusCountState } from "../../../store/atoms/carrierProfileState"
import { resourceStatusCount } from "../../../components/utilities/helper"
import { getShipperProfile } from "../../../components/utilities/apis"

const ProfileStatusContainer = styled.div`
	margin-top: 1.8rem;
`

const ShipperProfilePage = () => {
	const shipperInfo = useRecoilValue(userInfoState)
	const [jobStatusCount, setJobStatusCount] = useRecoilState<{[key: number]: number}>(jobStatusCountState)

	useEffect(() => {
		if (shipperInfo.username) {
			getShipperProfile(shipperInfo.username, (shipperProfile) => {
				resourceStatusCount(shipperProfile.job_history, jobStatusCount, setJobStatusCount)
			})
		}
	}, [shipperInfo])

	return (
		<>
			<NavigationBar />
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
		</>
	)
}

export default ShipperProfilePage
