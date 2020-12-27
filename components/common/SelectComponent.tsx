import React, { useState } from 'react'
import styled from "styled-components"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { RightArrow } from "./Icons"

const SelectCustom = styled(Select)`
	width: 22rem;
	height: 3.4rem;
	border-radius: 0.6rem;
	border: solid 0.1rem hsl(212, 28%, 28%);
	margin-top: 1rem;

	.MuiSelect-select {
		padding-left: 1.2rem;

		&:focus {
			background-color: transparent;
		}
	}

	&.MuiInputBase-root {
		font-size: 1.6rem;
		font-family: "Bai Jamjuree";

		svg {
			position: absolute;
			top: 0;
			right: 0;
			height: 3.2rem;
			width: 3.2rem;
			transform: rotate(90deg);
			padding: 1rem;
			background: hsl(212,28%,28%);
			border-radius: 5px 5px 0 0;

			path {
				fill: white;
			}
		}
	}

	&.MuiInput-underline {
		&:before {
			content: none;
		}

		&:after {
			content: none;
		}
	}

	.MuiPopover-paper {
    	margin-top: 7px;
		box-shadow: 4px 4px 18px rgba(52, 71, 92, 0.18);
		width: 22rem;

		&.MuiPaper-rounded {
    		border-radius: 4px;
		}

		.MuiList-padding {
			padding: 0;
		}
  	}
`

const MenuItemCustom = styled(MenuItem)`
	&.MuiMenuItem-root {
		font-size: 1.6rem;
		font-family: "Bai Jamjuree";

		&.Mui-selected {
			background-color: hsl(16, 56%, 94%);
			font-weight: 500;
		}
	}
`

const CustomSelectIcon = () => {
    return (
      <RightArrow
        className="MuiSvgIcon-root MuiSelect-icon"
      />
    );
};

const SelectComponent = (props) => {
	const { value, setValue, menuList } = props

	return (
		<SelectCustom
			id="select-component"
			value={value}
			onChange={(e: React.ChangeEvent<{ value: number }>) => setValue(e.target.value)}
			MenuProps={{
				anchorOrigin: {
					vertical: "bottom",
					horizontal: "left"
				},
				transformOrigin: {
					vertical: "top",
					horizontal: "left"
				},
				disablePortal: true,
				getContentAnchorEl: null
			}}
			IconComponent={CustomSelectIcon}
		>
			{
				menuList.map((menuItem: string, index: number) => {
					return (
						<MenuItemCustom key={index} value={index + 1}>{menuItem}</MenuItemCustom>
					)
				})
			}
		</SelectCustom>
	)
}

export default SelectComponent
