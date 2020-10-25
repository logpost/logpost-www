import React from 'react'
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

const SignUpShipperPage = () => {
  return (
    <Form>
      <InputComponent labelTH="ชื่อผู้ใช้" labelEN="Username" />
      <InputComponent labelTH="รหัสผ่าน" labelEN="Password">
        ความยาวมากกว่า 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9)
      </InputComponent>
      <InputComponent labelTH="ยืนยันรหัสผ่าน" labelEN="Confirm Password" />
      <InputComponent labelTH="ชื่อจริง - นามสกุล" labelEN="Name" />
      <InputComponent labelTH="ชื่อที่แสดง" labelEN="Display Name" />
      <InputComponent labelTH="อีเมล" labelEN="E-mail" />
      <PrimaryButton>ลงทะเบียนขนส่ง</PrimaryButton>
    </Form>
  )
}

export default SignUpShipperPage
