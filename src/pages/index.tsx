import { graphql, Link } from 'gatsby'
import * as React from 'react'

import Layout from '@components/Layout'
import Section from '@components/Section'
import SEO from '@components/SEO'

import rehypeReact from 'rehype-react'

import '@styles/main.scss'

const HeroUnit: React.FC = ({ children }) => {
  return (
    <Section id="intro" className="hero-sub inverse" arrow>
        <div className="background"/>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="hero-unit">
                        {children}
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

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'hero-unit': HeroUnit,
    'proficiencies': Proficiencies,
    'project-snippet': Projects,
  },
}).Compiler

const IndexPage: React.FC<IndexPageProps> = ({data}) => {
  const indexNode = data.allMarkdownRemark.edges[0].node
  return (
    <Layout
      nav={{}}
      footer={{}}
    >
      <>
        <SEO
          title={indexNode.frontmatter.title}
          pathname="/"
        />
        <div className="page-wrapper">
          {renderAst(indexNode.htmlAst)}
        </div>
      </>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  allMarkdownRemark(filter: {fields: {slug: {eq: "/index/"}}}) {
    edges {
      node {
        htmlAst
        frontmatter {
          title
          date
        }
      }
    }
  }
}
`

export default IndexPage
