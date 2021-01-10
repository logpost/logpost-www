import { FunctionComponent } from "react"
import styled from "styled-components"
import { InputComponentInterface } from "../../entities/interface/common"

interface Label {
	labelSize: string
}

interface Input {
	valid: boolean
}

const Input = styled.input<Input>`
	width: ${(props) => (props.type === "short" ? "15rem" : props.type === "number" ? "8rem" : "100%")};
	height: 3.4rem;
	border-radius: 0.6rem;
	border: solid 0.1rem ${(props) => (props.valid ? "hsl(0, 0%, 66%)" : "hsl(16, 56%, 51%)")};
	margin-top: 1rem;
	font-size: 1.6rem;
	padding: 1.2rem;
	&::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&[type=number] {
		 -moz-appearance:textfield;
	}
`

const TextArea = styled.textarea`
	height: 7rem;
	border-radius: 0.6rem;
	border: solid 0.1rem hsl(0, 0%, 66%);
	margin-top: 1rem;
	font-size: 1.6rem;
	padding: 1.2rem;
	resize: none;
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const LabelsContainer = styled.div`
	display: flex;
	font-weight: 500;
	align-items: center;
	white-space: nowrap;
	flex-wrap: wrap;
`

const LabelTH = styled.div<Label>`
	font-size: ${(props) => (props.labelSize === "large" ? "2.4rem" : "1.8rem")};
	color: hsl(217, 16%, 16%);
`

const Description = styled.div`
	margin-top: 1rem;
	color: hsl(0, 0%, 66%);
	font-size: 1.4rem;
`

const LabelEN = styled(Description) <Label>`
	font-size: ${(props) => (props.labelSize === "large" ? "1.8rem" : "1.4rem")};
	margin-left: 0.5ch;
	margin-top: 0;
`

const Classifier = styled.div`
	font-size: 1.8rem;
	color: hsl(212, 28%, 28%);
	margin-left: 1.8rem;
`

const SubLabel = styled(Classifier)`
	margin-left: 0;
	margin-right: 1.8rem;
`

const FieldContainer = styled.div`
	display: flex;
	align-items: baseline;
`

const RequiredDot = styled.div`
	background-color: hsla(0, 75%, 63%, 0.6);
	height: 0.5rem;
	width: 0.5rem;
	border-radius: 50%;
	align-self: start;
    margin: 0.2rem;
`

const InvalidDescription = styled(Description)`
	color: hsl(16, 56%, 51%);	
`

const InputComponent: FunctionComponent<InputComponentInterface> = (props) => {
	const {
		disableLabel = false,
		labelTH,
		labelEN,
		subLabel,
		labelSize,
		description,
		handleOnChange,
		children,
		classifier,
		required = true,
		type,
		valid = true,
		invalidText,
		...inputProps
	} = props

	return (
		<InputContainer>
			{
				!disableLabel &&
				<LabelsContainer>
					<LabelTH labelSize={labelSize}>{labelTH}</LabelTH>
					<LabelEN labelSize={labelSize}>/ {labelEN}</LabelEN>
					{
						required && <RequiredDot />
					}
				</LabelsContainer>
			}
			{description && <Description>{description}</Description>}
			{(!valid && invalidText) && <InvalidDescription>{invalidText}</InvalidDescription>}
			{type === "other" ? (
				children
			) : type === "textarea" ? (
				<TextArea />
			) : (<FieldContainer>
				{
					subLabel && 
					<SubLabel>
						{subLabel}
					</SubLabel>
				}
				{
					handleOnChange ?
					<Input
						type={type}
						onChange={(e) => handleOnChange(e)}
						valid={valid}
						{...inputProps}
					/> : 
					<Input
						valid={valid}
						{...inputProps}
					/>
				}
				{
					classifier &&
					<Classifier>
						{classifier}
					</Classifier>
				}
			</FieldContainer>
			)}
		</InputContainer>
	)
}

export default InputComponent
