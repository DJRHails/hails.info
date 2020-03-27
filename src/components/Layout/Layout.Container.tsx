import React from 'react'

interface LayoutProps {
  background?: string
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string,
  }
  footer?: {
    visible?: boolean
    theme?: string,
  }
}

const LayoutContainer: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      {children}
    </>
  )
}

export default LayoutContainer
