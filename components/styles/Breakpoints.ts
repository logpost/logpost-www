import styled from 'styled-components'

export const breakpointSize = {
    small: 600,
    medium: 960,
    large: 1280
}

export const BreakpointSM = styled.div`
    width: 100%;
    
    @media screen and (min-width: ${breakpointSize.small}px) {
        display: none;
        background-color: blue;
    }
`

export const BreakpointMD = styled.div`
    width: 100%;

    @media screen and (min-width: ${breakpointSize.medium}px) {
        display: none;
        background-color: blue;
    }
`

export const BreakpointLG = styled.div`
    width: 100%;

    @media screen and (max-width: ${breakpointSize.medium}px) {
        display: none;
        background-color: blue;
    }
`