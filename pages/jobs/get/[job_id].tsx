import React, { useState, useEffect, ReactElement } from "react";
import styled, { css } from "styled-components";
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
	RadioButton,
	HeaderTitle,
	Spinner,
} from "../../../components/styles/GlobalComponents"
import JobDetailsSection from "../../../components/common/JobDetailsSection"
import Modal from "../../../components/common/Modal"
import TableComponent from "../../../components/common/TableComponent"
import NavigationBar from "../../../components/common/NavigationBar"
import SearchBar from "../../../components/common/SearchBar"
import { useSetRecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import { getDriver, getJobDetailsByID, getTruck, pickJob } from "../../../components/utilities/apis"
import { JobDocument } from "../../../entities/interface/job"
import { filterResourceState, filterWordState, tableDataState } from "../../../store/atoms/tableState"
import { DriverDocument, DriverTable } from "../../../entities/interface/driver"
import { TruckDocument, TruckTable } from '../../../entities/interface/truck'
import { trucksState } from '../../../store/atoms/trucksState'
import { driversState } from '../../../store/atoms/driversState'
import useAlert from "../../../hooks/useAlert";
import { BreakpointLG, BreakpointMD } from "../../../components/styles/Breakpoints";
import DesktopHeader from "../../../components/common/DesktopHeader";
import breakpointGenerator from "../../../components/utilities/breakpoint";
import { GooSpinner } from "react-spinners-kit";
import withPrivateRoute from "../../../components/utilities/withPrivateRoute";
import Alert from "../../../components/common/Alert";

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

	> div:first-child {
		display: flex;
		flex-direction: column;
	}

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

	${breakpointGenerator({
		large: css`
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 2.6rem;
		`
	})}
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
	/* min-height: 50rem; */

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

const GetJobPageContainer = styled.div`
	width: 100%;
`

const ContentContainer = styled.div`
	${HeaderTitle} {
		color: hsl(212, 28%, 28%);

		> span {
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: 0.8rem;
		}

		svg {
			margin: 0 1.4rem;

			path {
				fill: hsl(212, 28%, 28%);
			}
		}
	}
	
	${breakpointGenerator({
		large: css`
			margin-left: 7rem;
		`
	})}
`

const GetJobPage = () => {
	const router = useRouter()
	const jobID = router.query.job_id as string
	const [jobDetails, setJobDetails] = useState([])
	// const [jobDetails, setJobDetails] = useRecoilState(jobDetailsSelector)
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
	const [isLoading, setIsLoading] = useState(false)
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
			align: "center",
			width: "30%",
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
			align: "center",
			width: "20%",
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
			const jobDriverLicense = jobDetails[0].carrier_specification.driver.driver_license_type
			const matchDriverLicenseType = (parseInt(driver_license_type.split(" ")[1]) >= parseInt(jobDriverLicense.split(" ")[1]))
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
			const matchType = (property.type === jobDetails[0].carrier_specification.truck.property.type) 
			const matchOption = (property.option === jobDetails[0].carrier_specification.truck.property.option)
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
		if (jobID && !Boolean(jobDetails[0]?.shipper_id)) {
			setIsLoading(true)
			jobID.split(",").map(async (job) => {
				await getJobDetailsByID(job, (jobDocument: JobDocument) => {
					setIsLoading(false)
					jobDetails.push(jobDocument)
				})
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
		jobDetails.map(async (job) => {
			const response = await pickJob({
				job_id: job.job_id,
				truck_id: trucks[parseInt(carrierDetails.truck)].truck_id,
				driver_id: drivers[parseInt(carrierDetails.driver)].driver_id
			})
			if (response !== 200) {
				setAlert(true, "error", "ไม่สามารถรับงานได้ เนื่องจากข้อผิดพลาดบางอย่าง")
			} else {
				setAlert(true, "success", "รับงานสำเร็จ")
				router.push(`/jobs/details/${jobID.split(",")[0]}`, undefined, { shallow: true })
			}
		})
	}

	return (
		<GetJobPageContainer>
			<Alert />
			<NavigationBar activeIndex={1} />
			<BreakpointMD>
				<Header>
					<JobTitle>
						{
							jobDetails.length === 1 ? <> 
								รับงาน <span>{jobDetails[0].pickup_location.province}</span>
								<RightArrowLine />
								<span>{jobDetails[0].dropoff_location.province}</span>
							</> : <>
								รับงาน {jobDetails.length} งาน
							</>
						}
					</JobTitle>
				</Header>
			</BreakpointMD>
			<ContentContainer>
				<BreakpointLG>
					<DesktopHeader>
						<HeaderTitle>
							{
								jobDetails.length === 1 ? <> 
									รับงาน <span>{jobDetails[0].pickup_location.province}</span>
									<RightArrowLine />
									<span>{jobDetails[0].dropoff_location.province}</span>
								</> : <>
									รับงาน {jobDetails.length} งาน
								</>
							}
						</HeaderTitle>
					</DesktopHeader>
				</BreakpointLG>
				<JobDetails>
					<div>
					{ isLoading ? <Spinner><GooSpinner size={120} /></Spinner> : <>
						{
						jobDetails.map((job, index) => {
							let isShowTruckDetails = false
							if (index + 1 === jobDetails.length) {
								isShowTruckDetails = true
							}
							return (<JobDetailsSection
								key={job.job_id}
								number={index + 1}
								jobDetails={job}
								isShowCarrierDetails={false}
								isShowAutoPrice={false}
								isShowFooterDetails={false}
								isShowTruckDetails={isShowTruckDetails}
							/>)
						})
						}</>
					}
					</div>
					<div>
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
					</div>
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
							filterSelector={filterResourceState}
							
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
							filterSelector={filterResourceState}
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
			</ContentContainer>
		</GetJobPageContainer>
	)
}

export default withPrivateRoute(GetJobPage, "carrier");
