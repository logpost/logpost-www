import React from 'react'
import { ProfileInterface } from '../../../entities/interface/common'
import SignUpForm from '../../../components/common/SignUpForm';

const SignUpCarrierPage = () => {
  const SignUp = (profile:ProfileInterface) => {
    // POST
    console.log(profile)
  }

  return (
    <SignUpForm role="ขนส่ง" submitForm={SignUp} />    
  )
}

export default SignUpCarrierPage
