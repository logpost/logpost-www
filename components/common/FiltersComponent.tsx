import React, { ChangeEvent, useState } from 'react'
import styled, { css } from 'styled-components'
import { Filter, FilterComponentInterface, DateFilter, RangeFilter } from '../../entities/interface/common'
import { ButtonGroupContainer, ButtonItem, FilterContainer, FilterLabel, RadioButton, TextButton } from '../styles/GlobalComponents'
import breakpointGenerator from '../utilities/breakpoint'
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

	&#first-row {
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

const DateTimeFilter = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 3rem;
    width: calc(100% - 3rem);

    > div {
        margin-top: 1.4rem;
        display: flex; 
        flex-direction: row;
        align-items: center;
        width: 100%;

        &:last-child {
            display: grid;
            grid-template-columns: repeat(auto-fill, 16rem);
            grid-gap: 1.4rem 0;
        }

        > div:last-child {
            display: flex;
            align-items: center;

            > span {
                margin-right: 1rem;
                white-space: nowrap;
            }
		}

    }

    ${breakpointGenerator({
        large: css`
            flex-direction: row;
            align-items: center;
            margin-top: 0;
            margin-left: 0;
            width: auto;

            > div:last-child {
                display: flex;
            }

            > div, > div:last-child {
                margin-top: 0;

                span {
                    margin-left: 1rem;
                    white-space: nowrap;
                }
            }
        `
    })}
`

const FiltersComponent = (props: FilterComponentInterface) => {
    const { filterList, alwaysExpand = false } = props
    const [showMoreFilter, setShowMoreFilter] = useState(alwaysExpand)

    const generateFilter = (row: string) => {
        return filterList[row].map((filter: Filter, index: number) => {
            if (filter.type === "searchbar") {
                return <SearchBar
                    key={`${filter.type}-${index}`}
                    placeholder={filter.placeholder}
                    setValue={filter.onChange}
                />
            } else if (filter.enabled !== false) {
                return <FilterContainer key={`${filter.type}-${index}`} id={filter.type === "selector" ? "option" : filter.type}>
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
					{(filter.type === "inputrange") && <>
						<InputComponent
                            type={filter.inputType}
                            disableLabel={true}
                            value={(filter.value as RangeFilter).from}
							handleOnChange={(e: ChangeEvent<HTMLInputElement>) => filter.onChange(e.target.value, "min")}
                        />
						<span>ถึง</span>
						<InputComponent
                            type={filter.inputType}
                            classifier={filter.classifier}
                            disableLabel={true}
                            value={(filter.value as RangeFilter).to}
							handleOnChange={(e: ChangeEvent<HTMLInputElement>) => filter.onChange(e.target.value, "max")}
                        />
					</>}
                    {(filter.type === "date") && <DateTimeFilter>
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
                        <div>
                            <DateAndTimePicker
                                dateAndTime={(filter.value as DateFilter).start}
                                setDateAndTime={filter.setStart}
                                hideTime={true}
                                disabledDate={!(filter.value as DateFilter).isFilter}
                                minDate={new Date(2000)}
                            />
                            <div>
                            <span>ถึง</span>
                            <DateAndTimePicker 
                                dateAndTime={(filter.value as DateFilter).end < (filter.value as DateFilter).start ? (filter.value as DateFilter).start : (filter.value as DateFilter).end}
                                setDateAndTime={filter.setEnd}
                                minDate={(filter.value as DateFilter).start}
                                hideTime={true}
                                disabledDate={!(filter.value as DateFilter).isFilter}
                            />
                            </div>
                        </div>
                    </DateTimeFilter>}
                </FilterContainer>
            }
        })
    }

    return (
        <FiltersContainer isExpand={showMoreFilter}>
            {
                Object.keys(filterList).map((row: string) => {
					if (filterList[row][0].enabled !== false) {
						return (
							(row === "0" && !alwaysExpand) ?
								<FilterRow key={row} id="first-row">
									<div>{generateFilter(row)}</div>
									{
										filterList[1] &&
										<TextButton onClick={() => setShowMoreFilter(!showMoreFilter)}>
											<span>แสดงตัวกรองอื่น ๆ</span>
											<RightArrow/>
										</TextButton>
									}
								</FilterRow>
							: showMoreFilter && 
							<FilterRow key={row}>
								{generateFilter(row)}
							</FilterRow>
						)}
					})
                }
        </FiltersContainer>
    )
}

export default FiltersComponent
