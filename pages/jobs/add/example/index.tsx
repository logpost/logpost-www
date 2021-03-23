import React from 'react'
import styled from 'styled-components'
import JobAddStepFour from '../../../../components/switcher/jobs/add/JobAddStepFour'
import withPrivateRoute from '../../../../components/utilities/withPrivateRoute'

const JobExampleContainer = styled.div`
    width: 100%;
`

const JobExamplePage = () => {
    return (
        <JobExampleContainer>
            <JobAddStepFour />
        </JobExampleContainer>
    )
}

export default withPrivateRoute(JobExamplePage, "shipper")
