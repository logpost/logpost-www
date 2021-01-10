import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { RightArrow } from "./Icons"
import { FormActions, PrimaryButton, SecondaryButton } from '../styles/GlobalComponents'
import { pad } from "../utilities/helper"

interface TimeInputComponentInterface {
	date: Date,
	setDateAndTime: (date: Date) => void,
	closePicker: () => void
}

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

const TimeInputComponent = (props: TimeInputComponentInterface) => {
	const { date, setDateAndTime, closePicker} = props

	const [time, setTime] = useState({
		hour: pad(String(date.getHours()), 2),
		minute: pad(String(date.getMinutes()), 2)
	})

	const setDefault = () => {
		let newTime = time
		newTime = {
			hour: pad(String(date.getHours()), 2),
			minute: pad(String(date.getMinutes()), 2)
		}
		setTime(newTime)
	}

	const confirmTime = () => {
		let newTime = time
		const minute = parseInt(time.minute)
		const modRemaining = minute % 15
		if (modRemaining !== 0) {
			if (modRemaining < 8) {
				newTime = { ...time,
					minute: String(minute - modRemaining)
				}
			} else {
				newTime = { ...time,
					minute: String(minute + (15 - modRemaining))
				}
			}
		}

		const newDate = date
		if (time.hour === "") {
			newTime = { ...newTime, hour: String(date.getHours()) }
		}
		if (time.minute === "") {
			newTime = { ...newTime, minute: String(date.getMinutes()) }
		}
		newDate.setHours(parseInt(newTime.hour), parseInt(newTime.minute), 0)
		setDateAndTime(newDate)
		closePicker()
	}

	useEffect(() => {
		let newTime = time
		const minute = parseInt(time.minute)
		const hour = parseInt(time.hour)
		if (minute >= 60) {
			newTime = {
				hour: pad(String(parseInt(time.hour) + 1), 2),
				minute: "00"
			}
		}
		else if (minute === -15) {
			newTime = {
				hour: pad(String(parseInt(time.hour) - 1), 2),
				minute: "45"
			}
		}
		if (hour >= 24) {
			newTime = {
				hour: "00",
				minute: pad(time.minute, 2)
			}
		} 
		else if (hour === -1) {
			newTime = {
				hour: "23",
				minute: pad(time.minute, 2)
			}
		}
		setTime(newTime)
	}, [time])

	useEffect(() => {
		setTime({
			...time,
			minute: pad(String(date.getMinutes() - (date.getMinutes() % 15)), 2)
		})
	}, [])

	return (
		<>
			<TimePicker>
				<TimeInputContainer>
					<button 
						onClick={() => setTime({...time, hour: pad(String(parseInt(time.hour) + 1), 2)})}
					>
						<RightArrow />
					</button>
					<TimeInput
						value={time.hour}
						onChange={(e) => setTime({...time, hour: e.target.value})}
					/>
					<button
						onClick={() => setTime({...time, hour: pad(String(parseInt(time.hour) - 1), 2)})}
					>
						<RightArrow />
					</button>
				</TimeInputContainer>
				<span>:</span>
				<TimeInputContainer>
					<button
						onClick={() => setTime({...time, minute: pad(String(parseInt(time.minute) + 15), 2)})}
					>
						<RightArrow />
					</button>
					<TimeInput
						value={time.minute}
						type="number"
						onChange={(e) => setTime({...time, minute: e.target.value})}
					/>
					<button
						onClick={() => setTime({...time, minute: pad(String(parseInt(time.minute) - 15), 2)})}
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
