import React from "react"
import styled from "styled-components"
import {
  HeaderTitle,
  HeaderContainer,
  SecondaryButton,
} from "../styles/GlobalComponents"
import { CancelIcon } from "./Icon"
import { useRouter } from 'next/router'

interface SidebarContainerProps {
  toggle: boolean
}

interface SidebarProps {
	toggle: boolean 
	setToggle: (toggle: boolean) => void
}

const SidebarContainer = styled.div<SidebarContainerProps>`
  display: ${(props) => (props.toggle ? "block" : "none")};
` 

const Backdrop = styled.div`
  background-color: hsla(211, 27%, 15%, 0.8);
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
`

const SidebarContent = styled.div`
  background-color: white;
  width: 24rem;
  height: 100vh;
  position: fixed;
	top: 0;
  right: 0;
  z-index: 1;
`

const SidebarItem = styled.div`
  font-size: 2rem;
  color: hsl(212, 28%, 28%);
  font-weight: 500;
  margin-top: 2.8rem;
  margin-left: 2rem;

  &:first-child {
    margin-top: 2.5rem;
  }
`

const SecondaryButtonCustom = styled(SecondaryButton)`
  font-size: 2rem;
  padding: 0.8rem 1.8rem;
  width: fit-content;
  position: absolute;
  right: 1.8rem;
  bottom: 1.8rem;
`

const Sidebar = (props: SidebarProps) => {
  const router = useRouter()

  return (
		<SidebarContainer toggle={props.toggle}>
    	<Backdrop onClick={() => props.setToggle(false)} />
      <SidebarContent>
        <HeaderContainer>
          <button onClick={() => props.setToggle(false)}>
            <CancelIcon />
          </button>
          <HeaderTitle>การตั้งค่า</HeaderTitle>
        </HeaderContainer>
        <SidebarItem onClick={() => router.push("/setting/profile")}>ข้อมูลส่วนตัว</SidebarItem>
        <SidebarItem onClick={() => router.push("/setting/reset/password")}>แก้ไขรหัสผ่าน</SidebarItem>
        <SidebarItem onClick={() => router.push("/setting/reset/email")}>แก้ไขอีเมล</SidebarItem>
        <SecondaryButtonCustom>ออกจากระบบ</SecondaryButtonCustom>
      </SidebarContent>
		</SidebarContainer>
  )
}

export default Sidebar