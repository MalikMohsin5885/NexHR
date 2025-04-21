import JobListings from "./components/job-listings"
import Header from "./components/header"

export default function JobPortal() {
  return (
    <div className="min-h-screen bg-[#F2F1F7]">
      <Header />
      <JobListings />
    </div>
  )
}
