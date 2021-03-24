import React, { useState } from 'react'
import styled from 'styled-components'
import { SignUpFormInterface } from '../../entities/interface/common'
import InputComponent from './InputComponent'
import { PrimaryButton, Title, Form, FormActions, SecondaryButton, Spinner } from '../styles/GlobalComponents'
import { useRouter } from 'next/router'
import { signup } from '../utilities/apis'
import useAlert from '../../hooks/useAlert'
import Alert from './Alert'
import { GooSpinner } from 'react-spinners-kit'

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

const SideImage = styled.div`
	height: 100%;
	background-image: url('/images/side-cover.png');
	background-position: center center;
	background-size: cover;
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
	const [validField, setValidField] = useState({
		password: true,
		confirm_password: true
	})
	const router = useRouter()
	const { alertStatus, setAlert } = useAlert()
	const [isLoading, setIsLoading] = useState(false)

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setProfile({ ...profile, [e.target.name]: value })
	}

	const handleSignup = async () => {
		const {confirm_password, ...signupData} = profile
		if (profile.account_type === "business") {
			signupData.display_name = signupData.name
		}
		const passwordsAreMatch = (signupData.password !== "" && signupData.password === confirm_password)
		if (passwordsAreMatch) {
			setIsLoading(true)
			const response = await signup(role, signupData)
			setIsLoading(false)
			console.log(response)
			if (response !== 200) {
				setAlert(true, "error", "ชื่อผู้ใช้หรืออีเมลถูกใช้ไปแล้ว")
			} else {
				router.push({
					pathname: '/alert/confirm/email',
					query: { email: profile.email },
				})
			}
		} else {
			const invalidPassword = {
				password: false,
				confirm_password: false
			}
			setAlert(true, "error", "ข้อมูลไม่ถูกต้อง")
			setValidField(invalidPassword)
		}
	}

	return (
		<Form as="div">
			<Alert />
			<SideImage />
			<div>
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
					valid={validField.password}
					description="ความยาวมากกว่า 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9)"
					type="password"
					handleOnChange={handleInputOnChange} />
				<InputComponent
					name="confirm_password"
					value={profile.confirm_password}
					valid={validField.confirm_password}
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
				<FormActions>
					<SecondaryButton
						type="button"
						onClick={() => router.back()}
					>
						ยกเลิก
					</SecondaryButton>
					<PrimaryButton type="button" onClick={handleSignup}>
						{
							isLoading ? <Spinner><GooSpinner size={30} /></Spinner> : `ลงทะเบียน${role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}`
						}
					</PrimaryButton>
				</FormActions>`
			</div>
		</Form>
	)
}

export default SignUpForm