import React from 'react'
import styled from "styled-components"
import Progress from '../../../common/Progress'

const Header = styled.div`
	background-color: hsl(0, 0%, 98%);
	padding: 1.4rem 2.4rem;
`

const CarAddStepOne = () => {
	return (
		<Header>
			<Progress currentStep="ข้อมูลรถส่วนที่ 1" nextStep="ข้อมูลรถส่วนที่ 2" percent={1 / 2} />
		</Header>
			
	)
}

export default CarAddStepOne
