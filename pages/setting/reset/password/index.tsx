import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Form, FormActions, PrimaryButton, SecondaryButton, Title } from '../../../../components/styles/GlobalComponents'
import InputComponent from '../../../../components/common/Input'

const PasswordSettingPage = () => {
	const router = useRouter()
	const [password, setPassword] = useState({
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: ""
	})

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setPassword({ ...password, [e.target.name]: value })
	}

	const resetPassword = () => {
		console.log(password)
	}

	return (
		<Form>
			<Title>แก้ไขรหัสผ่าน</Title>
			<InputComponent
				name="oldPassword"
				value={password.oldPassword}
				labelTH="รหัสผ่านเดิม"
				labelEN="Old Password"
				type="password"
				handleOnChange={handleInputOnChange} />
			<InputComponent
				name="newPassword"
				value={password.newPassword}
				labelTH="รหัสผ่านใหม่"
				labelEN="New Password"
				description="ความยาวมากกว่า 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9)"
				type="password"
				handleOnChange={handleInputOnChange} />
			<InputComponent
				name="confirmNewPassword"
				value={password.confirmNewPassword}
				labelTH="ยืนยันรหัสผ่าน"
				labelEN="Confirm Password"
				type="password"
				handleOnChange={handleInputOnChange} />
			<FormActions>
				<SecondaryButton
					type="button"
					onClick={() => router.push("/shipper/profile")}
				>
					ยกเลิก
        		</SecondaryButton>
				<PrimaryButton
					type="button"
					onClick={resetPassword}
				>
					แก้ไขรหัสผ่าน
        		</PrimaryButton>
			</FormActions>
		</Form>
	)
}

export default PasswordSettingPage
