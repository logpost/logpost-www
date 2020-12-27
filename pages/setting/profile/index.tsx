import React, { useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import InputComponent from "../../../components/common/InputComponent"
import {
	Form,
	PrimaryButton,
	SecondaryButton,
	TextButton,
	Title,
	FormActions
} from "../../../components/styles/GlobalComponents"

const account_type = "personal" // MOCK

const ProfileSettingPage = () => {
	const router = useRouter()
	const [profile, setProfile] = useState({
		username: "",
		tel: "",
		address: "",
		name: "",
		display_name: "",
		juristic_id: "",
	})

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setProfile({ ...profile, [e.target.name]: value })
	}

	const updateProfile = () => {
		// PUT
		console.log(profile)
	}

	const deactivateAccount = () => {
		// DELETE
		console.log("delete")
	}

	return (
		<Form>
			<Title>ข้อมูลส่วนตัว</Title>
			<InputComponent
				name="username"
				value={profile.username}
				labelTH="ชื่อผู้ใช้"
				labelEN="Username"
				handleOnChange={handleInputOnChange}
			/>
			<InputComponent
				name="tel"
				value={profile.tel}
				labelTH="เบอร์โทรศัพท์"
				labelEN="Phone Number"
				handleOnChange={handleInputOnChange}
			/>
			<InputComponent
				name="address"
				value={profile.address}
				labelTH="ที่อยู่"
				labelEN="Address"
				type="textarea"
				handleOnChange={handleInputOnChange}
			/>
			<InputComponent
				name="name"
				value={profile.name}
				labelTH={
					account_type === "personal" ? "ชื่อจริง - นามสกุล" : "ชื่อบริษัท"
				}
				labelEN={account_type === "personal" ? "Name" : "Company Name"}
				handleOnChange={handleInputOnChange}
			/>
			{account_type === "personal" && (
				<InputComponent
					name="display_name"
					value={profile.display_name}
					labelTH="ชื่อที่แสดง"
					labelEN="Display Name"
					handleOnChange={handleInputOnChange}
				/>
			)}
			<InputComponent
				name="juristic_id"
				value={profile.juristic_id}
				labelTH="เลขทะเบียนนิติบุคคล"
				labelEN="Juristic ID"
				handleOnChange={handleInputOnChange}
			/>
			<FormActions>
				<SecondaryButton
					type="button"
					onClick={() => router.push("/shipper/profile")}
				>
					ยกเลิก
				</SecondaryButton>
				<PrimaryButton type="button" onClick={updateProfile}>
					แก้ไขข้อมูล
				</PrimaryButton>
			</FormActions>
			<TextButton type="button" onClick={deactivateAccount}>
				ระงับบัญชี<span> / Deactivate Account</span>
			</TextButton>
		</Form>
	)
}

export default ProfileSettingPage