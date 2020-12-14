import React, { useState } from 'react'
import styled from 'styled-components'
import { SignUpFormInterface } from '../../entities/interface/common'
import InputComponent from './Input'
import { PrimaryButton, Title, Form } from '../styles/GlobalComponents'
import appStore from '../../store/AppStore'
import { useRouter } from 'next/router'
import { view } from '@risingstack/react-easy-state'

const RadioInputContainer = styled.div`
	display: flex;
	margin-top: 1rem;
	width: 100%;
`

const RadioInput = styled.button`
	font-size: 1.6rem;
	width: 50%;
	padding: 1rem 0;
	text-align: center;
	border: solid 0.2rem hsl(212, 28%, 28%);
	${props => props.value === props.name &&
		`
		background-color: hsl(212, 28%, 28%);
		color: white;
	`}

	&:first-child {
		border-top-left-radius: 0.6rem;
		border-bottom-left-radius: 0.6rem;
	}

	&:last-child {
		border-top-right-radius: 0.6rem;
		border-bottom-right-radius: 0.6rem;
	}
`

const SignUpForm = (props: SignUpFormInterface) => {
	const { role } = props
	const [profile, setProfile] = useState({
		account_type: "personal",
		username: "",
		password: "",
		confirm_password: "",
		name: "",
		display_name: "",
		email: ""
	})

	const { signup } = appStore
	const router = useRouter()

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setProfile({ ...profile, [e.target.name]: value })
	}

	const handleSignup = () => {
		signup(role, profile)
		router.push({
			pathname: '/alert/confirm/email',
			query: { email: profile.email },
		})
	}


	return (
		<Form>
			<Title>ลงทะเบียน{role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}</Title>
			<InputComponent labelTH="ประเภทผู้ใช้" labelEN="Account Type" type="other">
				<RadioInputContainer>
					<RadioInput
						type="button"
						value={profile.account_type}
						name="personal"
						onClick={() => setProfile({ ...profile, account_type: "personal" })}>
						บุคคล
								</RadioInput>
					<RadioInput
						type="button"
						value={profile.account_type}
						name="business"
						onClick={() => setProfile({ ...profile, account_type: "business" })}>
						นิติบุคคล
								</RadioInput>
				</RadioInputContainer>
			</InputComponent>
			<InputComponent
				name="username"
				value={profile.username}
				labelTH="ชื่อผู้ใช้"
				labelEN="Username"
				handleOnChange={handleInputOnChange} />
			<InputComponent
				name="password"
				labelTH="รหัสผ่าน"
				labelEN="Password"
				value={profile.password}
				description="ความยาวมากกว่า 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9)"
				type="password"
				handleOnChange={handleInputOnChange} />
			<InputComponent
				name="confirm_password"
				value={profile.confirm_password}
				labelTH="ยืนยันรหัสผ่าน"
				labelEN="Confirm Password"
				type="password"
				handleOnChange={handleInputOnChange} />
			<InputComponent
				name="name"
				value={profile.name}
				labelTH={profile.account_type === "personal" ? "ชื่อจริง - นามสกุล" : "ชื่อบริษัท"}
				labelEN={profile.account_type === "personal" ? "Name" : "Company Name"}
				handleOnChange={handleInputOnChange} />
			{
				profile.account_type === "personal" &&
				<InputComponent
					name="display_name"
					value={profile.display_name}
					labelTH="ชื่อที่แสดง"
					labelEN="Display Name"
					handleOnChange={handleInputOnChange} />
			}
			<InputComponent
				name="email"
				value={profile.email}
				labelTH="อีเมล"
				labelEN="E-mail"
				handleOnChange={handleInputOnChange} />
			<PrimaryButton type="button" onClick={handleSignup/* () => submitForm(profile) */}>ลงทะเบียน{role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}</PrimaryButton>
		</Form>
	)
}

export default SignUpForm