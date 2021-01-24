import React, { useState, useEffect, ReactElement } from "react";
import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useRouter } from "next/router";
import {
    RightArrow,
    RightArrowLine,
    JobSuccessIcon,
} from "../../../components/common/Icons";
import {
	CarrierDetailsContainer,
	Detail,
	JobTitle,
	SecondaryButton,
	FormActions,
	PrimaryButton,
} from "../../../components/styles/GlobalComponents"
import JobDetailsSection from "../../../components/common/JobDetailsSection"
import Modal from "../../../components/common/Modal"
import TableComponent from "../../../components/common/TableComponent"
import NavigationBar from "../../../components/common/NavigationBar"
import SearchBar from "../../../components/common/SearchBar"
import { useSetRecoilState } from 'recoil'
import { jobDetailsState } from '../../../store/atoms/jobDetailsState'
import { useRecoilState } from 'recoil'
import { getDriver, getJobDetailsByID, getTruck, pickJob } from "../../../components/utilities/apis"
import { JobDocument } from "../../../entities/interface/job"
import { filterWordState, tableDataState } from "../../../store/atoms/tableState"
import { DriverDocument, DriverTable } from "../../../entities/interface/driver"
import { TruckDocument, TruckTable } from '../../../entities/interface/truck'
import { trucksState } from '../../../store/atoms/trucksState'
import { driversState } from '../../../store/atoms/driversState'
import useAlert from "../../../hooks/useAlert";

const FormActionsCustom = styled(FormActions)`
    ${PrimaryButton}, ${SecondaryButton} {
        font-size: 1.6rem;
        font-weight: 500;
        border-radius: 0.6rem;
    }

    ${PrimaryButton} {
        box-shadow: none;
        background-color: hsl(212, 28%, 28%);
    }
`;

const JobDetails = styled.div`
    padding: 0 2rem;
    margin-bottom: 8rem;

    ${Detail} {
        white-space: nowrap;

        span {
            margin-left: 1.2rem;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        button {
            text-overflow: ellipsis;
            overflow: hidden;
        }

        button,
        svg {
            margin-left: 0.6rem;
            color: hsl(16, 56%, 51%);

            path {
                fill: hsl(16, 56%, 51%);
            }
        }
    }

    ${FormActionsCustom} {
        margin-top: 2rem;
    }
`;

const Warning = styled.div`
    margin-top: 2rem;
    color: hsl(16, 56%, 51%);
    font-size: 1.8rem;
    font-weight: 600;
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	white-space: nowrap;
	min-height: 50rem;

    > *:not(:last-child) {
        margin-bottom: 1.6rem;
    }

    ${Warning} {
        font-size: 1.6rem;
        margin-top: 0;
    }

    ${FormActionsCustom} {
        padding: 0 1.6rem;
    }
`;

const ModalTitle = styled.div`
    color: hsl(212, 28%, 28%);
    font-weight: 600;
    font-size: 2rem;
`;

const RadioButton = styled.div`
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    border: 0.1rem solid hsl(16, 56%, 51%);
    border-radius: 50%;
    margin: auto;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 0 0 6px hsl(16, 56%, 51%, 10%);
    }

    svg {
        width: 2.7rem;
        height: 2.7rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        #circle {
            display: none;
        }

        #check {
            fill: transparent;
        }
    }

    input {
        position: absolute;
        height: 1.6rem;
        width: 1.6rem;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        opacity: 0;

        &:checked {
            & ~ svg {
                #check {
                    fill: white;
                }

                #background {
                    fill: hsl(16, 56%, 51%);
                }
            }
        }
    }
`;

const GetJobPage = () => {
	const router = useRouter()
	const jobID = router.query.job_id as string
	const [jobDetails, setJobDetails] = useRecoilState<JobDocument>(jobDetailsState)
	const [trucks, setTrucks] = useRecoilState(trucksState)
	const [drivers, setDrivers] = useRecoilState(driversState)
	const [toggleDriverModal, setToggleDriverModal] = useState(false)
	const [toggleTruckModal, setToggleTruckModal] = useState(false)
	const setTableData = useSetRecoilState(tableDataState)
	const setFilterWord = useSetRecoilState(filterWordState)
	const [isRadioSelected, setIsRadioSelected] = useState(true)
	const [carrierDetails, setCarrierDetails] = useState({
		truck: null,
		driver: null,
	})
	const { setAlert } = useAlert()

	const driverColumns = [
		{
			id: "name",
			label: "ชื่อ - นามสกุล",
			align: "left",
		},
		{
			id: "driver_license_type",
			label: "ใบขับขี่",
			width: "25%"
		},
		{
			id: "actions",
			label: "เลือก",
			format: (driver_index: number): ReactElement => (
				<RadioButton>
					<input type="radio" value={driver_index} name="driver" />
					<JobSuccessIcon />
				</RadioButton>
			),
		},
	]

	const truckColumns = [
		{
			id: "license_number",
			label: "ทะเบียน",
		},
		{
			id: "type",
			label: "ประเภท",
		},
		{
			id: "option",
			label: "เพิ่มเติม",
		},
		{
			id: "actions",
			label: "เลือก",
			format: (truck_index: number): ReactElement => (
				<RadioButton>
					<input type="radio" value={truck_index} name="truck" />
					<JobSuccessIcon />
				</RadioButton>
			),
		},
	]

    const selectRow = (type: string) => {
        const element = document.querySelector(
            `input[name=${type}]:checked`
        ) as HTMLInputElement;
        if (element) {
            setToggleDriverModal(false);
            setToggleTruckModal(false);
            setIsRadioSelected(true);
            setCarrierDetails({ ...carrierDetails, [type]: element.value });
        } else {
            setIsRadioSelected(false);
        }
    };

	const convertDriverToTableFormat = (drivers: DriverDocument[]): DriverTable[] => {
		const driverTableData = []
		const validDrivers = []
		drivers.map((driver) => {
			const { name, driver_license_type, status } = driver
			const matchDriverLicenseType = (driver_license_type === jobDetails.carrier_specification.driver.driver_license_type)
			if (matchDriverLicenseType && (status === 100)) {
				driverTableData.push({
					name,
					driver_license_type: driver_license_type.replace("ประเภท", ""),
				})
				validDrivers.push(driver)
			}
		})
		setDrivers(validDrivers)
		return driverTableData
	}

	const convertTruckToTableFormat = (trucks: TruckDocument[]): TruckTable[] => {
		const truckTableData = []
		const validTrucks = []
		trucks.map((truck) => {
			const { license_number, property, status } = truck
			const matchType = (property.type === jobDetails.carrier_specification.truck.property.type) 
			const matchOption = (property.option === jobDetails.carrier_specification.truck.property.option)
			if (matchType && matchOption && (status === 100)) {
				truckTableData.push({
					license_number,
					type: property.type,
					option: property.option,
				})
				validTrucks.push(truck)
			}
		})
		setTrucks(validTrucks)
		return truckTableData
	}

	const toggleModal = (target: string) => {
		if (target === "driver") {
			setToggleDriverModal(true)
			setTableData(convertDriverToTableFormat(drivers))
		} else if (target === "truck") {
			setToggleTruckModal(true)
			setTableData(convertTruckToTableFormat(trucks))
		}
	}

	useEffect(() => {
		if (jobID && !Boolean(jobDetails.shipper_id)) {
			getJobDetailsByID(jobID, (jobDetails: JobDocument) => {
				setJobDetails(jobDetails)
			})
		}
		getDriver((drivers: DriverDocument[]) => {
			setDrivers(drivers)
		})
		getTruck((trucks: TruckDocument[]) => {
			setTrucks(trucks)
		})
	}, [router.query.job_id])

	const confirmGetJob = async () => {
		const response = await pickJob({
			job_id: jobID,
			truck_id: trucks[parseInt(carrierDetails.truck)].truck_id,
			driver_id: drivers[parseInt(carrierDetails.driver)].driver_id
		})
		if (response !== 200) {
			setAlert(true, "error")
		} else {
			setAlert(true, "success")
		}
		router.push(`/jobs/details/${jobID}`, undefined, { shallow: true })
	}

	return (
		<div>
			<NavigationBar activeIndex={1} />
			<Header>
				<JobTitle>
					รับงาน <span>{jobDetails.pickup_location.province}</span>
					<RightArrowLine />
					<span>{jobDetails.dropoff_location.province}</span>
				</JobTitle>
			</Header>
			<JobDetails>
				<JobDetailsSection
					isShowCarrierDetails={false}
					isShowAutoPrice={false}
					isShowFooterDetails={false}
				/>
				<Warning>เลือกพนักงานและรถที่ใช้รับงาน</Warning>
				<CarrierDetailsContainer>
					<Detail>
						พนักงานขับรถ
						{carrierDetails.driver && (
							<span>
								{
									drivers[carrierDetails.driver].name
								}
							</span>
						)}
						<button onClick={() => toggleModal("driver")}>
							{carrierDetails.driver
								? "แก้ไข"
								: "เลือกพนักงานขับรถ"}
							<RightArrow />
						</button>
					</Detail>
					<Detail>
						รถบรรทุก
						{carrierDetails.truck && (
							<span>
								{
									trucks[carrierDetails.truck].license_number
								}
							</span>
						)}
						<button onClick={() => toggleModal("truck")}>
							{carrierDetails.truck ? "แก้ไข" : "เลือกรถบรรทุก"}
							<RightArrow />
						</button>
					</Detail>
				</CarrierDetailsContainer>
				<FormActionsCustom>
					<SecondaryButton onClick={() => router.back()}>ย้อนกลับ</SecondaryButton>
					<PrimaryButton
						onClick={confirmGetJob}
					>
						ยืนยันรับงาน
					</PrimaryButton>
				</FormActionsCustom>
			</JobDetails>
			<Modal toggle={toggleDriverModal} setToggle={setToggleDriverModal}>
				<ModalContent>
					<ModalTitle>เลือกพนักงานขับรถ</ModalTitle>
					<SearchBar
						placeholder="ค้นหารหัส, ชื่อหรือประเภทใบขับขี่"
						setValue={setFilterWord}
					/>
					<TableComponent
						columns={driverColumns}
					/>
					{!isRadioSelected && (
						<Warning>กรุณาเลือกพนักงานขับรถ</Warning>
					)}
					<FormActionsCustom>
						<SecondaryButton
							onClick={() => setToggleDriverModal(false)}
						>
							ย้อนกลับ
						</SecondaryButton>
						<PrimaryButton onClick={() => selectRow("driver")}>
							ยืนยันเลือก
						</PrimaryButton>
					</FormActionsCustom>
				</ModalContent>
			</Modal>
			<Modal toggle={toggleTruckModal} setToggle={setToggleTruckModal}>
				<ModalContent>
					<ModalTitle>เลือกรถบรรทุก</ModalTitle>
					<SearchBar
						placeholder="ค้นหาทะเบียนหรือประเภทรถ"
						setValue={setFilterWord}
					/>
					<TableComponent
						columns={truckColumns}
					/>
					{!isRadioSelected && <Warning>กรุณาเลือกรถบรรทุก</Warning>}
					<FormActionsCustom>
						<SecondaryButton
							onClick={() => setToggleTruckModal(false)}
						>
							ย้อนกลับ
						</SecondaryButton>
						<PrimaryButton onClick={() => selectRow("truck")}>
							ยืนยันเลือก
						</PrimaryButton>
					</FormActionsCustom>
				</ModalContent>
			</Modal>
		</div>
	)
}

export default GetJobPage;
