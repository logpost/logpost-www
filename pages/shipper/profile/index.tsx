import React from "react"
import styled from "styled-components"
import {
  JobIcon,
  SuccessIcon,
  TruckIcon,
} from "../../../components/common/Icon"
import NavigationBar from "../../../components/common/NavigationBar"
import ProfileHeader from "../../../components/common/ProfileHeader"
import ProfileStatus from "../../../components/common/ProfileStatus"

const ShipperProfilePage = () => {
  return (
    <div>
      <NavigationBar />
      <ProfileHeader headerTitle="ล็อกโพสต์ จำกัด" />
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
