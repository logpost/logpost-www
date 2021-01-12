import React, { useRef, useEffect } from "react"
import styled from "styled-components"

interface ScrollableInterface {
	currentTab: string
	setCurrentTab: (nextTab: string) => void
	tabs: {
		name: string
		content: string
	}[]
	scrollAtIndex: number
}

const StatusTab = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	overflow-x: auto;
	white-space: nowrap;
	background-color: hsl(212, 28%, 28%);
	padding: 1.75rem 1rem;
	display: flex;
`

const Line = styled.div`
	background: white;
	width: 100%;
	height: 0.2rem;
	border-radius: 10rem;
	position: absolute;
	bottom: -0.4rem;
`

const StatusItem = styled.button`
	font-size: 2rem;
	width: 120%;
	color: white;
	display: flex;
	flex-direction: column;
	padding: 0 1.05rem;
	outline: none;

	> div {
		position: relative;

		&:before {
			content: attr(data-content);
			display: block;
			font-weight: bold;
			height: 0;
			visibility: ${(props) =>
		props.name === props.value ? "visible" : "hidden"};
		}

		&:after {
			content: attr(data-content);
			visibility: ${(props) =>
		props.name === props.value ? "hidden" : "visible"};
		}

		${Line} {
			display: ${(props) => (props.name === props.value ? "block" : "none")};
		}
	}
`

const ScrollableTab = (props: ScrollableInterface) => {
	const { currentTab, setCurrentTab, tabs, scrollAtIndex } = props
	const ref = useRef(null)

	useEffect(() => {
		const tabsName = tabs.map(tab => tab.name)
		if (tabsName.indexOf(currentTab) >= scrollAtIndex) {
			ref.current.scrollLeft += 200
		} else {
			ref.current.scrollLeft -= 200
		}
	}, [currentTab])

	const TabItems = () => {
		const listOfItems = []
		tabs.map((item, tabIndex) => {
			listOfItems.push(
				<StatusItem
					key={tabIndex}
					name={item.name}
					value={currentTab}
					onClick={() => setCurrentTab(item.name)}
				>
					<div data-content={item.content}>
						<Line />
					</div>
				</StatusItem>
			)
		})
		return listOfItems
	}

	return (
		<StatusTab ref={ref}>
			{TabItems()}
		</StatusTab>
	)
}

export default ScrollableTab
