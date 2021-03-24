import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { GooSpinner } from 'react-spinners-kit'
import styled from 'styled-components'
import { FilterContainer, FilterLabel, FormActions, PrimaryButton, SecondaryButton, Spinner } from '../styles/GlobalComponents'
import { getSuggestJob } from '../utilities/apis'
import { selectPositionOnMap } from '../utilities/googlemaps'
import { RightArrow } from './Icons'
import InputComponent from './InputComponent'
import JobSequence from './JobSequence'
import Modal from './Modal'

const JobSuggestContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    
    > div {
        font-size: 1.6rem;
        margin: 0.8rem 2rem 1.2rem;

        &:last-child {
            margin: 0;
        }

        input, div {
            font-size: 1.6rem;
        }
        
        input {
            max-width: 30rem;
        }
    }
`

const SectionHeader = styled.div`
	font-weight: 600;
	color: hsl(212, 28%, 28%);
	display: flex;
	align-items: center;
	height: 2.5rem;

	div:first-child {
    	font-size: 2rem;
		padding-right: 1.8rem;
		position: absolute;
		background: white;
	}
`

const Line = styled.div`
	height: 0.2rem;
	border-radius: 10rem;
	background-color: hsl(212, 28%, 88%);
	width: 100%;
`

const ModalContent = styled.div`
	padding: 0 2rem;
	text-align: center;

	span {
		font-weight: 500;
	}

	> div:nth-child(3), ${FormActions} {
		margin-top: 1rem;
	}
`

const Map = styled.div`
	height: 60vh;
	width: 100%;
`

const SuggestContainer = styled.div`
    display: grid;
`

const Collapsible = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100vw;

    ${PrimaryButton} {
        background-color: hsl(212, 28%, 28%);
        color: white;
        padding: 0.6rem 2rem;
        border-radius: 0.6rem;
        font-weight: 600;
        height: fit-content;
    }
`

const Header = styled.button<{isOpen: boolean}>`
    font-size: 1.8rem;
    padding: 1.2rem 2rem;
    background: hsl(0, 0%, 95%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        transform: rotate(${props => props.isOpen ? "-90deg" : "90deg"});
    }
`

const PriceDetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 46rem;
    padding: 0 2rem;
`;

const PriceItem = styled.div`
	font-size: 1.6rem;
	color: hsl(218, 9%, 25%);
	font-weight: 500;

	> span {
		font-weight: 500;
		font-size: 1.2rem;
		color: hsl(0, 0%, 66%);
	}

	div {
		margin-top: 1.1rem;

		span {
			color: hsl(0, 0%, 51%);
		}
	}
`

const VerticalLine = styled.div`
    height: auto;
    background-color: hsl(212, 28%, 88%);
    width: 0.2rem;
    margin: 0 0.4rem;
`;

const ButtonContainer = styled.div<{isNegative: boolean}>`
    display: flex;
    justify-content: space-around;
    margin: 2rem;
    align-items: center;
    justify-content: flex-end;

    > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 1.4rem;
        margin-right: 2rem;

        > span {
			&:first-child {
            	margin-bottom: 0.4rem;
        	}

			&:last-child {
				color: ${props => props.isNegative ? "red" : "green"};
			}
		}
    }

    > button:not(:last-child) {
        margin-right: 1.6rem;
    }
`;

interface JobSuggestionInterface {
    selectedJobID: string
}

interface JobSuggestResult {
	history: {
		[key: number]: Object
	}
	summary: {
		[key: number]: Object
	}
}

const JobSuggestion = (props: JobSuggestionInterface) => {
    const { selectedJobID } = props
    const router = useRouter()
    const [hop, setHop] = useState(2)
    const [toggleOriginModal, setToggleOriginModal] = useState(false)
    const [suggestJobs, setSuggestJob] = useState({
        history: {},
        summary: {}
    })
    const [originLocation, setOriginLocation] = useState({
        latitude: undefined,
        longitude: undefined
    })
    const [tempLocation, setTempLocation] = useState<google.maps.places.PlaceResult | google.maps.GeocoderResult>()
    const [collapsible, setCollapsible] = useState({})
	const [isLoading, setIsLoading] = useState(false)

    const initOriginMap = () => {
        setToggleOriginModal(true)
		const targetMap = document.getElementById("origin-map") as HTMLElement
		const placeInput = document.getElementById("origin-autocomplete") as HTMLInputElement
		selectPositionOnMap(targetMap, placeInput, setTempLocation, originLocation)
    }

    const handleSetOriginLocation = () => {
		setOriginLocation({
            latitude: tempLocation.geometry.location.lat(),
            longitude: tempLocation.geometry.location.lng()
        })
	    setToggleOriginModal(false)
	}

    useEffect(() => {
        if (originLocation.latitude) {
			const suggestInput = {
                job_id: selectedJobID,
                hop,
                origin_location: originLocation
            }
			console.log(suggestInput)
			setIsLoading(true)
            getSuggestJob(suggestInput, (suggestJob: JobSuggestResult) => {
				console.log(suggestJob)
				setIsLoading(false)
				setSuggestJob(suggestJob)
			})
            const defaultMenu = {}
            Object.keys(suggestJobs.history).forEach((index) => {
                defaultMenu[index] = false
            })
            setCollapsible(defaultMenu)
        }
    }, [originLocation, hop])

    return (
        <>
            <JobSuggestContainer>
                <SectionHeader>
                    <div>พิจารณางานเหล่านี้เพื่อเพิ่มกำไร!</div> <Line />
                </SectionHeader>
                <div onClick={initOriginMap}>
                    <InputComponent
                        labelEN="Origin"
                        labelTH="ตำแหน่งเริ่มต้น"
                        readOnly={true}
                        required={false}
                        value={(tempLocation?.formatted_address) || "เลือกจุดเริ่มต้น"}
                    />
                </div>
                <FilterContainer>
                    <FilterLabel>
                        จำนวนงานสูงสุด
                    </FilterLabel>
                    <InputComponent 
                        disableLabel={true}
                        type="number"
                        value={`${hop}`}
                        handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setHop(parseInt(e.target.value))}
                        classifier={"งาน"}
                    />
                </FilterContainer>
                <SuggestContainer>
                { isLoading ? <Spinner><GooSpinner size={100} /></Spinner> :
                    Object.keys(suggestJobs.history).map((index) => {
                        const noOfJob = parseInt(index) + 1
                        const summarySequence = suggestJobs.summary[index]
                        const endDate = new Date(summarySequence.end_date)
                        const startDate = new Date(summarySequence.start_date)
                        const diffDay = Math.ceil(Math.abs((endDate as any) - (startDate as any)) / (1000 * 60 * 60 * 24))
                        const groupJob = []
                        if (noOfJob !== 1) {
                            return (
                                <Collapsible key={noOfJob}>
                                    <Header isOpen={collapsible[index]} onClick={() => setCollapsible({...collapsible, [index]: !collapsible[index]})}>
                                        <span>งานต่อเนื่อง {noOfJob} งาน</span>
                                        <RightArrow />
                                    </Header>
                                    {collapsible[index] && <>
                                        {
                                            Array(noOfJob).fill(0).map((_, index) => {
                                                const job = suggestJobs.history[index]
                                                groupJob.push(job.job_id)
                                                return (<JobSequence 
													key={job.job_id}
                                                    index={index}
                                                    job={job}
                                                />)
                                            })
                                        }
                                        <PriceDetailsContainer>
                                            <PriceItem>
                                                ราคาเสนอ
                                                <div>
                                                    {Math.floor(summarySequence.sum_offer)?.toLocaleString()} <span>บาท</span>
                                                </div>
                                            </PriceItem>
                                            <VerticalLine />
                                            <PriceItem>
                                                ต้นทุน <span>ประมาณ</span>
                                                <div>
                                                    {Math.floor(summarySequence.sum_cost)?.toLocaleString()} <span>บาท</span>
                                                </div>
                                            </PriceItem>
                                            <VerticalLine />
                                            <PriceItem>
                                                กำไร
                                                <div>
                                                    {Math.floor(summarySequence.profit)?.toLocaleString()}
                                                    <span> บาท</span>
                                                </div>
                                            </PriceItem>
                                        </PriceDetailsContainer>
                                        <ButtonContainer isNegative={summarySequence.profit - suggestJobs.summary[0].profit < 0}>
                                            <div>
                                                {/* <span>เดินทางรวม {diffDay} วัน</span> */}
                                                <span>กำไร{summarySequence.profit - suggestJobs.summary[0].profit > 0 ? "เพิ่มขึ้น" : "ลดลง"} {Math.floor(Math.abs(summarySequence.profit - suggestJobs.summary[0].profit)).toLocaleString()} บาท</span>
                                            </div>
                                            <PrimaryButton onClick={() => router.push(`/jobs/get/${groupJob}`)}>
                                                รับ {noOfJob} งานนี้
                                            </PrimaryButton>
                                        </ButtonContainer>
                                    </>}
                                </Collapsible>
                            )
                        }
                    })
                }
                </SuggestContainer>
            </JobSuggestContainer>
            <Modal toggle={toggleOriginModal} setToggle={setToggleOriginModal}>
                <ModalContent>
                    <span>เลือกสถานที่</span>
                    <InputComponent
                        name="origin-location"
                        id="origin-autocomplete"
                        disableLabel={true}
                    />
                    <Map id="origin-map" />
                    <FormActions>
                        <SecondaryButton onClick={() => setToggleOriginModal(false)}>ย้อนกลับ</SecondaryButton>
                        <PrimaryButton onClick={handleSetOriginLocation}>เลือกตำแหน่ง</PrimaryButton>
                    </FormActions>
                </ModalContent>
            </Modal>
        </>
    )
}

export default JobSuggestion
