import React from "react"
import JobStatus from "../../../components/common/JobStatus"
import withPrivateRoute from "../../../components/utilities/withPrivateRoute"

const JobStatusPage = () => {
	return (
		<JobStatus role="shipper" />
	)
}

export default withPrivateRoute(JobStatusPage, "shipper")