import React, { useState } from 'react'
import styled from 'styled-components'
import InputComponent from '../../../components/common/Input'

const Form = styled.form`
  margin: 4.2rem;
  display: flex;
  flex-direction: column;

  > div:not(:first-child) {
    margin-top: 1.8rem;
  }
`
const PrimaryButton = styled.button`
  font-size: 1.8rem;
  border-radius: 4rem;
  color: white;
  padding: 1rem 3rem;
  width: fit-content;
  background-color: hsl(16, 56%, 51%);
  box-shadow: 0.4rem 0.4rem 1.2rem 0 hsla(212, 28%, 28%, 0.24);
  align-self: center;
  margin-top: 3rem;
`

const RadioInputContainer = styled.div`
  display: flex;
  border: solid 0.2rem hsl(212, 28%, 28%);
  border-radius: 0.6rem;
  margin-top: 1rem;
  width: 100%;
`

const RadioInput = styled.button`
  font-size: 1.6rem;
  width: 50%;
  padding: 1rem 0;
  text-align: center;
  ${props => props.value === props.name &&
  `
    background-color: hsl(212, 28%, 28%);
    color: white;
  `}
`

const FormTitle = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: hsl(212, 28%, 28%);
`

const SignUpShipperPage = () => {
  const [accountType, setAccountType] = useState("personal")
  const [shipperProfile, setShipperProfile] = useState({
    username: "",
    password: "",
    confirm_password: "",
    name: "",
    display_name: "",
    email: ""
  })
  console.log(accountType)
  console.log(shipperProfile)

  const handleInputOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setShipperProfile({...shipperProfile, username: value})
  }

  return (
    <Form>
      <FormTitle>ลงทะเบียนขนส่ง</FormTitle>
      <InputComponent labelTH="ประเภทผู้ใช้" labelEN="Account Type" type="other">
        <RadioInputContainer>
          <RadioInput type="button" value={accountType} name="personal" onClick={() => setAccountType("personal")}>
            บุคคล
          </RadioInput>
          <RadioInput type="button" value={accountType} name="business" onClick={() => setAccountType("business")}>
            นิติบุคคล
          </RadioInput>
        </RadioInputContainer>
      </InputComponent>
      <InputComponent 
        name="username" 
        value={shipperProfile.username} 
        labelTH="ชื่อผู้ใช้" 
        labelEN="Username" 
        handleOnChange={handleInputOnChange} />
      <InputComponent 
        name="password"
        labelTH="รหัสผ่าน" 
        labelEN="Password" 
        description="ความยาวมากกว่า 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9)"
        handleOnChange={handleInputOnChange} />
      <InputComponent 
        name="confirm_password" 
        value={shipperProfile.confirm_password} 
        labelTH="ยืนยันรหัสผ่าน" 
        labelEN="Confirm Password" />
      <InputComponent 
        name="name" 
        value={shipperProfile.name} 
        labelTH="ชื่อจริง - นามสกุล" 
        labelEN="Name" />
      <InputComponent name="display_name" value={shipperProfile.display_name} labelTH="ชื่อที่แสดง" labelEN="Display Name" />
      <InputComponent name="email" value={shipperProfile.email} labelTH="อีเมล" labelEN="E-mail" />
      <PrimaryButton>ลงทะเบียนขนส่ง</PrimaryButton>
    </Form>
  )
}

export default SignUpShipperPage
