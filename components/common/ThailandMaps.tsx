import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { countJobInProvinceState } from '../../store/atoms/jobDocumentState'
import { NumberOfJobs } from '../styles/GlobalComponents'
import { Amnatcharoen, Angthong, Bangkok, Buengkan, Buriram, Chachoengsao, Chainat, Chaiyaphum, Chanthaburi, Chiangmai, Chiangrai, Chonburi, Chumphon, Kalasin, Kamphaengphet, Kanchanaburi, Khonkaen, Krabi, Lampang, Lamphun, Loei, Lopburi, Maehongson, Mahasarakham, Mukdahan, Nakhonnayok, Nakhonpathom, Nakhonphanom, Nakhonratchasima, Nakhonsawan, Nakhonsithammarat, Nan, Narathiwat, Nongbualamphu, Nongkhai, Nonthaburi, Pathumthani, Pattani, Phangnga, Phatthalung, Phayao, Phetchabun, Phetchaburi, Phichit, Phitsanulok, Phrae, Phranakhonsiayutthaya, Phuket, Prachinburi, Prachuapkhirikhan, Ranong, Ratchaburi, Rayong, Roiet, Sakaeo, Sakonnakhon, Samutprakan, Samutsakhon, Samutsongkhram, Saraburi, Satun, Singburi, Sisaket, Songkhla, Sukhothai, Suphanburi, Suratthani, Surin, Tak, Trang, Trat, Ubonratchathani, Udonthani, Uthaithani, Uttaradit, Yala, Yasothon } from './ProvincesIcon'

const Thailand = styled.div`
    ${NumberOfJobs} {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    button {
        position: absolute;

        &:hover {
            svg path {
                stroke: hsl(16, 56%, 51%);
            }
        }
    }
`

const Northern = styled.div`
    position: relative;
    left: 87px;
    top: 38px;

    #maehongson {
        position: absolute;
        left: 0px;
        top: 13.69px;
    }

    #chiangmai {
        position: absolute;
        left: 24.7px;
        top: 8.81px;
    }

    #chiangrai {
        position: absolute;
        left: 79.9px;
        top: 0;
    }

    #phayao {
        position: absolute;
        left: 117.23px;
        top: 26.64px;
    }

    #lamphun {
        position: absolute;
        left: 56.06px;
        top: 76.37px;
    }

    #lampang {
        position: absolute;
        left: 85.2px;
        top: 40.61px;
    }

    #uttaradit {
        position: absolute;
        left: 147.44px;
        top: 92.26px;
    }

    #phrae {
        position: absolute;
        left: 114.78px;
        top: 71.07px;
    }

    #nan {
        position: absolute;
        left: 154.95px;
        top: 30.02px;
    }
`

const Central = styled.div`
    position: relative;
    left: 140px;
    top: 214px;

    #sukhothai {
        left: 68px;
        top: 1.43px;
    }

    #kamphaengphet {
        left: 56px;
        top: 41.43px;
    }

    #nakhonsawan {
        left: 53.93px;
        top: 82.46px;
    }

    #phitsanulok {
        left: 104px;
        top: 0px;
    }

    #phichit {
        left: 104px;
        top: 53.43px;
    }

    #phetchabun {
        left: 140px;
        top: 31.43px;
    }

    #angthong {
        left: 106.95px;
        top: 169.58px;
    }

    #phranakhonsiayutthaya {
        left: 116.46px;
        top: 199.91px;
    }

    #bangkok {
        left: 121px;
        top: 271.43px;
    }

    #chainat {
        left: 43.66px;
        top: 119.93px;
    }

    #lopburi {
        left: 138px;
        top: 110.43px;
    }

    #nakhonnayok {
        left: 176.03px;
        top: 187.74px;
    }

    #nakhonpathom {
        left: 58.69px;
        top: 222.78px;
    }

    #nonthaburi {
        left: 113.19px;
        top: 242.72px;
    }

    #pathumthani {
        left: 143.74px;
        top: 237.28px;
    }

    #samutprakan {
        left: 154px;
        top: 302.43px;
    }

    #samutsakhon {
        left: 71.05px;
        top: 264.03px;
    }

    #samutsongkhram {
        left: 38.13px;
        top: 276.68px;
    }

    #saraburi {
        left: 154px;
        top: 143.43px;
    }

    #singburi {
        left: 102.16px;
        top: 129.16px;
    }

    #suphanburi {
        left: 37.21px;
        top: 159.5px;
    }

    #uthaithani {
        left: 0.64px;
        top: 91.28px;
    }
`

const Western = styled.div`
    position: relative;
    left: 30px;
    top: 214px;

    #tak {
        position: absolute;
        left: 9.31px;
        top: 1px;
    }

    #kanchanaburi {
        position: absolute;
        left: 5.83px;
        top: 103.02px;
    }

    #phetchaburi {
        position: absolute;
        left: 30.13px;
        top: 215.08px;
    }

    #prachuapkhirikhan {
        position: absolute;
        left: 29.42px;
        top: 260.88px;
    }

    #ratchaburi {
        position: absolute;
        left: 34.91px;
        top: 172.86px;
    }
`

const Eastern = styled.div`
    position: relative;
    left: 400px;
    top: 460px;

    #chachoengsao {
        left: 1px;
        top: 30.52px;
    }

    #chanthaburi {
        left: 53.85px;
        top: 66.12px;
    }

    #chonburi {
        left: 0;
        top: 60.5px;
    }

    #prachinburi {
        left: 7px;
        top: 0;
    }

    #rayong {
        left: 18px;
        top: 92px;
    }

    #sakaeo {
        left: 60.16px;
        top: 13.11px;
    }

    #trat {
        left: 90px;
        top: 97.6px;
    }
`

const Northeast = styled.div`
    position: relative;
    left: 360px;
    top: 140px;

    #amnatcharoen {
        left: 221.36px;
        top: 138.96px;
    }

    #buengkan {
        left: 127px;
        top: 1.81px;
    }

    #buriram {
        left: 84.3px;
        top: 180.25px;
    }

    #chaiyaphum {
        left: 9.77px;
        top: 124.46px;
    }

    #kalasin {
        left: 124.23px;
        top: 92.4px;
    }

    #khonkaen {
        left: 50px;
        top: 100.81px;
    }

    #loei {
        left: 0;
        top: 16.81px;
    }

    #mahasarakham {
        left: 111.09px;
        top: 137.51px;
    }

    #mukdahan {
        left: 173.19px;
        top: 90.81px;
    }

    #nakhonphanom {
        left: 159.67px;
        top: 30.78px;
    }

    #nakhonratchasima {
        left: 14.68px;
        top: 176.75px;
    }

    #nongbualamphu {
        left: 2px;
        top: 84.81px;
    }

    #nongkhai {
        left: 49.13px;
        top: 1.33px;
    }

    #roiet {
        left: 143.86px;
        top: 129.82px;
    }

    #sakonnakhon {
        left: 121px;
        top: 36.14px;
    }

    #sisaket {
        left: 192.52px;
        top: 183.12px;
    }

    #surin {
        left: 140.33px;
        top: 182.53px;
    }

    #ubonratchathani {
        left: 224.83px;
        top: 162.89px;
    }

    #udonthani {
        left: 46.86px;
        top: 40.51px;
    }

    #yasothon {
        left: 190.24px;
        top: 132.17px;
    }
`

const Southern = styled.div`
    position: relative;
    left: 120px;
    top: 560px;

    #chumphon {
        left: 44.04px;
        top: 2.52px;
    }

    #krabi {
        left: 30px;
        top: 147.6px;
    }

    #nakhonsithammarat {
        left: 82px;
        top: 110px;
    }

    #narathiwat {
        left: 232.73px;
        top: 260.6px;
    }

    #phangnga {
        left: 6.4px;
        top: 90.44px;
    }

    #phatthalung {
        left: 113.17px;
        top: 194.2px;
    }

    #pattani {
        left: 189.51px;
        top: 232px;
    }

    #phuket {
        left: 3.77px;
        top: 156.59px;
    }

    #ranong {
        left: 20.23px;
        top: 8.61px;
    }

    #satun {
        left: 102.35px;
        top: 243.23px;
    }

    #songkhla {
        left: 136.51px;
        top: 232px;
    }

    #suratthani {
        left: 35.8px;
        top: 78.6px;
    }

    #trang {
        left: 71.27px;
        top: 191.64px;
    }

    #yala {
        left: 191.62px;
        top: 264.14px;
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

const ThailandMaps = () => {
    const jobInProvince = useRecoilValue(countJobInProvinceState)
    const [showJob, setShowJob] = useState("pickup")

    return (
        <Thailand>
            {
                THAILAND_PROVINCES.map((zone) => (
                    <zone.name>
                        {
                            zone.provinces.map((province) => {
                                const noOfJob = jobInProvince[showJob][province.nameTH]
                                return (
                                    <button id={province.id}>
                                        {
                                            noOfJob > 0 && 
                                            <NumberOfJobs>{jobInProvince[showJob][province.nameTH]}</NumberOfJobs>
                                        }
                                        <province.icon />
                                    </button>
                                )
                            })
                        }
                    </zone.name>
                ))
            }
        </Thailand>
    )
}

export default ThailandMaps
