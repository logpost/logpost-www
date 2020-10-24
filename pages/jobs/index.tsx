import React from 'react'
import { useRouter } from 'next/router'

import JobsAll from '../../components/switcher/jobs/status/JobsAll'
import JobsWating from '../../components/switcher/jobs/status/JobsWating'
import JobsShipping from '../../components/switcher/jobs/status/JobsShipping'
import JobsSuccess from '../../components/switcher/jobs/status/JobsSuccess'

const JobsSwitcherPage = () => {
    const router = useRouter()
    const { status } = router.query
    return (
        <div>
        {
            {
              all: <JobsAll />,
              waiting: <JobsWating />,
              shipping: <JobsShipping />,
              success: <JobsSuccess />,
            }[status as string]
        }
        </div>
    )
}

export default JobsSwitcherPage
