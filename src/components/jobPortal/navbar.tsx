"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, FileText } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)

  const handleLinkClick = (link: string) => {
    setActiveLink(link === activeLink ? null : link)
  }

  return (
    <header className="bg-[#2A2438] text-white py-4 px-4 md:px-6 border-b border-[#352F44]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and brand */}
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span className="font-bold text-lg tracking-tight">NexHR</span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-[#5C5470] rounded p-1"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            <li
              className={
                activeLink === "find-job"
                  ? "border-b-2 border-[#DBD8E3] text-[#DBD8E3]"
                  : "hover:text-[#DBD8E3] hover:border-b-2 hover:border-[#DBD8E3]"
              }
            >
              <Link
                href="#"
                className="block py-1 text-sm font-medium transition-colors"
                onClick={() => handleLinkClick("find-job")}
              >
                Find job
              </Link>
            </li>
            <li
              className={
                activeLink === "messages"
                  ? "border-b-2 border-[#DBD8E3] text-[#DBD8E3]"
                  : "hover:text-[#DBD8E3] hover:border-b-2 hover:border-[#DBD8E3]"
              }
            >
              <Link
                href="#"
                className="block py-1 text-sm font-medium transition-colors"
                onClick={() => handleLinkClick("messages")}
              >
                Messages
              </Link>
            </li>
            <li
              className={
                activeLink === "hiring"
                  ? "border-b-2 border-[#DBD8E3] text-[#DBD8E3]"
                  : "hover:text-[#DBD8E3] hover:border-b-2 hover:border-[#DBD8E3]"
              }
            >
              <Link
                href="#"
                className="block py-1 text-sm font-medium transition-colors"
                onClick={() => handleLinkClick("hiring")}
              >
                Hiring
              </Link>
            </li>
            <li
              className={
                activeLink === "community"
                  ? "border-b-2 border-[#DBD8E3] text-[#DBD8E3]"
                  : "hover:text-[#DBD8E3] hover:border-b-2 hover:border-[#DBD8E3]"
              }
            >
              <Link
                href="#"
                className="block py-1 text-sm font-medium transition-colors"
                onClick={() => handleLinkClick("community")}
              >
                Community
              </Link>
            </li>
            <li
              className={
                activeLink === "faq"
                  ? "border-b-2 border-[#DBD8E3] text-[#DBD8E3]"
                  : "hover:text-[#DBD8E3] hover:border-b-2 hover:border-[#DBD8E3]"
              }
            >
              <Link
                href="#"
                className="block py-1 text-sm font-medium transition-colors"
                onClick={() => handleLinkClick("faq")}
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        {/* User profile */}
        <div className="hidden md:flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#5C5470] cursor-pointer hover:bg-[#DBD8E3] hover:text-[#2A2438] transition-colors flex items-center justify-center">
            <span className="font-medium text-xs">JD</span>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#2A2438] z-50 md:hidden shadow-lg border-t border-[#5C5470]">
            <ul className="flex flex-col p-4">
              <li className={`py-2 border-b border-[#5C5470] ${activeLink === "find-job" ? "text-[#DBD8E3]" : ""}`}>
                <Link href="#" className="block text-sm font-medium" onClick={() => handleLinkClick("find-job")}>
                  Find job
                </Link>
              </li>
              <li className={`py-2 border-b border-[#5C5470] ${activeLink === "messages" ? "text-[#DBD8E3]" : ""}`}>
                <Link href="#" className="block text-sm font-medium" onClick={() => handleLinkClick("messages")}>
                  Messages
                </Link>
              </li>
              <li className={`py-2 border-b border-[#5C5470] ${activeLink === "hiring" ? "text-[#DBD8E3]" : ""}`}>
                <Link href="#" className="block text-sm font-medium" onClick={() => handleLinkClick("hiring")}>
                  Hiring
                </Link>
              </li>
              <li className={`py-2 border-b border-[#5C5470] ${activeLink === "community" ? "text-[#DBD8E3]" : ""}`}>
                <Link href="#" className="block text-sm font-medium" onClick={() => handleLinkClick("community")}>
                  Community
                </Link>
              </li>
              <li className={`py-2 flex items-center justify-between ${activeLink === "faq" ? "text-[#DBD8E3]" : ""}`}>
                <Link href="#" className="block text-sm font-medium" onClick={() => handleLinkClick("faq")}>
                  FAQ
                </Link>
                <div className="w-7 h-7 rounded-full bg-[#5C5470] flex items-center justify-center">
                  <span className="text-xs font-medium">JD</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
