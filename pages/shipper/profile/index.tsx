import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import {
  JobIcon,
  SuccessIcon,
  TruckIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"

import appStore from '../../../store/AppStore'
import { view } from '@risingstack/react-easy-state'

const ShipperProfilePage = () => {
  const router = useRouter()
  const { isAuth } = appStore

  return isAuth && (
    <div>
      <NavigationBar />
      <Header enabledSetting={true}>
        ล็อกโพสต์ จำกัด
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
            icon: <SuccessIcon />,
          },
        ]}
      />
    </div>
  )
}

export default view(ShipperProfilePage)
