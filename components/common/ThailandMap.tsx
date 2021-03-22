import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled, { css, keyframes } from 'styled-components'
import { countJobInProvinceState } from '../../store/atoms/jobDocumentState'
import { NumberOfJobs, RadioInput, RadioInputContainer } from '../styles/GlobalComponents'
import { Amnatcharoen, Angthong, Bangkok, Buengkan, Buriram, Chachoengsao, Chainat, Chaiyaphum, Chanthaburi, Chiangmai, Chiangrai, Chonburi, Chumphon, Kalasin, Kamphaengphet, Kanchanaburi, Khonkaen, Krabi, Lampang, Lamphun, Loei, Lopburi, Maehongson, Mahasarakham, Mukdahan, Nakhonnayok, Nakhonpathom, Nakhonphanom, Nakhonratchasima, Nakhonsawan, Nakhonsithammarat, Nan, Narathiwat, Nongbualamphu, Nongkhai, Nonthaburi, Pathumthani, Pattani, Phangnga, Phatthalung, Phayao, Phetchabun, Phetchaburi, Phichit, Phitsanulok, Phrae, Phranakhonsiayutthaya, Phuket, Prachinburi, Prachuapkhirikhan, Ranong, Ratchaburi, Rayong, Roiet, Sakaeo, Sakonnakhon, Samutprakan, Samutsakhon, Samutsongkhram, Saraburi, Satun, Singburi, Sisaket, Songkhla, Sukhothai, Suphanburi, Suratthani, Surin, Tak, Trang, Trat, Ubonratchathani, Udonthani, Uthaithani, Uttaradit, Yala, Yasothon } from './ProvincesIcon'
import Tooltip from '@material-ui/core/Tooltip'

const push = keyframes`
    0%  {
        opacity: 0;
        transform: scale(0);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const click = keyframes`
    0%  {
        transform: scale(0.8);
    }

    50%  {
        transform: scale(0.9);
    }

    100% {
        transform: scale(1);
    }
`;

const MapOption = styled.div`
    font-size: 1.6rem;
    position: absolute;
    right: 2rem;
    width: 40%;
    display: flex;
    flex-direction: column;

    > span {
        margin-top: 1rem;
    }

    ${RadioInputContainer} {
        > button {
            position: static;
        }
    }
`

const Province = styled.button<{isActive: boolean}>`
    position: absolute;
    
    ${props => props.isActive && css`
        svg path {
            stroke: hsl(16, 56%, 51%);
            fill: hsl(16, 56%, 51%);
        }
    `}

    &:active {
        animation: ${click} 10s ease-in-out;
    }

    &:hover {
        svg path {
            fill: hsl(212, 28%, 28%);
        }
    }
`

const TooltipCustom = styled(props => (
    <Tooltip
      classes={{ popper: props.className, tooltip: "tooltip" }}
      {...props}
    />
    ))`
    & .tooltip {
        background-color:hsl(212, 28%, 28%);
        font-size: 1.4rem;
        font-family: "Bai Jamjuree";
        margin: 0;

        .MuiTooltip-arrow {
            color: hsl(212, 28%, 28%);
        }
    }
`;

const Thailand = styled.div`
    position: relative;
    top: 2rem;

    ${NumberOfJobs} {
        width: 1.8rem;
        height: 1.8rem;
        font-size: 1rem;
        top: 25%;
        left: 25%;
        animation: ${push} 0.3s ease-in-out 1;
        background: #f59657;
    }
`

const Northern = styled.div`
    position: relative;
    left: 57px;
    top: 38px;

    ${NumberOfJobs} {
        background-color: #ee623f;
    }

    #maehongson {
        position: absolute;
        left: 0.95px;
        top: 14.81px;
    }

    #chiangmai {
        position: absolute;
        left: 24.63px;
        top: 10.21px;
    }

    #chiangrai {
        position: absolute;
        left: 76.95px;
        top: 2.15px;
    }

    #phayao {
        position: absolute;
        left: 112.13px;
        top: 27.06px;
    }

    #lamphun {
        position: absolute;
        left: 54.09px;
        top: 74.02px;
    }

    #lampang {
        position: absolute;
        left: 81.71px;
        top: 40.25px;
    }

    #uttaradit {
        position: absolute;
        left: 140.71px;
        top: 89.03px;
    }

    #phrae {
        position: absolute;
        left: 109.75px;
        top: 69.01px;
    }

    #nan {
        position: absolute;
        left: 147.83px;
        top: 30.24px;
    }
`

const Central = styled.div`
    position: relative;
    left: 100px;
    top: 200px;

    #sukhothai {
        left: 56.48px;
        top: 1.18px;
    }

    #kamphaengphet {
        left: 46.51px;
        top: 34.2px;
    }

    #nakhonsawan {
        left: 44.79px;
        top: 68.07px;
    }

    #phitsanulok {
        left: 86.38px;
        top: 0px;
    }

    #phichit {
        left: 86.38px;
        top: 44.11px;
    }

    #phetchabun {
        left: 116.28px;
        top: 25.95px;
    }

    #angthong {
        left: 88.83px;
        top: 140px;
    }

    #phranakhonsiayutthaya {
        left: 96.72px;
        top: 165.03px;
    }

    #bangkok {
        left: 100.5px;
        top: 224.07px;
    }

    #chainat {
        left: 36.26px;
        top: 99px;
    }

    #lopburi {
        left: 114.61px;
        top: 91.16px;
    }

    #nakhonnayok {
        left: 146.2px;
        top: 154.98px;
    }

    #nakhonpathom {
        left: 48.74px;
        top: 183.91px;
    }

    #nonthaburi {
        left: 94.01px;
        top: 200.37px;
    }

    #pathumthani {
        left: 119.38px;
        top: 195.88px;
    }

    #samutprakan {
        left: 127.9px;
        top: 249.66px;
    }

    #samutsakhon {
        left: 59.01px;
        top: 217.96px;
    }

    #samutsongkhram {
        left: 31.67px;
        top: 228.41px;
    }

    #saraburi {
        left: 127.9px;
        top: 118.41px;
    }

    #singburi {
        left: 84.85px;
        top: 106.62px;
    }

    #suphanburi {
        left: 30.9px;
        top: 131.67px;
    }

    #uthaithani {
        left: 0.53px;
        top: 75.35px;
    }
`

const Western = styled.div`
    position: relative;
    left: 16px;
    top: 200px;

    ${NumberOfJobs} {
        background-color: #a05f34;
    }

    #tak {
        left: 6.36px;
        top: 0.78px;
    }

    #kanchanaburi {
        left: 4.63px;
        top: 80.69px;
    }

    #phetchaburi {
        left: 23.94px;
        top: 168.47px;
    }

    #prachuapkhirikhan {
        left: 23.38px;
        top: 204.34px;
    }

    #ratchaburi {
        left: 27.74px;
        top: 135.4px;
    }
`

const Eastern = styled.div`
    position: relative;
    left: 300px;
    top: 400px;

    ${NumberOfJobs} {
        background-color: #d66508;
    }

    #chachoengsao {
        left: 0.74px;
        top: 22.63px;
    }

    #chanthaburi {
        left: 39.86px;
        top: 49.03px;
    }

    #chonburi {
        left: 0px;
        top: 44.87px;
    }

    #prachinburi {
        left: 5.18px;
        top: 0px;
    }

    #rayong {
        left: 13.32px;
        top: 68.23px;
    }

    #sakaeo {
        left: 44.52px;
        top: 9.72px;
    }

    #trat {
        left: 66.61px;
        top: 72.38px;
    }
`

const Northeast = styled.div`
    position: relative;
    left: 290px;
    top: 160px;

    ${NumberOfJobs} {
        background-color: #7a4d23;
    }

    #amnatcharoen {
        left: 168.4px;
        top: 105.59px;
    }

    #buengkan {
        left: 96.62px;
        top: 1.37px;
    }

    #buriram {
        left: 64.14px;
        top: 136.97px;
    }

    #chaiyaphum {
        left: 7.44px;
        top: 94.57px;
    }

    #kalasin {
        left: 94.51px;
        top: 70.21px;
    }

    #khonkaen {
        left: 38.04px;
        top: 76.6px;
    }

    #loei {
        left: 0px;
        top: 12.77px;
    }

    #mahasarakham {
        left: 84.52px;
        top: 104.49px;
    }

    #mukdahan {
        left: 131.76px;
        top: 69px;
    }

    #nakhonphanom {
        left: 121.47px;
        top: 23.39px;
    }

    #nakhonratchasima {
        left: 11.17px;
        top: 134.31px;
    }

    #nongbualamphu {
        left: 1.52px;
        top: 64.44px;
    }

    #nongkhai {
        left: 37.38px;
        top: 1.01px;
    }

    #roiet {
        left: 109.45px;
        top: 98.65px;
    }

    #sakonnakhon {
        left: 92.06px;
        top: 27.46px;
    }

    #sisaket {
        left: 146.47px;
        top: 139.15px;
    }

    #surin {
        left: 106.76px;
        top: 138.7px;
    }

    #ubonratchathani {
        left: 171.05px;
        top: 123.78px;
    }

    #udonthani {
        left: 35.65px;
        top: 30.78px;
    }

    #yasothon {
        left: 144.73px;
        top: 100.43px;
    }
`

const Southern = styled.div`
    position: relative;
    left: 50px;
    top: 480px;

    ${NumberOfJobs} {
        background-color: hsl(44, 87%, 50%);
    }

    #chumphon {
        left: 33.6px;
        top: 1.91px;
    }

    #krabi {
        left: 22.89px;
        top: 112.28px;
    }

    #nakhonsithammarat {
        left: 62.57px;
        top: 83.68px;
    }

    #narathiwat {
        left: 177.59px;
        top: 198.24px;
    }

    #phangnga {
        left: 4.89px;
        top: 68.8px;
    }

    #phatthalung {
        left: 86.36px;
        top: 147.73px;
    }

    #pattani {
        left: 144.61px;
        top: 176.48px;
    }

    #phuket {
        left: 2.87px;
        top: 119.11px;
    }

    #ranong {
        left: 15.44px;
        top: 6.55px;
    }

    #satun {
        left: 78.1px;
        top: 185.03px;
    }

    #songkhla {
        left: 104.17px;
        top: 176.48px;
    }

    #suratthani {
        left: 27.32px;
        top: 59.79px;
    }

    #trang {
        left: 54.38px;
        top: 145.78px;
    }

    #yala {
        left: 146.22px;
        top: 200.93px;
    }
`

const THAILAND_PROVINCES = [
    {
        name: Northern,
        provinces: [
            {
                id: "maehongson",
                nameTH: "แม่ฮ่องสอน",
                icon: Maehongson
            },
            {
                id: "chiangmai",
                nameTH: "เชียงใหม่",
                icon: Chiangmai
            },
            {
                id: "chiangrai",
                nameTH: "เชียงราย",
                icon: Chiangrai
            },
            {
                id: "phayao",
                nameTH: "พะเยา",
                icon: Phayao
            },
            {
                id: "lamphun",
                nameTH: "ลำพูน",
                icon: Lamphun
            },
            {
                id: "lampang",
                nameTH: "ลำปาง",
                icon: Lampang
            },
            {
                id: "uttaradit",
                nameTH: "อุตรดิตถ์",
                icon: Uttaradit
            },
            {
                id: "phrae",
                nameTH: "แพร่",
                icon: Phrae
            },
            {
                id: "nan",
                nameTH: "น่าน",
                icon: Nan
            }
        ]
    },
    {
        name: Western,
        provinces: [
            {
                id: "tak",
                nameTH: "ตาก",
                icon: Tak
            },
            {
                id: "kanchanaburi",
                nameTH: "กาญจนบุรี",
                icon: Kanchanaburi
            },
            {
                id: "phetchaburi",
                nameTH: "เพชรบุรี",
                icon: Phetchaburi
            },
            {
                id: "prachuapkhirikhan",
                nameTH: "ประจวบคีรีขันธ์",
                icon: Prachuapkhirikhan
            },
            {
                id: "ratchaburi",
                nameTH: "ราชบุรี",
                icon: Ratchaburi
            }
        ]
    },
    {
        name: Central,
        provinces: [
            {
                id: "sukhothai",
                nameTH: "สุโขทัย",
                icon: Sukhothai
            },
            {
                id: "phitsanulok",
                nameTH: "พิษณุโลก",
                icon: Phitsanulok
            },
            {
                id: "phichit",
                nameTH: "พิจิตร",
                icon: Phichit
            },
            {
                id: "phetchabun",
                nameTH: "เพชรบูรณ์",
                icon: Phetchabun
            },
            {
                id: "nakhonsawan",
                nameTH: "นครสวรรค์",
                icon: Nakhonsawan
            },
            {
                id: "kamphaengphet",
                nameTH: "กำแพงเพชร",
                icon: Kamphaengphet
            },
            {
                id: "angthong",
                nameTH: "อ่างทอง",
                icon: Angthong
            },
            {
                id: "phranakhonsiayutthaya",
                nameTH: "พระนครศรีอยุธยา",
                icon: Phranakhonsiayutthaya
            },
            {
                id: "bangkok",
                nameTH: "กรุงเทพมหานคร",
                icon: Bangkok
            },
            {
                id: "chainat",
                nameTH: "ชัยนาท",
                icon: Chainat
            },
            {
                id: "lopburi",
                nameTH: "ลพบุรี",
                icon: Lopburi
            },
            {
                id: "nakhonnayok",
                nameTH: "นครนายก",
                icon: Nakhonnayok
            },
            {
                id: "nakhonpathom",
                nameTH: "นครปฐม",
                icon: Nakhonpathom
            },
            {
                id: "nonthaburi",
                nameTH: "นนทบุรี",
                icon: Nonthaburi
            },
            {
                id: "pathumthani",
                nameTH: "ปทุมธานี",
                icon: Pathumthani
            },
            {
                id: "samutprakan",
                nameTH: "สมุทรปราการ",
                icon: Samutprakan
            },
            {
                id: "samutsakhon",
                nameTH: "สมุทรสาคร",
                icon: Samutsakhon
            },
            {
                id: "samutsongkhram",
                nameTH: "สมุทรสงคราม",
                icon: Samutsongkhram
            },
            {
                id: "saraburi",
                nameTH: "สระบุรี",
                icon: Saraburi
            },
            {
                id: "singburi",
                nameTH: "สิงห์บุรี",
                icon: Singburi
            },
            {
                id: "suphanburi",
                nameTH: "สุพรรณบุรี",
                icon: Suphanburi
            },
            {
                id: "uthaithani",
                nameTH: "อุทัยธานี",
                icon: Uthaithani
            },

        ]
    },
    {
        name: Eastern,
        provinces: [
            {
                id: "chachoengsao",
                nameTH: "ฉะเชิงเทรา",
                icon: Chachoengsao
            },
            {
                id: "chanthaburi",
                nameTH: "จันทบุรี",
                icon: Chanthaburi
            },
            {
                id: "chonburi",
                nameTH: "ชลบุรี",
                icon: Chonburi
            },
            {
                id: "prachinburi",
                nameTH: "ปราจีนบุรี",
                icon: Prachinburi
            },
            {
                id: "rayong",
                nameTH: "ระยอง",
                icon: Rayong
            },
            {
                id: "sakaeo",
                nameTH: "สระแก้ว",
                icon: Sakaeo
            },
            {
                id: "trat",
                nameTH: "ตราด",
                icon: Trat
            },
        ]
    },
    {
        name: Northeast,
        provinces: [
            {
                id: "amnatcharoen",
                nameTH: "อำนาจเจริญ",
                icon: Amnatcharoen
            },
            {
                id: "buengkan",
                nameTH: "บึงกาฬ",
                icon: Buengkan
            },
            {
                id: "buriram",
                nameTH: "บุรีรัมย์",
                icon: Buriram
            },
            {
                id: "chaiyaphum",
                nameTH: "ชัยภูมิ",
                icon: Chaiyaphum
            },
            {
                id: "kalasin",
                nameTH: "กาฬสินธุ์",
                icon: Kalasin
            },
            {
                id: "khonkaen",
                nameTH: "ขอนแก่น",
                icon: Khonkaen
            },
            {
                id: "loei",
                nameTH: "เลย",
                icon: Loei
            },
            {
                id: "mahasarakham",
                nameTH: "มหาสารคาม",
                icon: Mahasarakham
            },
            {
                id: "mukdahan",
                nameTH: "มุกดาหาร",
                icon: Mukdahan
            },
            {
                id: "nakhonphanom",
                nameTH: "นครพนม",
                icon: Nakhonphanom
            },
            {
                id: "nakhonratchasima",
                nameTH: "นครราชสีมา",
                icon: Nakhonratchasima
            },
            {
                id: "nongbualamphu",
                nameTH: "หนองบัวลำภู",
                icon: Nongbualamphu
            },
            {
                id: "nongkhai",
                nameTH: "หนองคาย",
                icon: Nongkhai
            },
            {
                id: "roiet",
                nameTH: "ร้อยเอ็ด",
                icon: Roiet
            },
            {
                id: "sakonnakhon",
                nameTH: "สกลนคร",
                icon: Sakonnakhon
            },
            {
                id: "sisaket",
                nameTH: "ศรีสะเกษ",
                icon: Sisaket
            },
            {
                id: "surin",
                nameTH: "สุรินทร์",
                icon: Surin
            },
            {
                id: "ubonratchathani",
                nameTH: "อุบลราชธานี",
                icon: Ubonratchathani
            },
            {
                id: "udonthani",
                nameTH: "อุดรธานี",
                icon: Udonthani
            },
            {
                id: "yasothon",
                nameTH: "ยโสธร",
                icon: Yasothon
            },
        ]
    },
    {
        name: Southern,
        provinces: [
            {
                id: "chumphon",
                nameTH: "ชุมพร",
                icon: Chumphon
            },
            {
                id: "krabi",
                nameTH: "กระบี่",
                icon: Krabi
            },
            {
                id: "nakhonsithammarat",
                nameTH: "นครศรีธรรมราช",
                icon: Nakhonsithammarat
            },
            {
                id: "narathiwat",
                nameTH: "นราธิวาส",
                icon: Narathiwat
            },
            {
                id: "phangnga",
                nameTH: "พังงา",
                icon: Phangnga
            },
            {
                id: "phatthalung",
                nameTH: "พัทลุง",
                icon: Phatthalung
            },
            {
                id: "pattani",
                nameTH: "ปัตตานี",
                icon: Pattani
            },
            {
                id: "phuket",
                nameTH: "ภูเก็ต",
                icon: Phuket
            },
            {
                id: "ranong",
                nameTH: "ระนอง",
                icon: Ranong
            },
            {
                id: "satun",
                nameTH: "สตูล",
                icon: Satun
            },
            {
                id: "songkhla",
                nameTH: "สงขลา",
                icon: Songkhla
            },
            {
                id: "suratthani",
                nameTH: "สุราษฎร์ธานี",
                icon: Suratthani
            },
            {
                id: "trang",
                nameTH: "ตรัง",
                icon: Trang
            },
            {
                id: "yala",
                nameTH: "ยะลา",
                icon: Yala
            },
        ]
    }
]

interface ThailandMapInterface {
    provinceFilter: {
        pickup: string,
        dropoff: string
    }
    setProvinceFilter: (value: {
        pickup: string,
        dropoff: string
    }) => void
}

const ThailandMap = (props: ThailandMapInterface) => {
    const { provinceFilter, setProvinceFilter } = props
    const jobInProvince = useRecoilValue(countJobInProvinceState)
    const [showJob, setShowJob] = useState("pickup")
    const [hoverProvince, setHoverProvince] = useState("")

    const handleSelectProvince = (province: string) => {
        if (provinceFilter[showJob] === province) {
            province = "ทั้งหมด"
        } else {
            const toggleNextContext = (showJob === "pickup" ? "dropoff" : "pickup")
            setShowJob(toggleNextContext)
        }
        setProvinceFilter({
            ...provinceFilter,
            [showJob]: province
        })
    }

    return (
        <Thailand>
            <MapOption>
                <RadioInputContainer>
                    <RadioInput
                        type="button"
                        value={showJob}
                        name="pickup"
                        onClick={() => setShowJob("pickup")}>
                        ต้นทาง
                        </RadioInput>
                    <RadioInput
                        type="button"
                        value={showJob}
                        name="dropoff"
                        onClick={() => setShowJob("dropoff")}>
                        ปลายทาง
                        </RadioInput>
                </RadioInputContainer>
                <span>ต้นทาง: {provinceFilter.pickup}</span>
                <span>ปลายทาง: {provinceFilter.dropoff}</span>
            </MapOption>
            {
                THAILAND_PROVINCES.map((zone) => (
                    <zone.name>
                        {
                            zone.provinces.map((province) => {
                                const noOfJob = jobInProvince[showJob][province.nameTH]
                                const isProvincePickup = (provinceFilter.pickup === province.nameTH)
                                const isProvinceDropoff = (provinceFilter.dropoff === province.nameTH)
                                const isProvincePickupDropoff = (isProvincePickup && isProvinceDropoff)
                                return (
                                    <TooltipCustom 
                                        title={ isProvincePickupDropoff ? "ต้นทาง / ปลายทาง" : (isProvincePickup ? "ต้นทาง" : (isProvinceDropoff ? "ปลายทาง" : province.nameTH))} 
                                        open={isProvincePickup || isProvinceDropoff || province.nameTH === hoverProvince}
                                        arrow>
                                        <Province 
                                            id={province.id} 
                                            onClick={() => handleSelectProvince(province.nameTH)} 
                                            onMouseOver={() => setHoverProvince(province.nameTH)}
                                            onMouseLeave={() => setHoverProvince("")}
                                            isActive={isProvincePickup || isProvinceDropoff}
                                        >
                                            {
                                                noOfJob > 0 &&
                                                <NumberOfJobs>{jobInProvince[showJob][province.nameTH]}</NumberOfJobs>
                                            }
                                            <province.icon />
                                        </Province>
                                    </TooltipCustom>
                                )
                            })
                        }
                    </zone.name>
                ))
            }
        </Thailand>
    )
}

export default ThailandMap
