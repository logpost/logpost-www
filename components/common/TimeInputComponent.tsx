import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { RightArrow } from "./Icons"
import { FormActions, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents'

const TimePicker = styled.div`
	font-family: -apple-system, "Bai Jamjuree";
	display: flex;
	align-items: center;

	span {
		font-size: 2.4rem;
		color: hsl(211, 28%, 28%);
		font-weight: 600;
		margin: 0 1.3rem;
	}
`

const TimeInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	button {
		transform: rotate(90deg);

		svg {
			width: 1.8rem;
			height: 1.8rem;
		}
	
		&:first-child {
			transform: rotate(-90deg);
		}
	}
`

const TimeInput = styled.input`
	width: 7.1rem;
	height: 4.4rem;
	text-align: center;
	border: 0;
	background-color: hsl(220, 27%, 96%);
	border-radius: 0.6rem;
	margin: 0.8rem 0;
	font-size: 2.4rem;
	padding: 1.2rem;

	&::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&[type=number] {
		 -moz-appearance:textfield;
	}
`

const TimeInputComponent = ({ date, setDate, closePicker }) => {
	const [time, setTime] = useState({
		hour: date.getHours(),
		minute: date.getMinutes()
	})

	const setDefault = () => {
		let newTime = time
		newTime = {
			hour: date.getHours(),
			minute: date.getMinutes()
		}
		setTime(newTime)
	}

	const confirmTime = () => {
		let newTime = time
		const modRemaining = time.minute % 15
		if (modRemaining !== 0) {
			if (modRemaining < 8) {
				newTime = { ...time,
					minute: time.minute - modRemaining
				}
			} else {
				newTime = { ...time,
					minute: time.minute + (15 - modRemaining)
				}
			}
		}

		const newDate = date
		if (time.hour === null) {
			newTime = { ...newTime, hour: date.getHours() }
		}
		if (time.minute === null) {
			newTime = { ...newTime, minute: date.getMinutes() }
		}
		newDate.setHours(newTime.hour, newTime.minute, 0)
		setDate(newDate)
		closePicker()
	}

	useEffect(() => {
		if (time.minute >= 60) {
			setTime({
				hour: time.hour + 1,
				minute: 0
			})
		}
		else if (time.minute === -15) {
			setTime({
				hour: time.hour - 1,
				minute: 45
			})
		}
		if (time.hour >= 24) {
			setTime({
				hour: 0,
				minute: time.minute
			})
		} 
		else if (time.hour === -1) {
			setTime({
				hour: 23,
				minute: time.minute
			})
		}
	}, [time])

	useEffect(() => {
		setTime({
			...time,
			minute: date.getMinutes() - (date.getMinutes() % 15)
		})
	}, [])

	return (
		<>
			<TimePicker>
				<TimeInputContainer>
					<button 
						onClick={() => setTime({...time, hour: time.hour + 1})}
					>
						<RightArrow />
					</button>
					<TimeInput
						value={`${time.hour < 10 ? "0" : ""}${time.hour}`}
						type="number"
						onChange={(e) => setTime({...time, hour: e.target.value})}
					/>
					<button
						onClick={() => setTime({...time, hour: time.hour - 1})}
					>
						<RightArrow />
					</button>
				</TimeInputContainer>
				<span>:</span>
				<TimeInputContainer>
					<button
						onClick={() => setTime({...time, minute: time.minute + 15})}
					>
						<RightArrow />
					</button>
					<TimeInput
						value={`${time.minute < 10 ? "0" : ""}${time.minute}`}
						type="number"
						onChange={(e) => setTime({...time, minute: e.target.value})}
					/>
					<button
						onClick={() => setTime({...time, minute: time.minute - 15})}
					>
						<RightArrow />
					</button>
				</TimeInputContainer>
			</TimePicker>
			<FormActions>
				<SecondaryButton onClick={setDefault}>คืนค่าเดิม</SecondaryButton>
				<PrimaryButton onClick={confirmTime}>เลือกเวลา</PrimaryButton>
			</FormActions>
		</>
	)
}

export default TimeInputComponent
