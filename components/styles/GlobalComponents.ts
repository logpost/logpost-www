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
	padding: 1rem 2.4rem;
	width: fit-content;
	background-color: hsl(16, 56%, 51%);
	box-shadow: 0.4rem 0.4rem 1.2rem 0 hsla(212, 28%, 28%, 0.24);
	white-space: nowrap;
`

export const SecondaryButton = styled.button`
	border-radius: 4rem;
	border: solid 0.2rem hsl(212, 28%, 28%);
	color: hsl(212, 28%, 28%);
	font-size: 1.8rem;
	font-weight: 500;
	padding: 1rem 2.4rem;
	white-space: nowrap;

	&:disabled {
		border-color: hsl(0, 0%, 66%);
		color: hsl(0, 0%, 66%);
	}
`

export const TextButton = styled.button`
	color: hsl(212, 28%, 28%);
	text-decoration: underline;
	white-space: nowrap;
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
		align-self: center;
	}

	${TextButton} {
		font-size: 1.8rem;
		color: hsl(16, 56%, 51%);
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
	margin-top: 3rem;

	${SecondaryButton} {
		border: solid 1px hsl(0, 0%, 66%);
		color: hsl(0, 0%, 66%);
		margin-right: 1.6rem;
	}

	@media screen and (max-width: 360px) {
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;

		button {
			width: 100%;
		}

		${SecondaryButton} {
			margin-top: 1.6rem;
			margin-right: 0;
		}
	}

`

export const DetailRow = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(16.2rem, 1fr));
	grid-gap: 1.6rem;
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

export const JobTitle = styled.span`
	display: flex;
	align-items: center;
	font-size: 2rem;
	padding: 0.2rem 0;
	white-space: nowrap;

	> span {
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 0.8rem;
	}

	svg {
		margin: 0 1.4rem;

		path {
			fill: white;
		}
	}
`

export const CarrierDetailsContainer = styled.div`
	margin-top: 2rem;
	padding: 0.8rem 1.6rem;
	background-color: hsl(211, 28%, 94%);

	> div:not(:first-child) {
		margin-top: 0.8rem;
	}
`

export const FormInputContainer = styled.div`
	padding: 1.8rem 2.6rem;

	> div:not(:first-child) {
		margin-top: 2rem;
	}
`

export const FormHeader = styled.div`
	background-color: hsl(0, 0%, 98%);
	padding: 1.4rem 2.4rem;
`

export const ButtonGroupContainer = styled.div`
	margin-top: 0.8rem;
	display: grid;
    grid-gap: 1.2rem 1.4rem;
    grid-template-columns: repeat(auto-fill,9rem);
`

export const ButtonItem = styled.button`
	border-radius: 0.6rem;
	box-shadow: 0 0 0 ${(props) =>
		props.value == props.name
			? "0.2rem hsl(212, 28%, 28%)"
			: "0.1rem hsl(0, 0%, 66%)"};
	outline: none;
	width: 9.1rem;
	padding: 1rem 0;
	font-size: 1.6rem;
	font-weight: 500;
	color: ${(props) =>
		props.value == props.name ? "hsl(212, 28%, 28%)" : "hsl(0, 0%, 66%)"};
	margin-right: 1.4rem;
`

export const TableRowActions = styled.div`
	display: flex;
	justify-content: space-evenly;

	button:last-child {
		svg {
			height: 1.4rem;
			width: 1.4rem;

			path {
				stroke: hsl(0, 0%, 66%);
			}
		}
	}
`