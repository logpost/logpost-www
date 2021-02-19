import { css, DefaultTheme } from 'styled-components'
import { breakpointSize } from "../styles/Breakpoints";

interface BreakpointGenerator {
    medium?: DefaultTheme,
    large?: DefaultTheme,
    extraLarge?: DefaultTheme
}

const breakpointGenerator = ({medium, large, extraLarge}: BreakpointGenerator) => css`
    ${medium && 
    `@media screen and (min-width: ${breakpointSize.small}px) {
		${medium}
	}`}
    
    ${large && 
    `@media screen and (min-width: ${breakpointSize.medium}px) {
		${large}
	}`}

    ${extraLarge && 
    `@media screen and (min-width: ${breakpointSize.large}px) {
		${extraLarge}
	}`}
`

export default breakpointGenerator