import React, { ChangeEvent, useState } from 'react'
import { SetterOrUpdater } from 'recoil'
import styled from 'styled-components'
import { ButtonGroupContainer, ButtonItem, RadioButton, TextButton } from '../styles/GlobalComponents'
import DateAndTimePicker from './DateAndTimePicker'
import { JobSuccessIcon, RightArrow } from './Icons'
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

interface DateFilter {
    isFilter: boolean
    start: Date
    end: Date
}

interface Filter {
    type: string
    name?: string
    inputType?: string
    label?: string
    value?: string | DateFilter
    classifier?: string
    placeholder?: string
    list?: string[]
    icon?: () => JSX.Element
    onChange?: ((value: string | number | ChangeEvent) => void) | SetterOrUpdater<string>
    setEnabled?: (value: boolean) => void
    setStart?: (value: Date) => void
    setEnd?: (value: Date) => void
    enabled?: boolean
}

interface FilterComponentInterface {
    filterList: {
        [key: number]: Filter[]
    }
}

const FiltersComponent = (props: FilterComponentInterface) => {
    const { filterList } = props
    const [showMoreFilter, setShowMoreFilter] = useState(false)

    const generateFilter = (row: string) => {
        return filterList[row].map((filter: Filter, index: number) => {
            if (filter.type === "searchbar") {
                return <SearchBar
                    key={`${filter.type}-${index}`}
                    placeholder={filter.placeholder}
                    setValue={filter.onChange}
                />
            } else if (filter.enabled !== false) {
                return <FilterContainer key={`${filter.type}-${index}`} id={filter.type === "selector" && "option"}>
                    <FilterLabel>
                        <filter.icon />
                        <span>{filter.label}</span>
                    </FilterLabel>
                    {(filter.type === "dropdown") && 
                        <SelectComponent
                            value={filter.value as string}
                            setValue={filter.onChange as (value: string) => void}
                            menuList={filter.list}
                        />
                    }
                    {(filter.type === "input") && 
                        <InputComponent
                            type={filter.inputType}
                            classifier={filter.classifier}
                            disableLabel={true}
                            value={filter.value as string}
                            handleOnChange={filter.onChange as (value: ChangeEvent) => void}
                        />
                    }
                    {(filter.type === "selector") && 
                        <ButtonGroupContainer>
                        {	
                            filter.list.map((option: string, index: number) => {
                                return (
                                    <ButtonItem
                                        key={index}
                                        onClick={() => filter.onChange(option)}
                                        name={option}
                                        value={filter.value as string}
                                    >
                                        {option}
                                    </ButtonItem>
                                )
                            })
                        }
                        </ButtonGroupContainer>
                    }
                    {(filter.type === "date") && <>
                        <RadioContainer>
                            <div>
                                <RadioButton>
                                    <input 
                                        defaultChecked 
                                        type="radio" 
                                        value="ทุกวัน" 
                                        name={filter.name}
                                        onChange={() => filter.setEnabled(false)} />
                                    <JobSuccessIcon />
                                </RadioButton>
                                <span>ทุกวัน</span>
                            </div>
                            <div>
                                <RadioButton>
                                    <input 
                                        type="radio" 
                                        value="เลือกช่วง" 
                                        name={filter.name}
                                        onChange={() => filter.setEnabled(true)} />
                                    <JobSuccessIcon />
                                </RadioButton>
                                <span>เลือกช่วง</span>
                            </div>
                        </RadioContainer>
                        <DateAndTimePicker
                            dateAndTime={(filter.value as DateFilter).start}
                            setDateAndTime={filter.setStart}
                            hideTime={true}
                            disabledDate={!(filter.value as DateFilter).isFilter}
                            minDate={new Date(2000)}
                        />
                        <span>ถึง</span>
                        <DateAndTimePicker 
                            dateAndTime={(filter.value as DateFilter).end < (filter.value as DateFilter).start ? (filter.value as DateFilter).start : (filter.value as DateFilter).end}
                            setDateAndTime={filter.setEnd}
                            minDate={(filter.value as DateFilter).start}
                            hideTime={true}
                            disabledDate={!(filter.value as DateFilter).isFilter}
                        />
                    </>}
                </FilterContainer>
            }
        })
    }

    return (
        <FiltersContainer isExpand={showMoreFilter}>
            {
                Object.keys(filterList).map((row: string) => {
                    return (
                        row === "0" ?
                            <FilterRow key={row}>
                                <div>{generateFilter(row)}</div>
                                <TextButton onClick={() => setShowMoreFilter(!showMoreFilter)}>
                                    <span>แสดงตัวกรองอื่น ๆ</span>
                                    <RightArrow/>
                                </TextButton>
                            </FilterRow>
                        : showMoreFilter && 
                        <FilterRow key={row}>
                            {generateFilter(row)}
                        </FilterRow>
                    )})
                }
        </FiltersContainer>
    )
}

export default FiltersComponent
