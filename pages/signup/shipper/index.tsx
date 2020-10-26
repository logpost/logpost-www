import React, { useState } from 'react'
import SignUpForm from '../../../components/common/SignUpForm'
import { ProfileInterface } from '../../../entities/interface/common';
import { useRouter } from 'next/router'
import { profile } from 'console';

const SignUpShipperPage = () => {
  const router = useRouter()

  const protectEmail = (email:string) => {
    const splitted = email.split("@")
    const head = splitted[0].substring(0, 4)
    const tail = splitted[1]
    return head + "•••@" + tail 
  }

  const SignUp = (profile:ProfileInterface) => {
    // POST
    console.log(profile)
    router.push({
      pathname: '/alert/confirm/email',
      query: { email: protectEmail(profile.email) },
    })
  }

  return (
    <SignUpForm role="ผู้ส่ง" submitForm={SignUp} />    
  )
}

export default SignUpShipperPage
