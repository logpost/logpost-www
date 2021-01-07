import React, { useState, useEffect } from "react"
import styled from "styled-components"
import InputComponent from "../../components/common/InputComponent"
import { useRouter } from "next/router"
import {
	Background,
	PrimaryButton,
	Title,
	TextButton,
} from "../../components/styles/GlobalComponents"
import { login } from "../../components/utilities/apis"

const LoginContainer = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	display: flex;
    flex-direction: column;
`

const InputContainer = styled.form`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 2.4rem;
	font-weight: 500;
	padding: 3rem 5.45rem;
	background-color: white;

	> div:not(:last-child) {
		margin-bottom: 2.4rem;
	}
`

const PrimaryButtonCustom = styled(PrimaryButton)`
	font-size: 2.4rem;
	background-color: hsl(212, 28%, 28%);
	font-weight: 500;
	align-self: center;
`

const SignUpContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 2.6rem 0;
	font-size: 2rem;
	color: hsl(217, 16%, 16%);

	> button {
		margin-top: 0.6rem;
	}
`

const RadioInput = styled.button`
	font-size: 2rem;
	font-weight: 700;
	width: 50%;
	padding: 1.4rem 0;
	text-align: center;
	background-color: hsl(16, 56%, 51%);
	color: white;
	${(props) =>
		props.value === props.name &&
		`
		background-color: white;
		color: hsl(16, 56%, 51%);
	`}

	&:last-child {
		border-top-right-radius: 3.6rem;
	}

	&:first-child {
		border-top-left-radius: 3.6rem;
	}
`

const TitleContainer = styled.div`
	color: hsl(16, 56%, 51%);
	font-size: 2.4rem;
	font-weight: 600;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 5.5%;
	left: 7.5%;

	div {
		margin-bottom: 1rem;
	}
`

const LoginPage = () => {
	const router = useRouter()
	const [role, setRole] = useState("shipper")
	const [auth, setAuth] = useState({
		username: "",
		password: "",
	})

	useEffect(() => {
		// if login page has params -> user failed to confirm email (token expired or invalid)
		// if token invalid -> alert : invalid please login to resend confirm email
		// if token expired -> alert : expired please login to resend confirm email
	}, [])

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setAuth({ ...auth, [e.target.name]: value })
	}

	const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login(role, auth)
		router.push('/jobs')
	}

	return (
		<Background>
			<TitleContainer>
				<Title>เข้าสู่ระบบ</Title>
				{role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}
			</TitleContainer>
			<LoginContainer>
				<div>
					<RadioInput
						type="button"
						value={role}
						name="shipper"
						onClick={() => setRole("shipper")}
					>
						ผู้ส่ง
					</RadioInput>
					<RadioInput
						type="button"
						value={role}
						name="carrier"
						onClick={() => setRole("carrier")}
					>
						ขนส่ง
					</RadioInput>
				</div>
				<InputContainer onSubmit={handleLogin}>
					<InputComponent
						labelSize="large"
						labelTH="ชื่อผู้ใช้"
						labelEN="Username"
						name="username"
						required={false}
						value={auth.username}
						handleOnChange={handleInputOnChange}
					/>
					<InputComponent
						type="password"
						labelSize="large"
						labelTH="รหัสผ่าน"
						labelEN="Password"
						name="password"
						required={false}
						value={auth.password}
						handleOnChange={handleInputOnChange}
					/>
					<PrimaryButtonCustom type="submit">เข้าสู่ระบบ</PrimaryButtonCustom>
					<SignUpContainer>
						ยังไม่ได้ลงทะเบียน?
						<TextButton onClick={() => router.push(`/signup/${role}`)}>
							ลงทะเบียน{role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}
						</TextButton>
					</SignUpContainer>
				</InputContainer>
			</LoginContainer>
		</Background>
	)
}

export default LoginPage
