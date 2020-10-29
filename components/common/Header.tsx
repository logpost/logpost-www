import React, { useState, FunctionComponent } from "react"
import { SettingsIcon } from "./Icons"
import Sidebar from "./Sidebar"
import { HeaderTitle, HeaderContainer } from "../styles/GlobalComponents"

interface HeaderInterface {
  enabledSetting?: boolean
}

const Header:FunctionComponent<HeaderInterface> = (props) => {
  const { enabledSetting, children } = props
  const [toggleSidebar, setToggleSidebar] = useState(false)

  return (
    <HeaderContainer>
      {enabledSetting && (
        <>
          <Sidebar toggle={toggleSidebar} setToggle={setToggleSidebar} />
          <button onClick={() => setToggleSidebar(true)}>
            <SettingsIcon />
          </button>
        </>
      )}
      <HeaderTitle>{children}</HeaderTitle>
    </HeaderContainer>
  )
}

export default Header
