import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { InputComponentInterface } from '../../entities/interface/common'

const Input = styled.input`
  width: ${props => props.type === "short" ? "15rem" : "100%"};
  height: 3.4rem;
  border-radius: 0.6rem;
  border: solid 0.1rem hsl(0, 0%, 66%);
  margin-top: 1rem;
  font-size: 1.6rem;
  padding: 1.2rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelsContainer = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
`

const LabelTH = styled.div`
  font-size: 1.8rem;
  color: hsl(217, 16%, 16%);
`

const Description = styled.div`
  color: hsl(0, 0%, 66%);
  font-size: 1.4rem;
`

const LabelEN = styled(Description)`
  margin-left: 0.5ch;
`

const InputComponent:FunctionComponent<InputComponentInterface> = (props) => {
  const {name, value, labelTH, labelEN, type, description, handleOnChange, children} = props

  return (
    <InputContainer>
      <LabelsContainer>
        <LabelTH>
          {labelTH}
        </LabelTH>
        <LabelEN>
          / {labelEN}
        </LabelEN>
      </LabelsContainer>
      {
        description && 
        <Description>
          {description}
        </Description>
      }
      {
        type === "other" ? children 
        : <Input 
          type={type} 
          onChange={(e) => handleOnChange(e)} 
          value={value}
          name={name}
        />
      }
    </InputContainer>
  )
}

export default InputComponent
