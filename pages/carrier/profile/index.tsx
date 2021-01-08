import React from "react"
import { useRouter } from "next/router"
import {
	JobIcon,
	JobSuccessIcon,
	TruckIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"
import { useRecoilValue } from 'recoil'
import { userInfoState } from "../../../store/atoms/userInfoState"

const CarrierProfilePage = () => {
	const router = useRouter()
	const userInfo = useRecoilValue(userInfoState)

	return (
		<div>
			<NavigationBar />
			<Header enabledSetting={true}>
				{userInfo.displayName}
      		</Header>
			<ProfileStatus
				title="รายการงาน"
				buttonText="รายการทั้งหมด"
				items={[
					{
						name: "รอผู้รับงาน",
						status: "waiting",
						icon: <JobIcon />,
						noOfJobs: 2,
					},
					{
						name: "กำลังขนส่ง",
						status: "shipping",
						icon: <TruckIcon />,
					},
					{
						name: "ขนส่งเสร็จสิ้น",
						status: "finished",
						icon: <JobSuccessIcon />,
					},
				]}
			/>
		</div>
	)
}

export default CarrierProfilePage
