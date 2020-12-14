import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { SearchIcon } from "./Icons"

interface SearchBarInterface {
	placeholder: string
	setValue: (value: string) => void
}

const SearchBarContainer = styled.div`
	display: flex;
	border-radius: 3.3rem;
	align-items: center;
	padding: 0.4rem 1rem;
	background: hsl(0, 0%, 93%);
	width: 86%;
`

const Input = styled.input`
	padding: 0 0.8rem;
	font-size: 1.6rem;
	width: 95%;
	border: 0;
	border-radius: 3.3rem;
	background: hsl(0, 0%, 93%);

	::placeholder {
		color: hsl(0, 0%, 66%);
	}
`

const SearchBar = (props: SearchBarInterface) => {
	const { placeholder, setValue } = props

	return (
		<SearchBarContainer>
			<SearchIcon />
			<Input
				placeholder={placeholder}
				onChange={(e) => setValue(e.target.value)}
			/>
		</SearchBarContainer>
	)
}

export default SearchBar
