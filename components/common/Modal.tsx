import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ToggleComponentInterface } from "../../entities/interface/common"

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
	padding: 2.1rem 0;
	border-radius: 6px;
	font-size: 1.8rem;
	max-width: 40rem;
	height: 90%;
	width: 86%;
`

const Modal: FunctionComponent<ToggleComponentInterface> = (props) => {
	const { children, toggle, setToggle } = props

	return (
		<ModalContainer toggle={toggle}>
			<Backdrop onClick={() => setToggle(false)} />
			<ModalContent>{children}</ModalContent>
		</ModalContainer>
	)
}

export default Modal
