import React from 'react'

import Container from '@components/Layout/Layout.Container'

interface LayoutProps {
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string,
  }
  footer: {
    visible?: boolean
    theme?: string,
  }
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<LayoutProps> = ({ children, ...rest }) => {

  return (
    <>
      <Container {...rest}>{children}</Container>
    </>
  )
}

export default Layout
