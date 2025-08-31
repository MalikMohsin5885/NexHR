"use client"

import { useState, useEffect } from "react"
import JobCard from "./job-card"
import { fetchJobs } from "@/services/jobPortalservice"
import { JobListing } from "@/types/jobPortal/types"
import { Loader2 } from "lucide-react"

export default function JobListings() {
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [totalJobs, setTotalJobs] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const jobsPerPage = 6

  // Calculate total pages
  const totalPages = Math.ceil(totalJobs / jobsPerPage)

  // Load jobs from API
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true)
      try {
        const result = await fetchJobs(currentPage, jobsPerPage)
        console.log("==========================================", result)
        setJobs(result.jobs)
        setTotalJobs(result.totalCount)
        setError(null)
      } catch (err) {
        setError("Failed to load jobs. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [currentPage])

  const toggleSaveJob = (id: string) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id))
    } else {
      setSavedJobs([...savedJobs, id])
    }
  }

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#2A2438] flex items-center">
          Recommended jobs <span className="ml-2 text-sm bg-[#DBD8E3] text-[#2A2438] px-3 py-1 rounded-full">{totalJobs}</span>
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#5C5470]" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-[#5C5470] p-4 bg-[#F2F1F7] rounded-lg">
          No jobs found. Try adjusting your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onToggleSave={() => toggleSaveJob(job.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded text-[#5C5470] disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              // Show ellipsis for many pages
              if (totalPages > 7) {
                // Always show first and last pages
                if (index === 0 || index === totalPages - 1) {
                  return (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === index + 1 ? "bg-[#DBD8E3] text-[#2A2438]" : "text-[#5C5470] hover:bg-[#F2F1F7]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                }
                
                // Show pages around current page
                if (
                  index >= currentPage - 2 &&
                  index <= currentPage
                ) {
                  return (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === index + 1 ? "bg-[#DBD8E3] text-[#2A2438]" : "text-[#5C5470] hover:bg-[#F2F1F7]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                }
                
                // Show ellipsis
                if (index === 1 || index === totalPages - 2) {
                  return <span key={index} className="px-1">...</span>
                }
                
                return null
              }
              
              // Show all pages if there are 7 or fewer
              return (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1 ? "bg-[#DBD8E3] text-[#2A2438]" : "text-[#5C5470] hover:bg-[#F2F1F7]"
                  }`}
                >
                  {index + 1}
                </button>
              )
            })}

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