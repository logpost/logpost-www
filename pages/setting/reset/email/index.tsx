import React, { useState } from "react"
import {
	Form,
	FormActions,
	PrimaryButton,
	SecondaryButton,
	Title,
} from "../../../../components/styles/GlobalComponents"
import InputComponent from "../../../../components/common/InputComponent"
import { useRouter } from "next/router"
import { changeEmail } from "../../../../components/utilities/apis"
import withPrivateRoute from "../../../../components/utilities/withPrivateRoute"

const EmailSettingPage = () => {
	const router = useRouter()
	const [email, setEmail] = useState("")

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setEmail(value)
	}

	const resetEmail = () => {
		changeEmail({ email })
		router.push({
			pathname: '/alert/confirm/email',
			query: { email: email },
		})
	}

	return (
		<Form>
			<Title>แก้ไขอีเมล</Title>
			<InputComponent
				value={email}
				labelTH="อีเมลใหม่"
				labelEN="New E-mail"
				handleOnChange={handleInputOnChange}
			/>
			<FormActions>
				<SecondaryButton
					type="button"
					onClick={() => router.push("/shipper/profile")}
				>
						ยกเลิก
				</SecondaryButton>
				<PrimaryButton
					type="button"
					onClick={resetEmail}
				>
					แก้ไขอีเมล
				</PrimaryButton>
			</FormActions>
		</Form>
	)
}

export default withPrivateRoute(EmailSettingPage)
