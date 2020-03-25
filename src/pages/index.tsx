import { graphql, Link } from 'gatsby'
import * as React from 'react'

import Layout from '@components/Layout'
import Section from '@components/Section'
import SEO from '@components/SEO'

import '@styles/main.scss'

const HeroUnit: React.FC = () => {
  return (
    <Section id="intro" className="hero-sub inverse" arrow>
        <div className="background"/>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="hero-unit">
                        <h1><strong>HAILS</strong>.info</h1>
                        // TODO: Daniel Hails, ICL.
                        <span>My name is Daniel Hails and
                        I'm a Computing (Artificial Intelligence)
                        student at Imperial College London.</span>
                    </div>
                </div>
            </div>
        </div>
        <a href="#proficiencies">
          <span className="mouse btn-next hidden-xs"/>
        </a>
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

const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <Layout
      nav={{}}
      footer={{}}
    >
      <>
        <SEO
          title="Daniel Hails | hails.info"
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
