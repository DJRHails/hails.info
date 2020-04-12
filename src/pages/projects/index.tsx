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

const ProjectsPage: React.FC<ProjectsPageProps> = ({data}) => {
  const projects = data.projects.edges
  const { frontmatter, htmlAst } = data.section.edges[0].node
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
          <Section id="projects">
            {renderAst(htmlAst)}
            {projects && projects.map(({ node }, i) => {
              const { frontmatter } = node
              return <ProjectCard key={i} data={frontmatter}/>
            })}
          </Section>
        </div>
      </>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  section: allMarkdownRemark(
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
        htmlAst
      }
    }
  }
  projects: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/assets.projects.[^_]/"
      }
    },
    sort: {
      fields: [frontmatter___date],
      order: DESC
    }
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
              fluid(maxWidth: 700, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
}`

export default ProjectsPage
