import React, { useState } from 'react'
import styled from 'styled-components'
import { SignUpFormInterface } from '../../entities/interface/common'
import InputComponent from './Input'

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

const SignUpForm = (props:SignUpFormInterface) => {
  const { role, submitForm } = props
  const [profile, setProfile] = useState({
    account_type: "personal",
    username: "",
    password: "",
    confirm_password: "",
    name: "",
    display_name: "",
    email: ""
  })
  console.log(profile)

  const handleInputOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setProfile({...profile, [e.target.name]: value})
  }

  return (
    <Form>
      <FormTitle>ลงทะเบียน{role}</FormTitle>
      <InputComponent labelTH="ประเภทผู้ใช้" labelEN="Account Type" type="other">
        <RadioInputContainer>
          <RadioInput 
            type="button" 
            value={profile.account_type} 
            name="personal" 
            onClick={() => setProfile({...profile, account_type: "personal"})}>
            บุคคล
          </RadioInput>
          <RadioInput 
            type="button" 
            value={profile.account_type} 
            name="business" 
            onClick={() => setProfile({...profile, account_type: "business"})}>
            นิติบุคคล
          </RadioInput>
        </RadioInputContainer>
      </InputComponent>
      <InputComponent 
        name="username" 
        value={profile.username} 
        labelTH="ชื่อผู้ใช้" 
        labelEN="Username" 
        handleOnChange={handleInputOnChange} />
      <InputComponent 
        name="password"
        labelTH="รหัสผ่าน" 
        labelEN="Password" 
        description="ความยาวมากกว่า 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9)"
        type="password"
        handleOnChange={handleInputOnChange} />
      <InputComponent 
        name="confirm_password" 
        value={profile.confirm_password} 
        labelTH="ยืนยันรหัสผ่าน" 
        labelEN="Confirm Password"
        type="password"
        handleOnChange={handleInputOnChange} />
      <InputComponent 
        name="name" 
        value={profile.name} 
        labelTH={profile.account_type === "personal" ? "ชื่อจริง - นามสกุล" : "ชื่อบริษัท"}
        labelEN={profile.account_type === "personal" ? "Name" : "Company Name"}
        handleOnChange={handleInputOnChange} />
      {
        profile.account_type === "personal" &&
        <InputComponent 
          name="display_name" 
          value={profile.display_name} 
          labelTH="ชื่อที่แสดง" 
          labelEN="Display Name"
          handleOnChange={handleInputOnChange} />
      }
      <InputComponent 
        name="email" 
        value={profile.email} 
        labelTH="อีเมล" 
        labelEN="E-mail"
        handleOnChange={handleInputOnChange} />
      <PrimaryButton type="button" onClick={() => submitForm(profile)}>ลงทะเบียน{role}</PrimaryButton>
    </Form>
  )
}

export default SignUpForm