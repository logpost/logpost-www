import React from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import JobCard from "../../components/common/JobCard"
import { FilterIcon, PlusIcon, SearchIcon } from "../../components/common/Icons"
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

const AddJob = styled.button`
  height: 7rem;
  width: 7rem;
  background-color: hsl(16, 56%, 51%);
  position: fixed;
  z-index: 1;
  right: 2.6rem;
  bottom: 8rem;
  border-radius: 100%;
  box-shadow: 4px 4px 12px 0 hsla(212, 28%, 28%, 0.24);
  font-size: 10rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 4rem;
    width: 4rem;

    path {
      fill: white;
    }
  }
`

const JobsPage = () => {
  const router = useRouter()

  return (
    <JobsPageContainer>
      <NavigationBar />
      <AddJob onClick={() => router.push("/jobs/add/1")}><PlusIcon/></AddJob>
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
