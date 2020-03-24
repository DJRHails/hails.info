import { graphql } from 'gatsby'
import * as React from 'react'

import Layout from '@components/Layout'
import Section from '@components/Section'
import SEO from '@components/SEO'

import '@styles/main.scss'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
      },
    },
  }
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const HeroUnit: React.FC = () => {
  return (
    <Section id="intro" className="hero-sub inverse" arrow>
        <div className="background" id="">&nbsp;</div>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="hero-unit">
                        <h1><strong>HAILS</strong>.info</h1>
                        <span>My name is Daniel Hails and
                        I'm a Computing (Artificial Intelligence)
                        student at Imperial College London.</span>
                    </div>
                </div>
            </div>
        </div>
        <a className="mouse btn-next hidden-xs" href="#proficiencies"/>
    </Section>
  )
}

const Proficiencies: React.FC = () => {
  return (
    <Section id="proficiencies" className="dark" skew orientation={['bottom', 'left']}>
        <div className="container">
            <h2 className="adapt-text"/>
        </div>
    </Section>
  )
}

const Projects: React.FC = () => {
  return (
    <Section id="projects" className="contrast" skew orientation={['bottom', 'right']}>
        <div className="container">
          <h2>Projects</h2>
        </div>
    </Section>
  )
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  return (
    <Layout
      nav={{}}
      footer={{}}
    >
      <>
        <SEO
          title={data.site.siteMetadata.title}
          pathname="/"
        />
        <div className="page-wrapper">
          <HeroUnit />
          <Proficiencies />
          <Projects />
        </div>
      </>
    </Layout>
  )
}

export default IndexPage
