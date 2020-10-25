import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { LogpostIcon } from '../components/common/Icon'

const Background = styled.div`
  background-image: url('/images/main-bg.png');
  background-size: cover;
  height: 70vh;
`

const LogoContainer = styled.div`
  color: hsl(212, 28%, 28%);
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5.5%;
  left: 7.5%;

  svg {
    margin-bottom: 0.2rem;
  }
`

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 3.8rem 0;
  box-shadow: 0 -1.4rem 2.4rem 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 3.6rem 3.6rem 0 0;
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
`

const PrimaryButton = styled.button`
  background-color: hsl(212, 28%, 28%);
  border-radius: 4rem;
  color: white;
  padding: 1rem 3rem;
  width: fit-content;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 hsla(212, 28%, 28%, 0.24);

  &:not(:first-child)
   {
    margin-top: 3rem;
    background-color: hsl(217, 16%, 16%);
  }
`

const TextButton = styled.button`
  color: hsl(212, 28%, 28%);
  text-decoration: underline;
  margin-top: 2.6rem;
`

const Home = () => {
  const router = useRouter()

  const handleClick = (e, path:string) => {
    e.preventDefault()
    router.push(`/signup/${path}`)
  }

  return (
    <Background>
      <LogoContainer>
        <LogpostIcon />
        แหล่งรวมงานขนส่ง  
      </LogoContainer>
      <SignUpContainer>
        <PrimaryButton onClick={(e) => handleClick(e, "shipper")}>ลงทะเบียนผู้ส่ง</PrimaryButton>
        <PrimaryButton onClick={(e) => handleClick(e, "carrier")}>ลงทะเบียนขนส่ง</PrimaryButton>
        <TextButton>เข้าสู่ระบบ</TextButton>
      </SignUpContainer>
    </Background>
  )
}

export default Home
