import React from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { PersonIcon, JobIcon, SearchIconLarge } from "./Icons";
import { userInfoState } from "../../store/atoms/userInfoState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getUserInfo } from "../utilities/tokenHelper";
import useAlert from "../../hooks/useAlert";
import { BreakpointLG } from "../styles/Breakpoints";
import breakpointGenerator from "../utilities/breakpoint";
import Header from "./Header";

interface NavBarInterface {
	activeIndex: number
}

interface NavBarItemInterface {
	isActive: boolean;
}

const NavBarBlank = styled.div`
	margin-left: 7rem;
`

const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 6.2rem;
    box-shadow: 0 -0.2rem 1.4rem 0 hsla(0, 0%, 0%, 0.1);
    background-color: white;
    z-index: 1;
	padding: 0 1.2rem;

	${breakpointGenerator({
	large: css`
		background-color: hsl(212, 28%, 28%);
		min-height: 100vh;
		position: fixed;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 7rem;
		transition: all 0.3s ease-in-out;
		padding-left: 1.2rem;

		> div header {
			opacity: 0;
			white-space: nowrap;
			transition: all 0.3s ease-in-out;
		}

		&:hover {
			width: 20rem;

			> div {
				header {
					opacity: 1;
				}

				button {
					align-self: flex-end;
				}
			} 

			> button {
				width: 18rem;
			}
		}
	`
})}
`;

const NavBarItem = styled.button<NavBarItemInterface>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: hsl(212, 28%, 28%);
    font-weight: 600;
    font-size: 1rem;
	transition: all 0.3s ease-in-out;
	
    > svg {
		width: 3.8rem;
        height: 3.8rem;
    }
	
	${(props) => css`
		${props.isActive && `
			background-color: hsl(212, 29%, 90%);
			border-radius: 0.6rem;
			padding: 0 0.75rem;
		`}
		${breakpointGenerator({
			large: `
				flex-direction: row;
				font-size: 2rem;
				color: white;
				white-space: nowrap;
				font-weight: 500;
				overflow: hidden;
				width: 4.5rem;

				> svg {
					min-height: 4.5rem;
					min-width: 4.5rem;
					margin-right: 1.2rem;
					
					path {
						fill: white;

						&#person {
							fill: none;
							stroke: white;
						}
					}
				}

				> span {
					opacity: 1;
				}

				&:not(:first-child) {
					margin-top: 4.4rem;
				}

				${props.isActive && `
					background-color: hsl(212, 29%, 90%);
					border-radius: 0.6rem;
					padding: 0;
					color: hsl(212, 28%, 28%);

					> svg {
						min-height: 4.5rem;
						min-width: 4.5rem;
						margin-right: 1.2rem;
					
						path {
							fill: hsl(212, 28%, 28%);

							&#person {
								fill: none;
								stroke: hsl(212, 28%, 28%);
							}
					}
				}
				`}
			`
		})}
	`}
	
`;

const NavigationBar = (props: NavBarInterface) => {
	const { activeIndex } = props
	const router = useRouter();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const { setAlert } = useAlert()

	useEffect(() => {
		const decodedUserInfo = getUserInfo();
		setUserInfo(decodedUserInfo);
	}, []);

	const changePage = (route: string) => {
		setAlert(false, "", "")
		router.push(route)
	}

	return (
		userInfo ? (<>
			<NavBarBlank />
			<NavBarContainer>
				<BreakpointLG>
					<Header enabledSetting={true}>
						{userInfo.displayName}
					</Header>
				</BreakpointLG>
				<NavBarItem
					onClick={() =>
						changePage(`/${userInfo.role}/jobs?status=all`)
					}
					isActive={activeIndex === 0}
				>
					<JobIcon />
					<span>งานของฉัน</span>
				</NavBarItem>
				<NavBarItem
					onClick={() => changePage(`/jobs`)}
					isActive={activeIndex === 1}
				>
					<SearchIconLarge />
					<span>ค้นหางาน</span>
				</NavBarItem>
				<NavBarItem
					onClick={() => changePage(`/${userInfo.role}/profile`)}
					isActive={activeIndex === 2}
				>
					<PersonIcon />
					<span>บัญชีของฉัน</span>
				</NavBarItem>
			</NavBarContainer>
		</>) : <div />
	);
};

export default NavigationBar;
