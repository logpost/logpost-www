import React from 'react'
import styled from 'styled-components'
import { PersonIcon, HomeIcon, JobIcon } from './Icon'

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
`

const NavBarItem = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
  color: hsl(212, 28%, 28%);
	font-weight: 600;
	font-size: 1rem;
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
	return (
		<NavBarContainer>
			<NavBarItem value="true">
				<HomeIcon />
				งานของฉัน
			</NavBarItem>
			<NavBarItem>
				<JobIcon />
				ค้นหางาน
			</NavBarItem>
			<NavBarItem>
				<PersonIcon />
				บัญชีของฉัน
			</NavBarItem>
		</NavBarContainer>
	)
}

export default NavigationBar
