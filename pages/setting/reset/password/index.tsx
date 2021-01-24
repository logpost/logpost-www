import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Form, FormActions, PrimaryButton, SecondaryButton, Title } from '../../../../components/styles/GlobalComponents'
import InputComponent from '../../../../components/common/InputComponent'
import { changePassword } from '../../../../components/utilities/apis'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../../../store/atoms/userInfoState'

const PasswordSettingPage = () => {
	const router = useRouter()
	const userInfo = useRecoilValue(userInfoState)
	const [password, setPassword] = useState({
		old_password: "",
		password: "",
		confirm_password: ""
	})
	const [validField, setValidField] = useState({
		old_password: true,
		password: true,
		confirm_password: true
	})

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setPassword({ ...password, [e.target.name]: value })
	}

	const resetPassword = async () => {
		const { confirm_password, ...newPassword } = password
		const passwordsAreMatch = (password.password === confirm_password)
		if (passwordsAreMatch) {
			const res = await changePassword(newPassword)
			if (res === 200) {
				router.push(`/${userInfo.role}/profile`)
			}
			else {
				setValidField({
					password: true,
					confirm_password: true,
					old_password: false
				})
			}
		} else {
			const invalidPassword = {
				old_password: true,
				password: false,
				confirm_password: false
			}
			setValidField(invalidPassword)
		}
	}

	return (
		<Form>
			<Title>แก้ไขรหัสผ่าน</Title>
			<InputComponent
				name="old_password"
				value={password.old_password}
				valid={validField.old_password}
				invalidText="รหัสผ่านไม่ถูกต้อง"
				labelTH="รหัสผ่านเดิม"
				labelEN="Old Password"
				type="password"
				handleOnChange={handleInputOnChange} />
			<InputComponent
				name="password"
				value={password.password}
				valid={validField.password}
				labelTH="รหัสผ่านใหม่"
				labelEN="New Password"
				description="ความยาวมากกว่า 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9)"
				type="password"
				handleOnChange={handleInputOnChange} />
			<InputComponent
				name="confirm_password"
				value={password.confirm_password}
				valid={validField.confirm_password}
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
