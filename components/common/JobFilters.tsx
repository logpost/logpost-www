import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { TRUCK_TYPE_LIST } from '../../data/carrier'
import { PROVINCES } from '../../data/jobs'
import { filterWordState, jobFiltersState } from '../../store/atoms/tableState'
import { ButtonGroupContainer, ButtonItem, RadioButton, TextButton } from '../styles/GlobalComponents'
import DateAndTimePicker from './DateAndTimePicker'
import { DownArrowLine, JobSuccessIcon, OptionIcon, PriceIcon, RightArrow, TruckIcon, UpArrowLine, WeightIcon } from './Icons'
import InputComponent from './InputComponent'
import SearchBar from './SearchBar'
import SelectComponent from './SelectComponent'

interface FiltersContainerInterface {
	isExpand: boolean;
}

const FiltersContainer = styled.div<FiltersContainerInterface>`
	display: flex;
	flex-direction: column;
	margin-top: 1.4rem;
	width: 100%;
	max-height: ${(props) => props.isExpand ? "50rem" : "3.4rem"};
	transition: all 0.3s ease-in;

	> div:not(:first-child) {
		margin-top: 1.8rem;
	}
`

const FilterContainer = styled.div`
	font-size: 1.4rem;
	display: flex;
	align-items: center;
	width: 50%;

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

const FilterRow = styled.div`
	display: flex;
	align-items: center;

	${FilterContainer}:not(:first-child) {
		margin-left: 1.4rem;
	}

	&:not(:first-child) {
		justify-content: flex-start;

		> div {
			width: auto;
		}
	}

	&:first-child {
		justify-content: space-between;

		> div {
			display: flex;
			width: 80%;

			> div:first-child {
				border: 1px solid hsl(0, 0%, 66%);
				background-color: white;
				min-width: 15rem;
				height: max-content;
		
				input {
					background-color: white;
				}
			}
		}

		${TextButton} {
			text-decoration: none;
			font-size: 1.4rem;
			justify-self: flex-end;

			svg {
				transform: rotate(90deg);
				margin-left: 0.8rem;
			}
		}
	}
`

const RadioContainer = styled.div`
	display: flex;
	margin-right: 1.4rem;
	
	> div {
		display: flex;

		&:last-child {
			margin-left: 1.4rem;
		}

		${RadioButton} {
			margin: 0;
		}

		> span {
			margin-left: 1rem;
			white-space: nowrap;
		}
	}
`

const FilterLabel = styled.div`
	white-space: nowrap;
	display: flex;
	margin-right: 1.4rem;

	svg {
		margin-right: 1rem;
		height: 20px;
		width: 20px; 
		
		#truck {
			stroke: hsl(16, 56%, 51%);
			stroke-width: 3px;
		}
	}
`

const JobFilters = () => {
    const setFilterWord = useSetRecoilState(filterWordState)
    const [jobFilters, setJobFilters] = useRecoilState(jobFiltersState)
    const [showMoreFilter, setShowMoreFilter] = useState(false)

    const filterDate = (filterField: string, targetField: string, value: (Date | boolean)) => {
		const updateFilterDate = {
			...jobFilters,
			[filterField]: {
				...jobFilters[filterField],
				[targetField]: value
			}
		}
		setJobFilters(updateFilterDate)
	}

    return (
        <FiltersContainer isExpand={showMoreFilter}>
            <FilterRow>
                <div>
                    <SearchBar
                        placeholder="ค้นหาจังหวัด สินค้า ประเภทรถ ฯลฯ"
                        setValue={setFilterWord}
                    />
                    <FilterContainer>
                        <FilterLabel>
                            <UpArrowLine />
                            <span>ต้นทาง</span>
                        </FilterLabel>
                        <SelectComponent
                            value={jobFilters.pickup_province}
                            setValue={(value: string) => setJobFilters({ ...jobFilters, pickup_province: value })}
                            menuList={["ทั้งหมด", ...PROVINCES]}
                        />
                    </FilterContainer>
                    <FilterContainer>
                        <FilterLabel>
                            <DownArrowLine />
                            <span>ปลายทาง</span>
                        </FilterLabel>
                        <SelectComponent
                            value={jobFilters.dropoff_province}
                            setValue={(value: string) => setJobFilters({ ...jobFilters, dropoff_province: value })}
                            menuList={["ทั้งหมด", ...PROVINCES]}
                        />
                    </FilterContainer>
                </div>
                <TextButton onClick={() => setShowMoreFilter(!showMoreFilter)}>
                    <span>แสดงตัวกรองอื่น ๆ</span>
                    <RightArrow/>
                </TextButton>
            </FilterRow>
            {
                showMoreFilter && <>
                <FilterContainer>
                    <FilterLabel>
                        <UpArrowLine />
                        <span>วันขึ้นสินค้า</span>
                    </FilterLabel>
                    <RadioContainer>
                        <div>
                            <RadioButton>
                                <input 
                                    defaultChecked 
                                    type="radio" 
                                    value="ทุกวัน" 
                                    name="pickup_date" 
                                    onChange={() => filterDate("pickup_date", "isFilter", false)} />
                                <JobSuccessIcon />
                            </RadioButton>
                            <span>ทุกวัน</span>
                        </div>
                        <div>
                            <RadioButton>
                                <input 
                                    type="radio" 
                                    value="เลือกช่วง" 
                                    name="pickup_date" 
                                    onChange={() => filterDate("pickup_date", "isFilter", true)} />
                                <JobSuccessIcon />
                            </RadioButton>
                            <span>เลือกช่วง</span>
                        </div>
                    </RadioContainer>
                    <DateAndTimePicker
                        dateAndTime={jobFilters.pickup_date.start}
                        setDateAndTime={(value: Date) => setJobFilters({...jobFilters, pickup_date: {...jobFilters.pickup_date, start: new Date(value.setHours(0, 0, 0, 0))}})}
                        hideTime={true}
                        disabledDate={!jobFilters.pickup_date.isFilter}
                        minDate={new Date(2000)}
                    />
                    <span>ถึง</span>
                    <DateAndTimePicker 
                        dateAndTime={jobFilters.pickup_date.end < jobFilters.pickup_date.start ? jobFilters.pickup_date.start : jobFilters.pickup_date.end}
                        setDateAndTime={(value: Date) => setJobFilters({...jobFilters, pickup_date: {...jobFilters.pickup_date, end: new Date(value.setHours(23, 59, 59, 999))}})}
                        minDate={jobFilters.pickup_date.start}
                        hideTime={true}
                        disabledDate={!jobFilters.pickup_date.isFilter}
                    />
                </FilterContainer>
                <FilterContainer>
                    <FilterLabel>
                        <DownArrowLine />
                        <span>วันลงสินค้า</span>
                    </FilterLabel>
                    <RadioContainer>
                        <div>
                            <RadioButton>
                                <input 
                                    defaultChecked 
                                    type="radio" 
                                    value="ทุกวัน" 
                                    name="dropoff_date" 
                                    onChange={() => filterDate("dropoff_date", "isFilter", false)} />
                                <JobSuccessIcon />
                            </RadioButton>
                            <span>ทุกวัน</span>
                        </div>
                        <div>
                            <RadioButton>
                                <input 
                                    type="radio" 
                                    value="เลือกช่วง" 
                                    name="dropoff_date" 
                                    onChange={() => filterDate("dropoff_date", "isFilter", true)} />
                                <JobSuccessIcon />
                            </RadioButton>
                            <span>เลือกช่วง</span>
                        </div>
                    </RadioContainer>
                    <DateAndTimePicker 
                        dateAndTime={jobFilters.dropoff_date.start}
                        setDateAndTime={(value: Date) => setJobFilters({...jobFilters, dropoff_date: {...jobFilters.dropoff_date, start: new Date(value.setHours(0, 0, 0, 0))}})}
                        hideTime={true}
                        disabledDate={!jobFilters.dropoff_date.isFilter}
                        minDate={new Date(2000)}
                    />
                    <span>ถึง</span>
                    <DateAndTimePicker 
                        dateAndTime={jobFilters.dropoff_date.end < jobFilters.dropoff_date.start ? jobFilters.dropoff_date.start : jobFilters.dropoff_date.end}
                        setDateAndTime={(value: Date) => setJobFilters({...jobFilters, dropoff_date: {...jobFilters.dropoff_date, end: new Date(value.setHours(23, 59, 59, 999))}})}
                        minDate={jobFilters.dropoff_date.start}
                        hideTime={true}
                        disabledDate={!jobFilters.dropoff_date.isFilter}
                    />
                </FilterContainer>
                <FilterRow>
                    <FilterContainer>
                        <FilterLabel>
                            <WeightIcon />
                            <span>น้ำหนัก ไม่เกิน</span>
                        </FilterLabel>
                        <InputComponent
                            type="number"
                            classifier="ตัน"
                            disableLabel={true}
                            value={jobFilters.weight}
                            handleOnChange={(e) => setJobFilters({...jobFilters, weight: e.target.value})}
                        />
                    </FilterContainer>
                    <FilterContainer>
                        <FilterLabel>
                            <PriceIcon />
                            <span>ราคา ขั้นต่ำ</span>
                        </FilterLabel>
                        <InputComponent
                            type="number"
                            classifier="บาท"
                            disableLabel={true}
                            value={jobFilters.price}
                            handleOnChange={(e) => setJobFilters({...jobFilters, price: e.target.value})}
                        />
                    </FilterContainer>
                </FilterRow>
                <FilterRow>
                    <FilterContainer>
                        <FilterLabel>
                            <TruckIcon />
                            <span>ประเภทรถ</span>
                        </FilterLabel>
                        <SelectComponent
                            menuList={["ทั้งหมด", ...Object.keys(TRUCK_TYPE_LIST)]}
                            value={jobFilters.truck.type}
                            setValue={(value: string) => setJobFilters({...jobFilters, truck: {...jobFilters.truck, type: value}})}
                        />
                    </FilterContainer>
                    {
                        jobFilters.truck.type !== "ทั้งหมด" &&
                        <FilterContainer id="option">
                            <FilterLabel>
                                <OptionIcon />
                                <span>ส่วนเสริม</span>
                            </FilterLabel>
                            <ButtonGroupContainer>
                                {	
                                    ["ทั้งหมด", ...TRUCK_TYPE_LIST[jobFilters.truck.type].option].map((option: string, index: number) => {
                                        return (
                                            <ButtonItem
                                                key={index}
                                                onClick={() => setJobFilters({...jobFilters, truck: {...jobFilters.truck, option: option}})}
                                                name={option}
                                                value={jobFilters.truck.option}
                                            >
                                                {option}
                                            </ButtonItem>
                                        )
                                    })
                                }
                            </ButtonGroupContainer>
                        </FilterContainer>
                    }
                </FilterRow>
                </>
            }
        </FiltersContainer>
    )
}

export default JobFilters
