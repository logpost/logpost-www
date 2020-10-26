import styled from 'styled-components'

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
