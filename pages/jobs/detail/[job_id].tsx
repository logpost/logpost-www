import React from 'react'
import { useRouter } from 'next/router'

const ShipperPage = () => {
    const router = useRouter()
    const { job_id } = router.query
  
    return (
        <h1>
            {job_id}
        </h1>
    )
}

export default ShipperPage
