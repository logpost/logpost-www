import React, { useState } from "react"
import { SettingsIcon } from "./Icon"
import Sidebar from "./Sidebar"
import { HeaderTitle, HeaderContainer } from "../styles/GlobalComponents"

const ProfileHeader = (props: {headerTitle: string}) => {
  const { headerTitle } = props
	const [toggleSidebar, setToggleSidebar] = useState(false)

  return (
    <HeaderContainer>
      <Sidebar toggle={toggleSidebar} setToggle={setToggleSidebar}  />
      <button onClick={() => setToggleSidebar(true)}>
        <SettingsIcon />
      </button>
      <HeaderTitle>{headerTitle}</HeaderTitle>
    </HeaderContainer>
  )
}

export default ProfileHeader
