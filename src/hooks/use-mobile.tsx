
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const SMALL_MOBILE_BREAKPOINT = 480
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Initial check function
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
      setIsTablet(window.innerWidth < TABLET_BREAKPOINT && window.innerWidth >= MOBILE_BREAKPOINT)
    }
    
    // Run initial check
    checkDeviceSize()
    
    // Add resize event listener for dynamic checks
    window.addEventListener("resize", checkDeviceSize)
    
    // Cleanup
    return () => window.removeEventListener("resize", checkDeviceSize)
  }, [])

  // For backwards compatibility, return isMobile as the main value
  return isMobile
}

// Export additional screen size hooks
export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const checkSize = () => {
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    }
    
    checkSize()
    window.addEventListener("resize", checkSize)
    
    return () => window.removeEventListener("resize", checkSize)
  }, [])
  
  return isSmallMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth
      setIsTablet(width < TABLET_BREAKPOINT && width >= MOBILE_BREAKPOINT)
    }
    
    checkSize()
    window.addEventListener("resize", checkSize)
    
    return () => window.removeEventListener("resize", checkSize)
  }, [])
  
  return isTablet
}
