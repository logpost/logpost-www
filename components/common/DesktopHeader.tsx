import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    background-color: white;
    width: 100%;
    box-shadow: 0px 4px 18px rgba(52, 71, 92, 0.18);
    padding: 2.1rem;
    height: max-content;
`

const DesktopHeader:FunctionComponent = (props) => {
    const { children } = props

    return (
        <HeaderContainer>
            {children}
        </HeaderContainer>
    )
}

export default DesktopHeader
