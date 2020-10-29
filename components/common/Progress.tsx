import React from 'react'
import styled, { keyframes } from 'styled-components'


interface ProgressCircleInterface {
	percent: number
}

interface ProgressInterface extends ProgressCircleInterface {
	currentStep: string
	nextStep?: string
	label?: string
}

const CIRCLE_SIZE="2.6rem"

const ProgressContainer = styled.div`
	display: flex;
	align-items: center
`

const CircularProgress = styled.svg`
	transform: rotate(270deg);
	width: 5.2rem;
	height: 5.2rem;

	circle {
		position: absolute;
    fill: none;
    stroke-width: 7.6;
    stroke-dasharray: 340;
	}
`
const ProgressCircle = styled.circle<ProgressCircleInterface>`
	stroke-dashoffset: calc(340 - (340 * (${props => props.percent}*48)) / 100); 
	stroke: hsl(16, 56%, 51%);
`

const BackgroundCircle = styled.circle`
	stroke-dashoffset: 0;
	stroke: hsl(26, 74%, 91%);
`

const StepContainer = styled.div`
	margin-left: 2rem;
	font-size: 1.8rem;
  font-weight: 500;
  color: hsl(217, 16%, 16%);

	span {
		margin-left: 0.6rem;
	}
`

const NextStep = styled.div`
	font-size: 1.2rem;
	font-weight: normal;
	color: hsl(0, 0%, 66%);
	margin-top: 0.4rem;
`

const Progress = (props:ProgressInterface) => {
	const { currentStep, nextStep, label, percent } = props

	return (
		<ProgressContainer>
			<CircularProgress viewBox="0 0 60 60" preserveAspectRatio="xMinYMin meet">
				<BackgroundCircle cx="50%" cy="50%" r={CIRCLE_SIZE}></BackgroundCircle>
				<ProgressCircle percent={percent} cx="50%" cy="50%" r={CIRCLE_SIZE}></ProgressCircle>
			</CircularProgress>
			<StepContainer>
				{label && label + ": "}<span>{currentStep}</span>
				{
					nextStep && <NextStep>
						{label}ถัดไป: <span>{nextStep}</span>
					</NextStep>
				}
			</StepContainer>
		</ProgressContainer>
	)
}

export default Progress
