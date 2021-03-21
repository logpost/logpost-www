import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { countJobInProvinceState } from '../../store/atoms/jobDocumentState'
import { NumberOfJobs } from '../styles/GlobalComponents'
import { Chiangmai, Chiangrai, Kamphaengphet, Kanchanaburi, Lampang, Lamphun, Maehongson, Nakhonsawan, Nan, Phayao, Phetchabun, Phetchaburi, Phichit, Phitsanulok, Phrae, Prachuapkhirikhan, Ratchaburi, Sukhothai, Tak, Uttaradit } from './ProvincesIcon'

const Thailand = styled.div`
    ${NumberOfJobs} {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    button {
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

const LowerNorthern = styled.div`
    position: relative;
    left: 87px;
    top: 214px;

    #sukhothai {
        position: absolute;
        left: 87.69px;
        top: 3px;
    }

    #kamphaengphet {
        position: absolute;
        left: 75.69px;
        top: 43px;
    }

    #nakhonsawan {
        position: absolute;
        left: 73.63px;
        top: 84.03px;
    }

    #phitsanulok {
        position: absolute;
        left: 123.69px;
        top: 1.57px;
    }

    #phichit {
        position: absolute;
        left: 123.69px;
        top: 55px;
    }

    #phetchabun {
        position: absolute;
        left: 159.69px;
        top: 33px;
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
        name: LowerNorthern,
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
            }
        ]
    },
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
