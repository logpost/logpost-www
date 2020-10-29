import React from 'react'
import styled from 'styled-components'
import { ToggleComponentInterface } from '../../entities/interface/common'
import { FormActions, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents'
import { AlertIcon } from './Icons'

interface ModalContainerProps {
  toggle: boolean
}

const ModalContainer = styled.div<ModalContainerProps>`
  display: ${(props) => (props.toggle ? "block" : "none")};
` 

const Backdrop = styled.div`
  background-color: hsla(211, 27%, 15%, 0.8);
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
`

const ModalContent = styled.div`
  background-color: white;
  position: fixed;
	top: 50%;
  left: 50%;
	transform: translate(-50%, -50%);
  z-index: 1;
	padding: 2.1rem 1.6rem;
	border-radius: 6px;
	font-size: 1.8rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	white-space: nowrap;

	> *:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	span:not(:last-child) {
		line-height: 3.24rem;
		padding: 0 1.2rem;
	}

	${SecondaryButton}, ${PrimaryButton}  {
		font-size: 1.6rem;
		box-shadow: none;
		margin-top: 0;
		height: fit-content;
		font-weight: 500;
	}
`

const Modal = (props: ToggleComponentInterface) => {
	return (
		<ModalContainer toggle={props.toggle}>
			<Backdrop onClick={() => props.setToggle(false)} />
			<ModalContent>
				<AlertIcon />
				<span>เมื่อยืนยันเริ่มงานแล้วจะ<b>ไม่สามารถ</b><br/>- แก้ไขพนักงานขับรถ<br/>- ยกเลิกงาน<br/></span>
				<b>ยืนยันเริ่มงานหรือไม่ ?</b>
				<FormActions>
					<SecondaryButton onClick={() => props.setToggle(false)}>ย้อนกลับ</SecondaryButton>
					<PrimaryButton onClick={() => props.setToggle(false)}>ยืนยันเริ่มงาน</PrimaryButton>
				</FormActions>
			</ModalContent>
		</ModalContainer>
	)
}

export default Modal
