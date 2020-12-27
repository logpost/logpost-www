import React, { useEffect } from "react"
// import axios from 'axios'
import styled from "styled-components"
import { EmailConfirmation } from "../../../../components/common/Icons"
import { useRouter } from "next/router"
import { SecondaryButton } from "../../../../components/styles/GlobalComponents"

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5rem;
`

const Title = styled.div`
	font-size: 2.6rem;
	font-weight: 700;
	color: hsl(212, 28%, 28%);
`

const Detail = styled.div`
	font-size: 1.8rem;
	font-weight: 500;
	color: hsl(212, 28%, 28%);

	&:not(:first-child) {
		margin-top: 1.8rem;
	}
`

const EmailConfirmationContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5rem;

	> button {
		margin-top: 13.6rem;
	}
`

const EmailConfirmationPage = () => {
	const router = useRouter()
	// useEffect(() => {
	//	 axios.post(`http://localhost:5000/account/email/confirm/consume?token_email=${}`)
	// })
	return (
		<EmailConfirmationContainer>
			<EmailConfirmation />
			<DetailContainer>
				<Title>กรุณายืนยันอีเมล</Title>
				<Detail>คลิกลิงก์ที่เราส่งไปทางอีเมล</Detail>
				<Detail>{router.query.email}</Detail>
			</DetailContainer>
			<SecondaryButton>ส่งอีเมลอีกครั้ง</SecondaryButton>
		</EmailConfirmationContainer>
	)
}

export default EmailConfirmationPage
