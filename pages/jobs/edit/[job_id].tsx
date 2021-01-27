import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { jobDetailsState } from '../../../store/atoms/jobDetailsState'
import { getJobDetailsByID } from '../../../components/utilities/apis'
import { JobDocument } from '../../../entities/interface/job'

const EditJobPage = () => {
    const router = useRouter()
    const jobID = router.query.job_id as string
    const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState)

    useEffect(() => {
        getJobDetailsByID(jobID, (jobDocument: JobDocument) => {
            setJobDetails(jobDocument)
        })
    }, [router.query])

    return (
        <div>
            
        </div>
    )
}

export default EditJobPage
