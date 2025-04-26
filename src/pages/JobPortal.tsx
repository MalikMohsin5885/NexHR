import JobListings from "@/components/jobPortal/job-listings"
import Header from "@/components/jobPortal/header"

import React from "react"
import JobPortalLayout from "@/layouts/JobPortalLayout"

const JobPortal: React.FC = () => {
  return (
    <JobPortalLayout>
      <div className="min-h-screen bg-[#F2F1F7]">
        <Header />
        <JobListings />
      </div>
    </JobPortalLayout>
  )
}

export default JobPortal

