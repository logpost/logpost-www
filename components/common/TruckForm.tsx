import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { GASOLINE_LIST, TRUCK_TYPE_LIST } from '../../data/carrier'
import { truckDetailsState, truckPropertySelector, truckWeightSelector } from '../../store/atoms/truckDetailsState'
import { ButtonGroupContainer, ButtonItem } from '../styles/GlobalComponents'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'

const TruckForm = () => {
    const [truckDetails, setTruckDetails] = useRecoilState(truckDetailsState)
	const truckProperty = useRecoilValue(truckPropertySelector)
    const truckWeight = useRecoilValue(truckWeightSelector)

    const handleWeightOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value
		if (/^\s/.test(value)) {
            value = ''
        }
		setTruckDetails({ 
            ...truckDetails, weight: {
                ...truckDetails.weight,
                [e.target.name]: parseInt(value) 
            }
        })
    }
    
    const handlePropertyOnChange = (field: string, value: (string | number)) => {
        setTruckDetails({ 
            ...truckDetails, property: {
                ...truckDetails.property,
                [field]: value
            }
        })
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (e.target.type === "number") {
			setTruckDetails({ ...truckDetails, [e.target.name]: parseInt(value) })
		} else {
			setTruckDetails({ ...truckDetails, [e.target.name]: value })
		}
    }
    
    return (
        <>
            <InputComponent labelTH="ประเภทรถ" labelEN="Truck Type" type="other">
                <SelectComponent
                    menuList={Object.keys(TRUCK_TYPE_LIST)}
                    value={truckProperty.type}
                    setValue={(value: string) => handlePropertyOnChange("type", value)}
                />
            </InputComponent>
            <InputComponent labelTH="ส่วนเสริม" labelEN="Option" type="other">
                <ButtonGroupContainer>
                    {
                        TRUCK_TYPE_LIST[truckProperty.type].option.map((option: string, index: number) => {
                            return (
                                <ButtonItem
                                    key={index}
                                    onClick={() => handlePropertyOnChange("option", option)}
                                    name={option}
                                    value={truckProperty.option}
                                >
                                    {option}
                                </ButtonItem>
                            )
                        })
                    }
                </ButtonGroupContainer>
            </InputComponent>
            {
                TRUCK_TYPE_LIST[truckProperty.type].chassis && 
                <InputComponent labelTH="จำนวนเพลา" labelEN="Chassis" type="other">
                    <ButtonGroupContainer>
                        {
                            TRUCK_TYPE_LIST[truckProperty.type].chassis.map((chassis: number, index: number) => {
                                return (
                                    <ButtonItem
                                        key={index}
                                        onClick={() => handlePropertyOnChange("chassis", chassis)}
                                        name={String(chassis)}
                                        value={String(truckProperty.chassis)}
                                    >
                                        {`${chassis} เพลา`}
                                    </ButtonItem>
                                )
                            })
                        }
                    </ButtonGroupContainer>
                </InputComponent>
            }
            <div>
                <InputComponent 
                    labelTH="น้ำหนักบรรทุก" 
                    labelEN="Load Weight"
                    subLabel="ต่ำสุด" 
                    type="number" 
                    description="1 ตัน = 1,000 กิโลกรัม"
                    classifier="ตัน"
                    name="min"
                    value={truckWeight.min}
                    handleOnChange={handleWeightOnChange}/>
                <InputComponent 
                    disableLabel={true}
                    subLabel="สูงสุด" 
                    type="number" 
                    classifier="ตัน"
                    name="max"
                    value={truckWeight.max}
                    handleOnChange={handleWeightOnChange}/>
            </div>
            <InputComponent labelTH="น้ำมันรถ" labelEN="Gasoline" type="other">
                <SelectComponent
                    menuList={GASOLINE_LIST}
                    value={truckDetails.gasoline}
                    setValue={(value: string) => setTruckDetails({ ...truckDetails, gasoline: value })}
                />
            </InputComponent>
            <InputComponent 
                name="license_number" 
                labelTH="เลขทะเบียน" 
                labelEN="License Number" 
                type="short" 
                value={truckDetails.license_number}
                handleOnChange={handleOnChange} 
            />
            <InputComponent 
                name="age" 
                labelTH="อายุรถบรรทุก" 
                labelEN="Truck Age" 
                type="number" 
                classifier="ปี" 
                required={false} 
                value={truckDetails.age}
                handleOnChange={handleOnChange} />
            <InputComponent labelTH="ประกันภัย" labelEN="Insurance" type="other" required={false}>
                <ButtonGroupContainer>
                    <ButtonItem
                        onClick={() => setTruckDetails({ ...truckDetails, is_insure: true })}
                        name="true"
                        value={String(truckDetails.is_insure)}
                    >
                        มีประกัน
                    </ButtonItem>
                    <ButtonItem
                        onClick={() => setTruckDetails({ ...truckDetails, is_insure: false })}
                        name="false"
                        value={String(truckDetails.is_insure)}
                    >
                        ไม่มีประกัน
                    </ButtonItem>
                </ButtonGroupContainer>
            </InputComponent>
        </>
    )
}

export default TruckForm
