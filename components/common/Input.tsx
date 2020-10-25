import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { InputProperties } from '../../entities/interface/shipper'

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


const InputComponent:FunctionComponent<InputProperties> = (props) => {
  const {labelTH, labelEN, type, children} = props
  const [value, setValue] = useState('')

  const handleOnChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

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
      <Description>
        {children}
      </Description>
      <Input type={type} onChange={(e) => handleOnChange(e)} value={value} />
    </InputContainer>
  )
}

export default InputComponent
