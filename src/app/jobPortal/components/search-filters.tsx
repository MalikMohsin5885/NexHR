"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function SearchFilters() {
  const [salaryRange, setSalaryRange] = useState([1200, 20000])
  const [sliderPosition, setSliderPosition] = useState({ left: 10, right: 90 })

  // Filter options
  const jobTypes = ["Designer", "Developer", "Manager", "Marketing", "Sales"]
  const locations = ["Remote", "New York", "San Francisco", "London", "Berlin"]
  const experiences = ["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"]
  const periods = ["Per month", "Per year", "Per hour", "Per project"]

  return (
    <div className="bg-[#2A2438] text-white py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2 md:gap-4 justify-between items-center">
          {/* Job Type Dropdown */}
          <div className="dropdown-container">
            <button className="dropdown-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>Designer</span>
              <ChevronDown className="ml-auto w-4 h-4" />
            </button>
            <div className="dropdown-content">
              {jobTypes.map((type) => (
                <div key={type} className="dropdown-item">
                  {type}
                </div>
              ))}
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="dropdown-container">
            <button className="dropdown-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Work location</span>
              <ChevronDown className="ml-auto w-4 h-4" />
            </button>
            <div className="dropdown-content">
              {locations.map((location) => (
                <div key={location} className="dropdown-item">
                  {location}
                </div>
              ))}
            </div>
          </div>

          {/* Experience Dropdown */}
          <div className="dropdown-container">
            <button className="dropdown-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span>Experience</span>
              <ChevronDown className="ml-auto w-4 h-4" />
            </button>
            <div className="dropdown-content">
              {experiences.map((exp) => (
                <div key={exp} className="dropdown-item">
                  {exp}
                </div>
              ))}
            </div>
          </div>

          {/* Period Dropdown */}
          <div className="dropdown-container">
            <button className="dropdown-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              <span>Per month</span>
              <ChevronDown className="ml-auto w-4 h-4" />
            </button>
            <div className="dropdown-content">
              {periods.map((period) => (
                <div key={period} className="dropdown-item">
                  {period}
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range Slider */}
          <div className="flex flex-col w-full md:w-auto mt-4 md:mt-0">
            <div className="flex justify-between mb-1 text-sm">
              <span>Salary range</span>
              <span>
                ${salaryRange[0]} - ${salaryRange[1]}
              </span>
            </div>
            <div className="relative w-full md:w-[300px] h-2 bg-[#5C5470] rounded-full cursor-pointer">
              <div
                className="absolute h-2 bg-[#DBD8E3] rounded-full"
                style={{
                  left: `${sliderPosition.left}%`,
                  right: `${100 - sliderPosition.right}%`,
                }}
              ></div>
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full cursor-grab active:cursor-grabbing"
                style={{ left: `${sliderPosition.left}%` }}
                onMouseDown={(e) => {
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const container = e.currentTarget.parentElement
                    if (!container) return

                    const rect = container.getBoundingClientRect()
                    const newPosition = Math.max(
                      0,
                      Math.min(sliderPosition.right - 10, ((moveEvent.clientX - rect.left) / rect.width) * 100),
                    )

                    setSliderPosition({ ...sliderPosition, left: newPosition })

                    // Calculate new salary value
                    const minSalary = 1000
                    const maxSalary = 25000
                    const newSalary = Math.round(minSalary + (newPosition / 100) * (maxSalary - minSalary))
                    setSalaryRange([newSalary, salaryRange[1]])
                  }

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove)
                    document.removeEventListener("mouseup", handleMouseUp)
                  }

                  document.addEventListener("mousemove", handleMouseMove)
                  document.addEventListener("mouseup", handleMouseUp)
                }}
              ></div>
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full cursor-grab active:cursor-grabbing"
                style={{ left: `${sliderPosition.right}%` }}
                onMouseDown={(e) => {
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const container = e.currentTarget.parentElement
                    if (!container) return

                    const rect = container.getBoundingClientRect()
                    const newPosition = Math.max(
                      sliderPosition.left + 10,
                      Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100),
                    )

                    setSliderPosition({ ...sliderPosition, right: newPosition })

                    // Calculate new salary value
                    const minSalary = 1000
                    const maxSalary = 25000
                    const newSalary = Math.round(minSalary + (newPosition / 100) * (maxSalary - minSalary))
                    setSalaryRange([salaryRange[0], newSalary])
                  }

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove)
                    document.removeEventListener("mouseup", handleMouseUp)
                  }

                  document.addEventListener("mousemove", handleMouseMove)
                  document.addEventListener("mouseup", handleMouseUp)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
