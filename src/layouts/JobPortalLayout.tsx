import React from "react"

interface JobPortalLayoutProps {
  children: React.ReactNode
}

const JobPortalLayout: React.FC<JobPortalLayoutProps> = ({ children }) => {
  return <div>{children}</div>
}

export default JobPortalLayout
