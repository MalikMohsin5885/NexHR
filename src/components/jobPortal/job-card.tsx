"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"
import type { JobListing } from "@/types/jobPortal/types"

interface JobCardProps {
  job: JobListing
  isSaved: boolean
  onToggleSave: () => void
}

export default function JobCard({ job, isSaved, onToggleSave }: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Determine background color based on company
  const getBgColor = () => {
    switch (job.company.toLowerCase()) {
      case "amazon":
        return "bg-orange-50"
      case "google":
        return "bg-green-50"
      case "dribbble":
        return "bg-purple-50"
      case "twitter":
        return "bg-blue-50"
      case "airbnb":
        return "bg-pink-50"
      case "apple":
        return "bg-gray-50"
      // More varied colors for additional companies
      case "microsoft":
        return "bg-blue-100"
      case "netflix":
        return "bg-red-50"
      case "spotify":
        return "bg-green-100"
      case "adobe":
        return "bg-red-100"
      case "facebook":
        return "bg-indigo-100"
      case "uber":
        return "bg-slate-100"
      default:
        return "bg-[#F2F1F7]"
    }
  }

  // Get company logo
  const getCompanyLogo = () => {
    switch (job.company.toLowerCase()) {
      case "amazon":
        return "A"
      case "google":
        return "G"
      case "dribbble":
        return "D"
      case "twitter":
        return "T"
      case "airbnb":
        return "A"
      case "apple":
        return "A"
      case "microsoft":
        return "M"
      case "netflix":
        return "N"
      case "spotify":
        return "S"
      case "adobe":
        return "A"
      case "facebook":
        return "F"
      case "uber":
        return "U"
      default:
        return "C"
    }
  }

  // Get logo background color
  const getLogoBgColor = () => {
    switch (job.company.toLowerCase()) {
      case "amazon":
        return "bg-black text-white"
      case "google":
        return "bg-white border border-gray-200"
      case "dribbble":
        return "bg-pink-500 text-white"
      case "twitter":
        return "bg-blue-400 text-white"
      case "airbnb":
        return "bg-pink-600 text-white"
      case "apple":
        return "bg-white text-black border border-gray-200"
      case "microsoft":
        return "bg-blue-600 text-white"
      case "netflix":
        return "bg-red-600 text-white"
      case "spotify":
        return "bg-green-600 text-white"
      case "adobe":
        return "bg-red-700 text-white"
      case "facebook":
        return "bg-blue-700 text-white"
      case "uber":
        return "bg-black text-white"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <div
      className={`rounded-xl overflow-hidden ${getBgColor()} transition-all duration-200 ${
        isHovered ? "shadow-lg transform translate-y-[-4px]" : "shadow"
      } flex flex-col h-[280px]`} /* Fixed height for consistent cards */
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main content area with flex-grow to push the details button to bottom */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Date and Bookmark */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs bg-white px-3 py-1 rounded-full text-[#5C5470]">{job.date}</div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave()
            }}
            className="text-[#5C5470] hover:text-[#2A2438] transition-colors"
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        {/* Company and Title */}
        <div className="mb-3">
          <div className="text-sm text-[#5C5470] mb-1">{job.company}</div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-[#2A2438] pr-2">{job.title}</h3>
            <div
              className={`w-8 h-8 rounded-full ${getLogoBgColor()} flex items-center justify-center font-bold text-sm`}
            >
              {getCompanyLogo()}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-white text-[#5C5470] border border-[#DBD8E3] mb-1 mr-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer to push salary and details to bottom */}
        <div className="flex-grow"></div>

        {/* Salary and Location */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <div className="text-base font-bold text-[#2A2438]">${job.salary}/hr</div>
            <div className="text-xs text-[#5C5470]">{job.location}</div>
          </div>

          <button className="bg-[#2A2438] hover:bg-[#352F44] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  )
}
