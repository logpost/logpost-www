import React from 'react'
import styled, { css } from "styled-components"
import { useRouter } from 'next/router'
import { FormActions, FormHeader, FormInputContainer, HeaderTitle, HeaderTitleContainer, PrimaryButton, SecondaryButton } from '../../../components/styles/GlobalComponents'
import { createTruck } from '../../../components/utilities/apis'
import useAlert from '../../../hooks/useAlert'
import TruckForm from '../../../components/common/TruckForm'
import { useRecoilValue } from 'recoil'
import { truckDetailsState } from '../../../store/atoms/truckDetailsState'
import { BreakpointLG, BreakpointMD } from '../../../components/styles/Breakpoints'
import DesktopHeader from '../../../components/common/DesktopHeader'
import NavigationBar from '../../../components/common/NavigationBar'
import breakpointGenerator from '../../../components/utilities/breakpoint'

const FormHeaderCustom = styled(FormHeader)`
	padding: 3.4rem 0 3.4rem 3.7rem;
	font-size: 2.2rem;
	font-weight: 500;
	color: hsl(217, 16%, 16%);
`

const AddPageContainer = styled.div`
	width: 100%;
	
	${FormInputContainer} {
		${breakpointGenerator({
			large: css`
				max-width: 100rem;
			
				${FormActions} {
					max-width: 76rem;
				}
			`
		})}
	}
`

const AddTruckPage = () => {
	const router = useRouter()
    const { setAlert } = useAlert()
	const truckDetails = useRecoilValue(truckDetailsState)

	const submitDetails = async () => {
		const response = await createTruck(truckDetails)
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
		router.push(`/carrier/truck/overview`, undefined, { shallow: true })
	}

	return (
		<>
			<NavigationBar activeIndex={2} />
			<AddPageContainer>
				<BreakpointMD>
					<FormHeaderCustom>
						ข้อมูลรถบรรทุก
					</FormHeaderCustom>
				</BreakpointMD>
				<BreakpointLG>
					<DesktopHeader>
						<HeaderTitleContainer>
							<HeaderTitle>สร้างรถบรรทุก</HeaderTitle>
						</HeaderTitleContainer>
					</DesktopHeader>
				</BreakpointLG>
				<FormInputContainer>
					<TruckForm />
					<FormActions>
						<SecondaryButton onClick={() => router.back()}>ย้อนกลับ</SecondaryButton>
						<PrimaryButton onClick={submitDetails}>เพิ่มรถบรรทุก</PrimaryButton>
					</FormActions>
				</FormInputContainer>
			</AddPageContainer>
		</>
	)
}

export default AddTruckPage
