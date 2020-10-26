import React from 'react'
import { ProfileInterface } from '../../../entities/interface/common'
import SignUpForm from '../../../components/common/SignUpForm';
import { useRouter } from 'next/router'

const SignUpCarrierPage = () => {
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
    <SignUpForm role="ขนส่ง" submitForm={SignUp} />    
  )
}

export default SignUpCarrierPage
