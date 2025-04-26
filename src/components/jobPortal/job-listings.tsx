import { useState } from "react"
import JobCard from "./job-card"
import { jobData } from "@/data/job-data"

export default function JobListings() {
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6

  // Calculate total pages
  const totalPages = Math.ceil(jobData.length / jobsPerPage)

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob)

  const toggleSaveJob = (id: string) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id))
    } else {
      setSavedJobs([...savedJobs, id])
    }
  }

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#2A2438] flex items-center">
          Recommended jobs
          <span className="ml-2 text-sm bg-[#DBD8E3] text-[#2A2438] px-3 py-1 rounded-full">{jobData.length}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedJobs.includes(job.id)}
            onToggleSave={() => toggleSaveJob(job.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded text-[#5C5470] disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1 ? "bg-[#DBD8E3] text-[#2A2438]" : "text-[#5C5470] hover:bg-[#F2F1F7]"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded text-[#5C5470] disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
