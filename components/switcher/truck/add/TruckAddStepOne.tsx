import React, { useState } from 'react'
import { TRUCK_TYPE_LIST } from '../../../../data/carrier'
import InputComponent from '../../../common/InputComponent'
import Progress from '../../../common/Progress'
import SelectComponent from '../../../common/SelectComponent'
import { FormActions, PrimaryButton, SecondaryButton, FormInputContainer, FormHeader, ButtonGroupContainer, ButtonItem } from '../../../styles/GlobalComponents'
import { useRouter } from 'next/router'
import { TruckAddInterface } from '../../../../entities/interface/truck'

const TruckAddStepOne = (props: TruckAddInterface) => {
	const { details, setDetails } = props
	const router = useRouter()
	const [truckProperty, setTruckProperty] = useState(details.property)
	const [truckWeight, setTruckWeight] = useState(details.weight)

	const handleWeightOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value
		if (/^\s/.test(value)) {
            value = ''
        }
		setTruckWeight({ ...truckWeight, [e.target.name]: parseInt(value) })
	}

	const submitDetails = () => {
		setDetails({
			...details,
			weight: truckWeight,
			property: truckProperty,
		})
		router.push(`/carrier/truck/add/2`, undefined, { shallow: true })
	}

	return (
		<div>
			<FormHeader>
				<Progress currentStep="ข้อมูลรถส่วนที่ 1" nextStep="ข้อมูลรถส่วนที่ 2" percent={1 / 2} />
			</FormHeader>
			<FormInputContainer>
				<InputComponent labelTH="ประเภทรถ" labelEN="Truck Type" type="other">
					<SelectComponent
						menuList={Object.keys(TRUCK_TYPE_LIST)}
						value={truckProperty.type}
						setValue={(value: string) => setTruckProperty({ ...truckProperty, type: value })}
					/>
				</InputComponent>
				<InputComponent labelTH="ส่วนเสริม" labelEN="Option" type="other">
					<ButtonGroupContainer>
						{
							TRUCK_TYPE_LIST[truckProperty.type].option.map((option: string, index: number) => {
								return (
									<ButtonItem
										key={index}
										onClick={() => setTruckProperty({ ...truckProperty, option: option })}
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
											onClick={() => setTruckProperty({ ...truckProperty, chassis: chassis })}
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
						handleOnChange={handleWeightOnChange}/>
					<InputComponent 
						disableLabel={true}
						subLabel="สูงสุด" 
						type="number" 
						classifier="ตัน"
						name="max"
						handleOnChange={handleWeightOnChange}/>
				</div>
				<FormActions>
					<SecondaryButton onClick={() => router.back()}>ยกเลิก</SecondaryButton>
					<PrimaryButton onClick={submitDetails}>ส่วนถัดไป</PrimaryButton>
				</FormActions>
			</FormInputContainer>
		</div>
	)
}

export default TruckAddStepOne
