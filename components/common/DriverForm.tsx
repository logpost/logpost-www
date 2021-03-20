import React, { useState } from 'react'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'
import { DRIVER_LICENSE_TYPE } from '../../data/carrier'
import { useRecoilState, useRecoilValue } from 'recoil'
import { driverDetailsState, driverValidateState } from '../../store/atoms/driverDetailsState'
import styled, { css } from 'styled-components'
import breakpointGenerator from '../utilities/breakpoint'

const DriverFormContainer = styled.div`
    display: grid;
    grid-gap: 2rem 8.6rem;

    > div > div:not(:first-child) {
        margin-top: 2rem;
    }

    ${breakpointGenerator({
        large: css`
            display: grid;
            grid-template-columns: 1fr 1fr;
        `
    })}
`

const DriverForm = () => {
    const [driverDetails, setDriverDetails] = useRecoilState(driverDetailsState)
    const driverValidate = useRecoilValue(driverValidateState)

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value
		if (/^\s/.test(value)) {
            value = ''
        }
		if (e.target.type === "number") {
			setDriverDetails({ ...driverDetails, [e.target.name]: parseInt(value) })
		} else {
			setDriverDetails({ ...driverDetails, [e.target.name]: value })
		}
	}

	return (
		<DriverFormContainer>
            <div>
                <InputComponent 
                    name="name"
                    labelTH="ชื่อจริง - นามสกุล"
                    labelEN="Name"
                    value={driverDetails.name}
                    handleOnChange={handleOnChange}
                    valid={driverValidate.name}
                />
                <InputComponent 
                    name="identification_number"
                    labelTH="เลขบัตรประชาชน"
                    labelEN="ID Number"
                    value={driverDetails.identification_number}
                    handleOnChange={handleOnChange}
                    valid={driverValidate.identification_number}
                    invalidText="กรุณากรอกเลขบัตรประชาชน 13 หลัก"
                />
                <InputComponent 
                    name="driver_license"
                    labelTH="เลขใบอนุญาตขับขี่"
                    labelEN="Driver License"
                    value={driverDetails.driver_license}
                    handleOnChange={handleOnChange}
                    valid={driverValidate.driver_license}
                    invalidText="กรุณากรอกเลขใบอนุญาตขับขี่ 8 หลัก"
                />
            </div>
            <div>
                <InputComponent
                    name="driver_license_type"
                    labelTH="ประเภทใบขับขี่"
                    labelEN="Driver License Type"
                    type="other"
                >
                    <SelectComponent
                        menuList={DRIVER_LICENSE_TYPE}
                        value={driverDetails.driver_license_type}
                        setValue={(value: string) => setDriverDetails({...driverDetails, driver_license_type: value})}
                    />
                </InputComponent>
                <InputComponent 
                    name="age"
                    type="number"
                    labelTH="อายุ"
                    labelEN="Age"
                    value={driverDetails.age}
                    handleOnChange={handleOnChange}
                    classifier={"ปี"}
                    valid={driverValidate.age}
                    invalidText="พนักงานขับรถต้องมีอายุมากกว่า 18 ปี"
                />
                <InputComponent
                    name="tel"
                    labelTH="หมายเลขโทรศัพท์"
                    labelEN="Phone Number"
                    value={driverDetails.tel}
                    handleOnChange={handleOnChange}
                    valid={driverValidate.tel}
                    invalidText="กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก"
                />
            </div>
		</DriverFormContainer>
	)
}

export default DriverForm