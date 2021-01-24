import React, { FunctionComponent, useEffect } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import styled from "styled-components"
import { CancelIcon, ErrorIcon, SuccessIcon, WarningIcon } from './Icons'
import { alertPropertyState } from '../../store/atoms/alertPropertyState'

const ALERT_ICON = {
	"success": <SuccessIcon />,
	"warning": <WarningIcon />,
	"error": <ErrorIcon />
}

interface AlertContainer {
	isDisplay: boolean
	type: string
}

const AlertContainer = styled.div<AlertContainer>`
	display: ${(props) => props.isDisplay ? "flex" : "none"};
	position: fixed;
	top: 1.6rem;
	left: 50%; 
	width: 90%;
	font-size: 1.8rem;
	transform: translateX(-50%);
	background-color: ${(props) => props.type === "success" ? "hsl(145, 53%, 40%, 0.94)" :
		props.type === "error" ? "hsl(360, 77%, 65%, 0.94)" : "hsl(43, 90%, 52%, 0.94)"};
	border-radius: 6px;
	color: white;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	padding: 0.8rem 1.6rem;

	> button svg:last-child {
		height: 1.3rem;
		width: 1.3rem;
		margin-left: 1rem;
	}
`

const AlertContent = styled.div`
	display: flex;
	align-items: center;

	> svg {
		min-width: 2.4rem;
		width: 2.4rem;
		height: 2.4rem;
		margin-right: 1rem;

		path {
			fill: white;
		}
	}
`

const Alert: FunctionComponent = (props) => {
	const { children } = props
	const alertProperty = useRecoilValue(alertPropertyState)
	const discardAlert = useResetRecoilState(alertPropertyState)

	useEffect(() => {
        if (alertProperty.isShow) {
            setTimeout(() => {
                discardAlert()
            }, 5000)
        }
    }, [])

	return (
		<AlertContainer type={alertProperty.type} isDisplay={alertProperty.isShow}>
			<AlertContent>
				{ALERT_ICON[alertProperty.type]}
				<span>{children}</span>
			</AlertContent>
			<button onClick={discardAlert}><CancelIcon /></button>
		</AlertContainer>
	)
}

export default Alert
