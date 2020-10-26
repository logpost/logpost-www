import React from "react";
import styled from "styled-components";
import { EmailConfirmation } from "../../../../components/common/Icon";
import { useRouter } from "next/router";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const Title = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  color: hsl(212, 28%, 28%);
`;

const Detail = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: hsl(212, 28%, 28%);

  &:not(:first-child) {
    margin-top: 1.8rem;
  }
`;

const SecondaryButton = styled.button`
  border-radius: 4rem;
  border: solid 0.2rem hsl(212, 28%, 28%);
  color: hsl(212, 28%, 28%);
  font-size: 1.8rem;
  font-weight: 500;
  padding: 1rem 3rem;
  margin-top: 13.6rem;
`;

const EmailConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const EmailConfirmationPage = () => {
  const router = useRouter();
  console.log(router)
  return (
    <EmailConfirmationContainer>
      <EmailConfirmation />
      <DetailContainer>
        <Title>กรุณายืนยันอีเมล</Title>
        <Detail>คลิกลิงก์ที่เราส่งไปทางอีเมล</Detail>
        <Detail>{router.query.email}</Detail>
      </DetailContainer>
      <SecondaryButton>ส่งอีเมลอีกครั้ง</SecondaryButton>
    </EmailConfirmationContainer>
  );
};

export default EmailConfirmationPage;
