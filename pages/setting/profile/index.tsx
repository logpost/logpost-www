import React, { useState, useEffect } from "react"
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
import { useRecoilState } from "recoil"
import { userInfoState } from "../../../store/atoms/userInfoState"
import { deleteCarrierUser, deleteShipperUser, getCarrierProfile, getShipperProfile, logout, updateCarrierProfile, updateShipperProfile } from "../../../components/utilities/apis"
import { getUserInfo } from "../../../components/utilities/tokenHelper"
import { ProfileInterface } from "../../../entities/interface/account"
import useAlert from "../../../hooks/useAlert"
import Alert from "../../../components/common/Alert"
import Modal from "../../../components/common/Modal"
import { WarningIcon } from "../../../components/common/Icons"

const TextButtonCustom = styled(TextButton)`
	margin-top: 3rem;
`

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 2rem;
	padding: 0 2rem;

	> *:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	span:not(:last-child) {
		line-height: 3.24rem;
		padding: 0 1.2rem;
	}

	${FormActions} {
		> ${SecondaryButton}, ${PrimaryButton} {
			font-size: 1.8rem;
			box-shadow: none;
			font-weight: 500;
		}
	}
`

const ProfileSettingPage = () => {
	const router = useRouter()
	const [userInfo, setUserInfo] = useRecoilState(userInfoState)
	const [profile, setProfile] = useState({
		tel: null,
		name: null,
		display_name: null,
		juristic_id: null,
		account_description: null
	})
	const [address, setAddress] = useState({
		address: null,
		province: null,
		district: null,
		zipcode: null,
	})
	const [password, setPassword] = useState("")
	const [validPassword, setValidPassword] = useState(true)
	const [toggleModal, setToggleModal] = useState(false)
	const { alertStatus, setAlert } = useAlert()

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setProfile({ ...profile, [e.target.name]: value })
	}

	const handleAddressOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setAddress({ ...address, [e.target.name]: value})
	}

	const getProfile = (userProfile: ProfileInterface) => {
		setProfile({
			tel: userProfile.tel,
			name: userProfile.name,
			display_name: userProfile.display_name,
			juristic_id: userProfile.juristic_id,
			account_description: userProfile.account_description
		})
		const address = userProfile.address
		setAddress({
			address: address.address,  
			province: address.province,
			district: address.district,
			zipcode: address.zipcode
		})
	}

	useEffect(() => {
		let username = userInfo.username
		if (!username) {
			const decodedUserInfo = getUserInfo();
			username = decodedUserInfo.username
			setUserInfo(decodedUserInfo)
		}
		if (userInfo.role === "shipper") {
			getShipperProfile(username, getProfile)
		} else {
			getCarrierProfile(username, getProfile)
		}
	}, [])

	const updateProfile = async () => {
		const newProfile = {...profile, address: address}
		let response: number
		if (userInfo.role === "shipper") {
			response = await updateShipperProfile(newProfile)
		} else {
			response = await updateCarrierProfile(newProfile)
		}
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
	}

	const deactivateAccount = async () => {
		let response: number
		if (userInfo.role === "shipper") {
			response = await deleteShipperUser({ password })
		} else {
			response = await deleteCarrierUser({ password })
		}
		if (response !== 200) {
			setValidPassword(false)
		} else {
			logout()
		}
	}

	return (
		<Form>
			<Title>ข้อมูลส่วนตัว</Title>
			<Alert>
				{alertStatus.type === "success" ? "แก้ไขข้อมูลส่วนตัวสำเร็จ" : "แก้ไขข้อมูลส่วนตัวไม่สำเร็จ"}
			</Alert>
			<InputComponent
				name="tel"
				value={profile.tel || ""}
				labelTH="เบอร์โทรศัพท์"
				labelEN="Phone Number"
				handleOnChange={handleInputOnChange}
				required={false}
			/>
			<div>
				<InputComponent
					name="address"
					value={address.address || ""}
					labelTH="ที่อยู่"
					labelEN="Address"
					handleOnChange={handleAddressOnChange}
					required={false}
				/>
				<InputComponent
					name="district"
					value={address.district || ""}
					disableLabel={true}
					subLabel="อำเภอ"
					type="short"
					handleOnChange={handleAddressOnChange}
				/>
				<InputComponent
					name="province"
					value={address.province || ""}
					disableLabel={true}
					subLabel="จังหวัด"
					type="short"
					handleOnChange={handleAddressOnChange}
				/>
				<InputComponent
					name="zipcode"
					value={address.zipcode || ""}
					disableLabel={true}
					subLabel="รหัสไปรษณีย์"
					type="number"
					handleOnChange={handleAddressOnChange}
				/>
			</div>
			<InputComponent
				name="name"
				value={profile.name || ""}
				labelTH={
					userInfo.accountType === "personal" ? "ชื่อจริง - นามสกุล" : "ชื่อบริษัท"
				}
				labelEN={userInfo.accountType === "personal" ? "Name" : "Company Name"}
				handleOnChange={handleInputOnChange}
			/>
			{userInfo.accountType === "personal" && (
				<InputComponent
					name="display_name"
					value={profile.display_name || ""}
					labelTH="ชื่อที่แสดง"
					labelEN="Display Name"
					handleOnChange={handleInputOnChange}
					required={false}
				/>
			)}
			<InputComponent
				name="juristic_id"
				value={profile.juristic_id || ""}
				labelTH="เลขทะเบียนนิติบุคคล"
				labelEN="Juristic ID"
				handleOnChange={handleInputOnChange}
				required={false}
			/>
			<InputComponent
				name="account_description"
				value={profile.account_description || ""}
				labelTH="คำอธิบาย"
				labelEN="Description"
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
			<TextButtonCustom type="button" onClick={() => setToggleModal(true)}>
				ระงับบัญชี<span> / Deactivate Account</span>
			</TextButtonCustom>
			<Modal toggle={toggleModal} setToggle={setToggleModal}>
				<ModalContent>
					<WarningIcon />
					<span>เมื่อระงับบัญชีแล้วจะ<b>ไม่สามารถ</b>ยกเลิกการระงับหรือเข้าใช้งานบัญชีนี้ได้อีก</span>
					<b>กรอกรหัสผ่านเพื่อระงับบัญชี</b>
					<InputComponent
						value={password}
						disableLabel={true}
						handleOnChange={(e) => setPassword(e.target.value)}
						type="password"
						valid={validPassword}
						invalidText="รหัสผ่านไม่ถูกต้อง"
					/>
					<FormActions>
						<SecondaryButton type="button" onClick={() => setToggleModal(false)}>ย้อนกลับ</SecondaryButton>
						<PrimaryButton type="button" onClick={deactivateAccount}>ระงับบัญชี</PrimaryButton>
					</FormActions>
				</ModalContent>
			</Modal>
		</Form>
	)
}

export default ProfileSettingPage