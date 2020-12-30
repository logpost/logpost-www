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
import { ACCOUNT_TYPE } from "../../../data/account.mock"

const TextButtonCustom = styled(TextButton)`
	margin-top: 3rem;
`

const ProfileSettingPage = () => {
	const router = useRouter()
	const [profile, setProfile] = useState({
		username: "",
		tel: "",
		name: "",
		display_name: "",
		juristic_id: "",
	})
	const [address, setAddress] = useState({
		address: "",
		province: "",
		district: "",
		zipcode: "",
	})

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setProfile({ ...profile, [e.target.name]: value })
	}

	const handleAddressOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setAddress({ ...address, [e.target.name]: value})
	}

	const updateProfile = () => {
		// PUT
		const newProfile = {...profile, address: address}
		console.log(newProfile)
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
			<div>
				<InputComponent
					name="address"
					value={address.address}
					labelTH="ที่อยู่"
					labelEN="Address"
					handleOnChange={handleAddressOnChange}
				/>
				<InputComponent
					name="district"
					value={address.district}
					disableLabel={true}
					subLabel="อำเภอ"
					type="short"
					handleOnChange={handleAddressOnChange}
				/>
				<InputComponent
					name="province"
					value={address.province}
					disableLabel={true}
					subLabel="จังหวัด"
					type="short"
					handleOnChange={handleAddressOnChange}
				/>
				<InputComponent
					name="zipcode"
					value={address.zipcode}
					disableLabel={true}
					subLabel="รหัสไปรษณีย์"
					type="number"
					handleOnChange={handleAddressOnChange}
				/>
			</div>
			<InputComponent
				name="name"
				value={profile.name}
				labelTH={
					ACCOUNT_TYPE === "personal" ? "ชื่อจริง - นามสกุล" : "ชื่อบริษัท"
				}
				labelEN={ACCOUNT_TYPE === "personal" ? "Name" : "Company Name"}
				handleOnChange={handleInputOnChange}
			/>
			{ACCOUNT_TYPE === "personal" && (
				<InputComponent
					name="display_name"
					value={profile.display_name}
					labelTH="ชื่อที่แสดง"
					labelEN="Display Name"
					handleOnChange={handleInputOnChange}
					required={false}
				/>
			)}
			<InputComponent
				name="juristic_id"
				value={profile.juristic_id}
				labelTH="เลขทะเบียนนิติบุคคล"
				labelEN="Juristic ID"
				handleOnChange={handleInputOnChange}
				required={false}
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
			<TextButtonCustom type="button" onClick={deactivateAccount}>
				ระงับบัญชี<span> / Deactivate Account</span>
			</TextButtonCustom>
		</Form>
	)
}

export default ProfileSettingPage