
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const SMALL_MOBILE_BREAKPOINT = 480
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mobileMQL = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const smallMobileMQL = window.matchMedia(`(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`)
    const tabletMQL = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
      setIsTablet(window.innerWidth < TABLET_BREAKPOINT && window.innerWidth >= MOBILE_BREAKPOINT)
    }
    
    // Add event listeners
    mobileMQL.addEventListener("change", onChange)
    smallMobileMQL.addEventListener("change", onChange)
    tabletMQL.addEventListener("change", onChange)
    
    // Set initial values
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    setIsTablet(window.innerWidth < TABLET_BREAKPOINT && window.innerWidth >= MOBILE_BREAKPOINT)
    
    // Clean up event listeners
    return () => {
      mobileMQL.removeEventListener("change", onChange)
      smallMobileMQL.removeEventListener("change", onChange)
      tabletMQL.removeEventListener("change", onChange)
    }
  }, [])

  // For backwards compatibility, return isMobile as the main value
  return isMobile
}

// Export additional screen size hooks
export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    }
    
    mql.addEventListener("change", onChange)
    setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])
  
  return isSmallMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const onChange = () => {
      const width = window.innerWidth
      setIsTablet(width < TABLET_BREAKPOINT && width >= MOBILE_BREAKPOINT)
    }
    
    window.addEventListener("resize", onChange)
    onChange() // Set initial value
    
    return () => window.removeEventListener("resize", onChange)
  }, [])
  
  return isTablet
}
