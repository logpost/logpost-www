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
`

const StatusItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const StatusItem = styled.div<{type: string}>`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 1.6rem;
	font-weight: 500;
	width: 9.9rem;
	position: relative;
	cursor: ${(props) => props.type === "button" ? "pointer" : "auto"};

	> span {
		height: 6rem;
		width: 6rem;
		font-weight: 600;
		font-size: 3.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	> svg {
		margin-bottom: 0.4rem;
	}
`

const StatusHeader = styled.div`
	font-size: 2.4rem;
	font-weight: 600;
	margin-bottom: 1.4rem;
	display: flex;
	justify-content: space-between;

	> span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 0.6rem;
	}
`

const SeeAllButton = styled.button`
	font-size: 1.8rem;
	text-decoration: none;
	font-weight: 500;
	white-space: nowrap;

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
	const { title, buttonText, buttonLink, items, type } = props
	const router = useRouter()

	const getStatusItems = () => {
		const listOfItems = []
		items.map((item, index) => {
			listOfItems.push(
				<StatusItem type={type} key={index} onClick={type === "button" ? (() => router.push(item.onClickLink)) : undefined}>
					{
						type === "button" ? 
							<>
								{item.noOfJobs !== 0 && 
								<NumberOfJobs>{item.noOfJobs}</NumberOfJobs>}
								{item.icon}
							</>
							: <span>{item.metric}</span>
					}
					{item.name}
				</StatusItem>
			)
		})
		return listOfItems
	}

	return (
		<StatusContainer>
			<StatusHeader>
				<span>{title}</span>
				<SeeAllButton onClick={() => router.push(buttonLink)}>
					{buttonText}
					<RightArrow />
				</SeeAllButton >
			</StatusHeader>
			<StatusItemContainer>{getStatusItems()}</StatusItemContainer>
		</StatusContainer>
	)
}

export default ProfileStatus