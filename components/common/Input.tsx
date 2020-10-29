import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { InputComponentInterface } from "../../entities/interface/common"

interface Label {
  labelSize: string
}

const Input = styled.input`
  width: ${(props) => (props.type === "short" ? "15rem" : "100%")};
  height: 3.4rem;
  border-radius: 0.6rem;
  border: solid 0.1rem hsl(0, 0%, 66%);
  margin-top: 1rem;
  font-size: 1.6rem;
  padding: 1.2rem;
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

const LabelEN = styled(Description)<Label>`
  font-size: ${(props) => (props.labelSize === "large" ? "1.8rem" : "1.4rem")};
  margin-left: 0.5ch;
  margin-top: 0;
`

const Classifier = styled.div`
  font-size: 1.8rem;
  color: hsl(0, 0%, 66%);
  margin-top: 1rem;
  margin-left: 1.8rem;
`

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`

const InputComponent: FunctionComponent<InputComponentInterface> = (props) => {
  const {
    name,
    value,
    labelTH,
    labelEN,
    type,
    labelSize,
    description,
    handleOnChange,
    children,
    classifier
  } = props

  return (
    <InputContainer>
      <LabelsContainer>
        <LabelTH labelSize={labelSize}>{labelTH}</LabelTH>
        <LabelEN labelSize={labelSize}>/ {labelEN}</LabelEN>
      </LabelsContainer>
      {description && <Description>{description}</Description>}
      {type === "other" ? (
        children
      ) : type === "textarea" ? (
        <TextArea />
      ) : ( <FieldContainer>
        <Input
          type={type}
          onChange={(e) => handleOnChange(e)}
          value={value}
          name={name}
        />
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
