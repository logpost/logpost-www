import React, { useState } from 'react'
import styled from 'styled-components'
import { SignUpFormInterface } from '../../entities/interface/common'
import InputComponent from './Input'
import { PrimaryButton, Title, Form } from '../styles/GlobalComponents';

const PrimaryButtonCustom = styled(PrimaryButton) `
  margin-top: 3rem;
  align-self: center;
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

  const handleInputOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setProfile({...profile, [e.target.name]: value})
  }

  return (
    <Form>
      <Title>ลงทะเบียน{role}</Title>
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
        value={profile.password} 
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
      <PrimaryButtonCustom type="button" onClick={() => submitForm(profile)}>ลงทะเบียน{role}</PrimaryButtonCustom>
    </Form>
  )
}

export default SignUpForm