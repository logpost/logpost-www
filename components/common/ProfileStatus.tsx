import React from "react"
import styled from "styled-components"
import { RightArrow } from "./Icons"
import { ProfileJobStatusInterface } from "../../entities/interface/common"
import { useRouter } from 'next/router'

const StatusContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: hsl(217, 16%, 16%);
	padding: 0 1.9rem;
	margin-top: 1.8rem;
`

const StatusItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const StatusItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 1.6rem;
	font-weight: 500;
	width: 9.9rem;
	position: relative;

	svg {
		margin-bottom: 0.4rem;
	}
`

const StatusHeader = styled.div`
	font-size: 2.4rem;
	font-weight: 600;
	margin-bottom: 1.8rem;
	display: flex;
	justify-content: space-between;
`

const SeeAllButton = styled.button`
	font-size: 1.8rem;
	text-decoration: none;
	font-weight: 500;

	svg {
		margin-left: 0.8rem;
	}
`

const NumberOfJobs = styled.div`
	border-radius: 100%;
	background-color: hsl(16, 56%, 51%);
	color: white;
	font-size: 1.2rem;
	text-align: center;
	position: absolute;
	left: 55%;
	width: 2.1rem;
	height: 2.1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`

const ProfileStatus = (props: ProfileJobStatusInterface) => {
	const { title, buttonText, items } = props
	const router = useRouter()

	const statusItems = () => {
		const listOfItems = []
		items.map((item, index) => {
			listOfItems.push(
				<StatusItem key={index} onClick={() => router.push(`jobs?status=${item.status}`)}>
					{item.noOfJobs && <NumberOfJobs>{item.noOfJobs}</NumberOfJobs>}
					{item.icon}
					{item.name}
				</StatusItem>
			)
		})
		return listOfItems
	}

	return (
		<StatusContainer>
			<StatusHeader>
				{title}
				<SeeAllButton onClick={() => router.push(`jobs?status=all`)}>
					{buttonText}
					<RightArrow />
				</SeeAllButton >
			</StatusHeader>
			<StatusItemContainer>{statusItems()}</StatusItemContainer>
		</StatusContainer>
	)
}

export default ProfileStatus