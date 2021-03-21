import React from 'react'
import styled from 'styled-components'
import JobAddStepFour from '../../../../components/switcher/jobs/add/JobAddStepFour'

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

export default JobExamplePage
