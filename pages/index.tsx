import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { LogpostIcon } from "../components/common/Icons";
import {
    PrimaryButton,
    TextButton,
    Background,
} from "../components/styles/GlobalComponents";
import breakpointGenerator from "../components/utilities/breakpoint";

const BackgroundCustom = styled(Background)`
    ${
        breakpointGenerator({
            large: css`
                display: grid;
                grid-template-columns: 1fr 1fr;

                > div {
                    grid-column-start: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            `,

            extraLarge: css`
                grid-template-columns: 1fr 1.2fr;
            `
        })
    }
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

    ${
        breakpointGenerator({
            large: css`
                font-size: 3.2rem;
                position: static;

                svg {
                    height: 4.6rem;
                    width: auto;
                }
            `
        })
    }
`;

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

    ${
        breakpointGenerator({
            large: css`
                position: static;
                box-shadow: none;
                background-color: transparent;
                padding: 0;
                margin-top: 6rem;
            `
        })
    }
`;

const PrimaryButtonCustom = styled(PrimaryButton)`
    background-color: hsl(212, 28%, 28%);
    font-size: 2.4rem;

    &:not(:first-child) {
        margin-top: 3rem;
        background-color: hsl(217, 16%, 16%);
    }
`;

const TextButtonCustom = styled(TextButton)`
    margin-top: 2.6rem;
`;

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            router.push("/jobs");
        }
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, path: string) => {
        e.preventDefault();
        router.push(`/signup/${path}`);
    };

    return (
        <BackgroundCustom>
            <div>
                <LogoContainer>
                    <LogpostIcon />
                    แหล่งรวมงานขนส่ง
                </LogoContainer>
                <SignUpContainer>
                    <PrimaryButtonCustom onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e, "shipper")}>
                        ลงทะเบียนผู้ส่ง
                    </PrimaryButtonCustom>
                    <PrimaryButtonCustom onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e, "carrier")}>
                        ลงทะเบียนขนส่ง
                    </PrimaryButtonCustom>
                    <TextButtonCustom onClick={() => router.push("/login")}>
                        เข้าสู่ระบบ
                    </TextButtonCustom>
                </SignUpContainer>
            </div>
        </BackgroundCustom>
    );
};

export default Home;
