import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PersonIcon, HomeIcon, JobIcon } from './Icons'

const NavBarContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 6.2rem;
  box-shadow: 0 -0.2rem 1.4rem 0 hsla(0, 0%, 0%, 0.1);
  background-color: white;
	z-index: 1;
`

const NavBarItem = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
  color: hsl(212, 28%, 28%);
	font-weight: 600;
	font-size: 1rem;
	width: 7rem;
	${props => props.value && 
	`
		background-color: hsl(212, 29%, 90%);
		border-radius: 0.6rem;
		padding: 0 0.75rem;
	`
	}
	
	svg {
		width: 3.8rem;
		height: 3.8rem;
  }
`

const NavigationBar = () => {
	const router = useRouter()
	const currentPath = router.asPath

	return (
		<NavBarContainer>
			<NavBarItem onClick={() => router.push(`/`)}>
				<HomeIcon />
				หน้าหลัก
			</NavBarItem>
			<NavBarItem onClick={() => router.push(`/jobs`)} value={currentPath === `/jobs` && "true"}>
				<JobIcon />
				ค้นหางาน
			</NavBarItem>
			<NavBarItem onClick={() => router.push(`/shipper/profile`)} value={currentPath === `/shipper/profile` && "true"}>
				<PersonIcon />
				บัญชีของฉัน
			</NavBarItem>
		</NavBarContainer>
	)
}

export default NavigationBar
