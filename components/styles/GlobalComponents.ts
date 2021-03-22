import styled, { css } from 'styled-components'
import breakpointGenerator from '../utilities/breakpoint'
import { breakpointSize } from './Breakpoints'

export const Background = styled.div`
	background: url('/images/main-bg.png');
	background-size: cover;
	height: 82vh;
	background-position: center center;

	${
		breakpointGenerator({
			medium: css`
				background-position: 0 -40px;
			`,

			large: css`
				background: url('/images/main-bg-desktop.png') no-repeat fixed;
				background-size: auto 100%;
				height: 100%;
				min-height: 100vh;
				background-position: -120px 0;
			`,
			
			extraLarge: css`
				background-position: 0;
			`
		})
	}

	@media screen and (min-width: ${breakpointSize.medium}px) and (max-width: ${breakpointSize.large}px) and (min-height: 980px) {
		background-position: -280px 0;
	}

	@media screen and (min-width: ${breakpointSize.large}px) and (max-width: 1600px) and (min-height: 980px) {
		background-position: -100px 0;
	}

	@media screen and (min-width: ${breakpointSize.medium}px) and (max-width: ${breakpointSize.large}px) and (min-height: 1200px) {
		background-position: -400px 0;
	}

	@media screen and (min-width: ${breakpointSize.large}px) and (max-width: 1600px) and (min-height: 1200px) {
		background-position: -250px 0;
	}
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

export const HeaderTitle = styled.header`
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

	${breakpointGenerator({
		large: css`
			padding: 1.6rem 0;
			align-self: center;
			width: 100%;

			header {
				font-size: 2rem;
			}

			button {
				align-self: center;
			}
		`
	})}
`

export const Form = styled.form`
	margin: 4.2rem;
	display: flex;
	flex-direction: column;

	> div > div:not(:first-child) {
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

	${
		breakpointGenerator({
			medium: css`
				display: grid;
				margin: 0;
				grid-template-columns: 1fr 2fr;
				min-height: 100vh;
				height: 100%;

				> div:last-child {
					margin: 4.2rem;
					max-width: 45rem;
				}
			`,

			large: css`
				> div:last-child {
					margin-left: 6.4rem;
				}
			`
		})
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

export const NumberOfJobs = styled.div`
	border-radius: 100%;
	background-color: hsl(16, 56%, 51%);
	color: white;
	font-size: 1.2rem;
	text-align: center;
	position: absolute;
	left: 55%;
	width: 2.1rem;
	height: 2.1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const Pagination = styled.div`
	display: flex;
    align-items: center;
	color: hsl(16, 56%, 51%);
	font-weight: 700;
	width: 50%;
    max-width: 16rem;
    justify-content: space-between;

	> span {
		padding: 0 0.8rem;
		text-align: center;
		width: 40%;
	}

	button {
		display: flex;
		
		svg {
			height: 1.6rem;
			width: 1.6rem;

			path {
				fill: hsl(16, 56%, 51%);
			}
		}

		&:disabled {
			svg path {
				fill: hsl(0, 0%, 93%);
			}
		}

		&:nth-child(-n + 2) {
			transform: rotate(-180deg)
		}
	}
`

export const RadioButton = styled.div`
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    border: 0.1rem solid hsl(16, 56%, 51%);
    border-radius: 50%;
    margin: auto;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 0 0 6px hsl(16, 56%, 51%, 10%);
    }

    svg {
        width: 2.7rem;
        height: 2.7rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        #circle {
            display: none;
        }

        #check {
            fill: transparent;
        }
    }

    input {
        position: absolute;
        height: 1.6rem;
        width: 1.6rem;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        opacity: 0;

        &:checked {
            & ~ svg {
                #check {
                    fill: white;
                }

                #background {
                    fill: hsl(16, 56%, 51%);
                }
            }
        }
    }
`;

export const HeaderTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;

	${HeaderTitle} {
		color: hsl(212, 28%, 28%);
        font-weight: 600;
	}

	${PrimaryButton} {
		background-color: hsl(212, 28%, 28%);
		padding: 0.6rem 1.6rem;
		border-radius: 6px;
	}
`

export const StatusHeader = styled.div`
	font-size: 2.4rem;
	font-weight: 600;
	margin-bottom: 1.4rem;
	display: flex;
	justify-content: space-between;

	> span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 0.6rem;
	}
`

export const SeeAllButton = styled.button`
	font-size: 1.8rem;
	text-decoration: none;
	font-weight: 500;
	white-space: nowrap;

	svg {
		margin-left: 0.8rem;
	}

	${breakpointGenerator({
		large: css`
			font-size: 1.6rem;
		`
	})}
`

export const FilterContainer = styled.div`
	font-size: 1.4rem;
	display: flex;
	align-items: center;
	width: 50%;

	&#date {
		flex-direction: column;
		align-items: flex-start;
		width: 100%;

		${breakpointGenerator({
			large: css`
				align-items: center;
				flex-direction: row;
			`
		})}
	}

	&#option {
		width: 100%;

		> ${ButtonGroupContainer} {
			width: 100%;
			grid-template-columns: repeat(auto-fill, 8.5rem);

			${ButtonItem} {
				font-size: 1.4rem;
				height: 3.2rem;
				width: 8.2rem;
				padding: 0;
			}
		}
	}

	input {
		margin-top: 0;
		font-size: 1.4rem;
		height: 3.2rem;

		& ~ div {
			font-size: 1.4rem;
			margin-left: 1.4rem;
		}
	}

	> svg {
		margin-right: 0.5rem;
		min-height: 1.8rem;
		min-width: 1.8rem;
	}

	> div {
		margin-top: 0;

		&.MuiInputBase-root {
			width: 70%;
			max-width: 17rem;
			min-width: 12rem;
			font-size: 1.4rem;
			height: 2.8rem;

			> svg {
				height: 2.6rem;
				width: 2.6rem;
				padding: 0.9rem;
			}
		}
		
		.react-datepicker__input-container input {
			font-size: 1.4rem;
			margin-top: 0;
			height: 3.2rem;
		}
	}

	> span {
		margin: 0 1.4rem;
	}
`

export const FilterLabel = styled.div`
white-space: nowrap;
display: flex;
margin-right: 2rem;

svg {
	margin-right: 10%;
	min-height: 20px;
	min-width: 20px; 
	height: 20px;
	width: 20px; 
	
	#truck {
		stroke: hsl(16, 56%, 51%);
		stroke-width: 3px;
	}
}
`

export const RadioInputContainer = styled.div`
	display: flex;
	margin-top: 1rem;
	width: 100%;
`

export const RadioInput = styled.button`
	font-size: 1.6rem;
	width: 50%;
	padding: 1rem 0;
	text-align: center;
	border: solid 0.2rem hsl(212, 28%, 28%);
	${props => props.value === props.name &&
		`
		background-color: hsl(212, 28%, 28%);
		color: white;
	`}

	&:first-child {
		border-top-left-radius: 0.6rem;
		border-bottom-left-radius: 0.6rem;
	}

	&:last-child {
		border-top-right-radius: 0.6rem;
		border-bottom-right-radius: 0.6rem;
	}
`