import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import InputComponent from "../../components/common/InputComponent";
import { useRouter } from "next/router";
import {
    Background,
    PrimaryButton,
    Title,
    TextButton,
    Spinner,
} from "../../components/styles/GlobalComponents";
import { login } from "../../components/utilities/apis";
import Alert from "../../components/common/Alert";
import breakpointGenerator from "../../components/utilities/breakpoint";
import { BreakpointLG, BreakpointMD } from "../../components/styles/Breakpoints";
import useAlert from "../../hooks/useAlert";
import { GooSpinner } from "react-spinners-kit";

const BackgroundCustom = styled(Background)`
    width: 100%;

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

const LoginContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;

    ${
        breakpointGenerator({
            large: css`
                position: static;
                max-width: 32rem;
                margin-top: 2.8rem;
            `
        })
    }
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 24px;
    font-weight: 500;
    padding: 3rem 5.45rem 0;
    background-color: white;

    > div:not(:last-child) {
        margin-bottom: 2.4rem;
    }

    ${
        breakpointGenerator({
            medium: css`
                > div {
                    max-width: 36rem;
                }
            `,

            large: css`
                padding: 0;
                margin-top: 2.8rem;
            `
        })
    }
`;

const PrimaryButtonCustom = styled(PrimaryButton)`
    font-size: 2.4rem;
    background-color: hsl(212, 28%, 28%);
    font-weight: 500;
    align-self: center;

    ${Spinner} {
        > div {
            > div {
                > div:first-child {
                    background-color: white;
                }

                > div:last-child {
                    background-color: white;
                }
            }
        }
    }
`;

const SignUpContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2.6rem 0;
    font-size: 2rem;
    color: hsl(217, 16%, 16%);
    background-color: white;

    > button {
        margin-top: 0.6rem;
    }

    ${
        breakpointGenerator({
            large: css`
                position: static;
                background-color: transparent;
                margin-top: 2rem;
            `
        })
    }
`;

const RadioInput = styled.button`
    font-size: 2rem;
    font-weight: 700;
    width: 50%;
    padding: 1.4rem 0;
    text-align: center;
    background-color: hsl(16, 56%, 51%);
    color: white;

    &:last-child {
        border-top-right-radius: 3.6rem;
    }

    &:first-child {
        border-top-left-radius: 3.6rem;
    }

    ${(props) => css`
        ${props.value === props.name && `
            background-color: white;
            color: hsl(16, 56%, 51%);
        `}
        ${breakpointGenerator({
            large: `
                border: 2px solid hsl(16, 56%, 51%);
                background-color: white;
                color: hsl(16, 56%, 51%);
                padding: 1.2rem 0;

                &:last-child {
                    border-radius: 0 10px 10px 0;
                    border-left: 0;
                }

                &:first-child {
                    border-radius: 10px 0 0 10px;
                    border-right: 0;
                }

                ${
                    props.value === props.name && `
                        background-color: hsl(16, 56%, 51%);
                        color: white;
                    `
                }
            `
        })}        
    `}
`;

const TitleContainer = styled.div`
    color: hsl(16, 56%, 51%);
    font-size: 24px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 5.5%;
    left: 7.5%;

    div {
        margin-bottom: 1rem;

        ${
        breakpointGenerator({
            large: css`
                margin-bottom: 2.8rem;
            `
        })
    }
    }

    ${
        breakpointGenerator({
            large: css`
                position: static;
            `
        })
    }
`;

const LoginPage = () => {
    const router = useRouter();
    const [role, setRole] = useState("shipper");
    const [auth, setAuth] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false)
    const { setAlert } = useAlert()

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            router.push("/jobs");
        }
    }, []);

    useEffect(() => {
        const statusCode = parseInt(router.query.errorStatus as string);
        const ExpiredToken = statusCode === 100;
        const inValidToken = statusCode === 200;
        if (ExpiredToken || inValidToken) {
            if (ExpiredToken) {
                setAlert(true, "error", "ลิงก์ของคุณหมดอายุ กรุณาเข้าสู่ระบบเพื่อส่งอีเมลยืนยันอีกครั้ง")
            } else {
                setAlert(true, "error", "ลิงก์ของคุณไม่ถูกต้อง กรุณาเข้าสู่ระบบเพื่อส่งอีเมลยืนยันอีกครั้ง")
            }
        }
    }, [router.query]);

    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAuth({ ...auth, [e.target.name]: value });
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        const loginResponse = await login(role, auth);
        setIsLoading(false)
        if (loginResponse === 200) {
            router.push("/jobs");
        } else {
            if (loginResponse === 400) {
                setAlert(true, "error", "รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
            } else if (loginResponse === 404) {
                setAlert(true, "error", "ไม่พบบัญชีผู้ใช้ กรุณาลงทะเบียนก่อนเข้าสู่ระบบ")
            } else {
                setAlert(true, "error", "เข้าสู่ระบบไม่สำเร็จ")
            }
        }
    };

    return (
        <>
        <Alert />
        <BackgroundCustom>
            <div>
                <BreakpointMD>
                    <TitleContainer>
                        <Title>เข้าสู่ระบบ</Title>
                        <BreakpointMD>{role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}</BreakpointMD>
                    </TitleContainer>
                </BreakpointMD>
                <LoginContainer>
                    <BreakpointLG>
                        <TitleContainer>
                            <Title>เข้าสู่ระบบ</Title>
                            <BreakpointMD>{role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}</BreakpointMD>
                        </TitleContainer>
                    </BreakpointLG>
                    <div>
                        <RadioInput
                            type="button"
                            value={role}
                            name="shipper"
                            onClick={() => setRole("shipper")}
                        >
                            ผู้ส่ง
                        </RadioInput>
                        <RadioInput
                            type="button"
                            value={role}
                            name="carrier"
                            onClick={() => setRole("carrier")}
                        >
                            ขนส่ง
                        </RadioInput>
                    </div>
                    <InputContainer onSubmit={handleLogin}>
                        <InputComponent
                            labelSize="large"
                            labelTH="ชื่อผู้ใช้"
                            labelEN="Username"
                            name="username"
                            required={false}
                            value={auth.username}
                            handleOnChange={handleInputOnChange}
                        />
                        <InputComponent
                            type="password"
                            labelSize="large"
                            labelTH="รหัสผ่าน"
                            labelEN="Password"
                            name="password"
                            required={false}
                            value={auth.password}
                            handleOnChange={handleInputOnChange}
                        />
                        <PrimaryButtonCustom type="submit">
                            {
                                isLoading ? <Spinner><GooSpinner size={30} /></Spinner> : "เข้าสู่ระบบ"
                            }
                        </PrimaryButtonCustom>
                    </InputContainer>
                    <SignUpContainer>
                        ยังไม่ได้ลงทะเบียน?
                        <TextButton onClick={() => router.push(`/signup/${role}`)}>
                            ลงทะเบียน{role === "shipper" ? "ผู้ส่ง" : "ขนส่ง"}
                        </TextButton>
                    </SignUpContainer>
                </LoginContainer>
            </div>
        </BackgroundCustom>
        </>
    );
};

export default LoginPage;
