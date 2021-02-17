import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { DRIVER_LICENSE_TYPE, TRUCK_TYPE_LIST } from '../../data/carrier'
import { JobFormInterface } from '../../entities/interface/job'
import { jobStepThreeSelector, jobDetailsState } from '../../store/atoms/jobDetailsState'
import { ButtonGroupContainer, ButtonItem, FormInputContainer } from '../styles/GlobalComponents'
import { handleChangedField } from '../utilities/helper'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'

const JobFormStepThree = (props: JobFormInterface) => {
    const { changedField, setChangedField } = props

    const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)
    const stepThreeDetails = useRecoilValue(jobStepThreeSelector)
    const truckType = stepThreeDetails.carrier_specification.truck.property.type

    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
        const field = e.target.name
        handleChangedField(changedField, setChangedField, ["carrier_specification"])
		setJobDetails({ 
            ...jobDetails, carrier_specification: {
                ...jobDetails.carrier_specification,
                truck: {
                    ...jobDetails.carrier_specification.truck,
                    [field]: value
                }
            }
        })
    }

    const handleDriverOnChange = (field: string, value: (string | number)) => {
        handleChangedField(changedField, setChangedField, ["carrier_specification"])
		setJobDetails({ 
            ...jobDetails, carrier_specification: {
                ...jobDetails.carrier_specification,
                driver: {
                    ...jobDetails.carrier_specification.driver,
                    [field]: value
                }
            }
        })
    }
    
    const handleTruckOnChange = (field: string, value: (string | number)) => {
        handleChangedField(changedField, setChangedField, ["carrier_specification"])
        setJobDetails({ 
            ...jobDetails, carrier_specification: {
                ...jobDetails.carrier_specification,
                truck: {
                    ...jobDetails.carrier_specification.truck,
                    property: {
                        ...jobDetails.carrier_specification.truck.property,
                        [field]: value
                    }
                }
            }
        })
    }

    
    return (
        <FormInputContainer>
            <InputComponent labelTH="ประเภทรถ" labelEN="Truck Type" type="other">
                <SelectComponent
                    menuList={Object.keys(TRUCK_TYPE_LIST)}
                    value={truckType}
                    setValue={(value: string) => handleTruckOnChange("type", value)}
                />
            </InputComponent>
            <InputComponent labelTH="ส่วนเสริม" labelEN="Option" type="other">
                <ButtonGroupContainer>
                    {
                        TRUCK_TYPE_LIST[truckType].option.map((option: string, index: number) => {
                            return (
                                <ButtonItem
                                    key={index}
                                    onClick={() => handleTruckOnChange("option", option)}
                                    name={option}
                                    value={stepThreeDetails.carrier_specification.truck.property.option}
                                >
                                    {option}
                                </ButtonItem>
                            )
                        })
                    }
                </ButtonGroupContainer>
            </InputComponent>
            {
                TRUCK_TYPE_LIST[truckType].chassis && 
                <InputComponent labelTH="จำนวนเพลา" labelEN="Chassis" type="other">
                    <ButtonGroupContainer>
                        {
                            TRUCK_TYPE_LIST[truckType].chassis.map((chassis: number, index: number) => {
                                return (
                                    <ButtonItem
                                        key={index}
                                        onClick={() => handleTruckOnChange("chassis", chassis)}
                                        name={String(chassis)}
                                        value={String(stepThreeDetails.carrier_specification.truck.property.chassis)}
                                    >
                                        {`${chassis} เพลา`}
                                    </ButtonItem>
                                )
                            })
                        }
                    </ButtonGroupContainer>
                </InputComponent>
            }
            <InputComponent
                name="age"
                labelTH="อายุรถสูงสุด"
                labelEN="Maximum Truck Age"
                type="number"
                classifier="ปี"
                required={false}
                value={`${stepThreeDetails.carrier_specification.truck.age}`}
                handleOnChange={handleInputOnChange}
            />
            <InputComponent
                name="driver_license_type"
                labelTH="ประเภทใบขับขี่"
                labelEN="Driver License Type"
                type="other"
            >
                <SelectComponent 
                    menuList={DRIVER_LICENSE_TYPE}
                    value={stepThreeDetails.carrier_specification.driver.driver_license_type}
                    setValue={(value: string) => handleDriverOnChange("driver_license_type", value)}
                />
            </InputComponent>
        </FormInputContainer>
    )
}

export default JobFormStepThree
