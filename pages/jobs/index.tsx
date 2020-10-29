import React from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import JobCard from "../../components/common/JobCard"
import { FilterIcon, SearchIcon } from "../../components/common/Icons"
import { PrimaryButton } from "../../components/styles/GlobalComponents"
import NavigationBar from "../../components/common/NavigationBar"

const JobsPageContainer = styled.div`

    ${PrimaryButton} {
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.45rem 1.2rem;
        display: flex;
        height: fit-content;

        svg {
            margin-right: 0.6rem;
        }
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: hsl(212, 28%, 28%);
    padding: 1.6rem 2rem;
    align-items: center
`

const SearchBarContainer = styled.div`
  display: flex;
  border-radius: 3.3rem;
  align-items: center;
  padding: 0.4rem 1rem;
  background: white;
  width: 70%;
`

const SearchBar = styled.input`
  padding: 0 0.8rem;
  font-size: 1.6rem;
  border: 0;
  border-radius: 3.3rem;

  ::placeholder {
    color: hsl(0, 0%, 66%);
  }
`

const JobsPage = () => {
  const router = useRouter()

  return (
    <JobsPageContainer>
      <NavigationBar />
      <Header>
            <SearchBarContainer>
                <SearchIcon />
                <SearchBar placeholder="ค้นหา" />
            </SearchBarContainer>
            <PrimaryButton><FilterIcon />ตัวกรอง</PrimaryButton>
      </Header>
      <div>
        <JobCard origin="jobs-page" />
        <JobCard origin="jobs-page" />
        <JobCard origin="jobs-page" />
      </div>
    </JobsPageContainer>
  )
}

export default JobsPage
