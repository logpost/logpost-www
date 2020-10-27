import React from 'react'
import styled from 'styled-components'
import { ProfileHeaderInterface } from '../../entities/interface/common'
import { SettingsIcon } from './Icon'

const HeaderContainer = styled.div`
	background-color: hsl(212, 28%, 28%);
	padding: 1.6rem 2rem; 
	display: flex;
	flex-direction: column;

	svg {
		align-self: flex-end;
	}
`

const DisplayName = styled.div`
	font-size: 2.4rem;
	font-weight: 500;
	color: white;
`

const ProfileHeader = (props:ProfileHeaderInterface) => {
	const { displayName } = props

	return (
		<HeaderContainer>
			<SettingsIcon />
			<DisplayName>
				{displayName}
			</DisplayName>
		</HeaderContainer>
	)
}

export default ProfileHeader
