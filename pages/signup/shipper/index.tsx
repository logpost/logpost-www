import React, { useState } from 'react'
import SignUpForm from '../../../components/common/SignUpForm'
import { ProfileInterface } from '../../../entities/interface/common';

const SignUpShipperPage = () => {
  const SignUp = (profile:ProfileInterface) => {
    // POST
    console.log(profile)
  }

  return (
    <SignUpForm role="ผู้ส่ง" submitForm={SignUp} />    
  )
}

export default SignUpShipperPage
