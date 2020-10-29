import React from "react"
import styled from "styled-components"
import {
  JobIcon,
  SuccessIcon,
  TruckIcon,
} from "../../../components/common/Icons"
import NavigationBar from "../../../components/common/NavigationBar"
import Header from "../../../components/common/Header"
import ProfileStatus from "../../../components/common/ProfileStatus"

const ShipperProfilePage = () => {
  return (
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
            icon: <JobIcon />,
            noOfJobs: 2,
          },
          {
            name: "กำลังขนส่ง",
            icon: <TruckIcon />,
          },
          {
            name: "ขนส่งเสร็จสิ้น",
            icon: <SuccessIcon />,
          },
        ]}
      />
    </div>
  )
}

export default ShipperProfilePage
