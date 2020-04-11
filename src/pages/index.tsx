import { graphql, Link } from 'gatsby'
import * as React from 'react'

import Layout from '@components/Layout'
import Section from '@components/Section'
import ProjectCard from '@components/ProjectCard'
import SEO from '@components/SEO'

import rehypeReact from 'rehype-react'

import '@styles/main.scss'

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler

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

const Proficiencies: React.FC = ({ skills }) => {
  return (
    <Section id="proficiencies" className="dark" skew orientation={['bottom', 'left']}>
        <div className="container">
            <h2 className="adapt-text"/>
        </div>
    </Section>
  )
}


const Projects: React.FC = ({ title, subtitle, projects }) => {
  return (
    <Section id="projects" title={title} subtitle={subtitle}>
      {projects && projects.map(({ node }, i) => {
        const { frontmatter } = node
        return <ProjectCard key={i} data={frontmatter}/>
      })}
    </Section>
  )
}

const IndexPage: React.FC<IndexPageProps> = ({data}) => {
  const heroNode = data.hero.edges[0].node
  const projectEdges = data.featuredProjects.edges
  const { title, description } = data.projectSection.edges[0].node.frontmatter
  return (
    <Layout
      nav={{}}
      footer={{}}
    >
      <>
        <SEO
          pathname="/"
        />
        <div className="page-wrapper">
          <HeroUnit>
            {renderAst(heroNode.htmlAst)}
          </HeroUnit>
          <Proficiencies skills={heroNode.frontmatter.skills} />
          <Projects title={title} subtitle={description} projects={projectEdges} />
        </div>
      </>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  hero: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/hero/"
      }
    }
  ) {
    edges {
      node {
        frontmatter {
          skills
        }
        htmlAst
      }
    }
  }
  projectSection: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/projects._featured/"
      }
    }) {
    edges {
      node {
        frontmatter {
          title
          description
        }
      }
    }
  }
  featuredProjects: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/assets.projects.[^_]/"
      },
      frontmatter: {
        highlight: {ne: false}
      }
    },
    sort: {
      fields: [frontmatter___date],
      order: DESC
    },
    limit: 5
  ) {
    edges {
      node {
        frontmatter {
          title
          date(formatString: "MMMM YYYY")
          github
          external
          description
          company
          cover {
            childImageSharp {
              fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
}`

export default IndexPage
