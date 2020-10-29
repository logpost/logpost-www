import styled from 'styled-components'

export const Background = styled.div`
  background-image: url('/images/main-bg.png');
  background-size: cover;
  height: 72vh;
`

export const Title = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: hsl(212, 28%, 28%);
`

export const PrimaryButton = styled.button`
  font-size: 1.8rem;
  border-radius: 4rem;
  color: white;
  padding: 1rem 3rem;
  width: fit-content;
  background-color: hsl(16, 56%, 51%);
  box-shadow: 0.4rem 0.4rem 1.2rem 0 hsla(212, 28%, 28%, 0.24);
`

export const SecondaryButton = styled.button`
  border-radius: 4rem;
  border: solid 0.2rem hsl(212, 28%, 28%);
  color: hsl(212, 28%, 28%);
  font-size: 1.8rem;
  font-weight: 500;
  padding: 1rem 3rem;
`;

export const TextButton = styled.button`
  color: hsl(212, 28%, 28%);
  text-decoration: underline;
`

export const HeaderTitle = styled.div`
	font-size: 2.4rem;
	font-weight: 500;
	color: white;
`

export const HeaderContainer = styled.div`
	background-color: hsl(212, 28%, 28%);
	padding: 1.6rem 2rem; 
	display: flex;
	flex-direction: column;

	button {
		align-self: flex-end;
	}
`

export const Form = styled.form`
  margin: 4.2rem;
  display: flex;
  flex-direction: column;

  > div:not(:first-child) {
    margin-top: 1.8rem;
  }

  ${PrimaryButton} {
    margin-top: 3rem;
    align-self: center;
  }

  ${TextButton} {
    font-size: 1.8rem;
    color: hsl(16, 56%, 51%);
    margin-top: 3rem;
    /* margin-bottom: 3.8rem; */

    > span {
      font-size: 1.4rem;
    }
  }
`

export const FormActions = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${SecondaryButton} {
    border: solid 1px hsl(0, 0%, 66%);
    color: hsl(0, 0%, 66%);
    margin-top: 3rem;
  }
`

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
`

export const Detail = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  color: hsl(0, 0%, 51%);

  span {
    margin-left: 1.1rem;
    
    &:first-child {
      color: hsl(212, 28%, 28%);
    }
  }
`
