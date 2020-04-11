import React from 'react'
import Img from 'gatsby-image'
import _ from 'lodash'
import { IconExternal, IconGitHub } from '@components/Icon'
import classNames from 'classnames'

interface ProjectMetadata {
  date: string
  title: string
  github: string
  external: string
  tech: string[]
  description: string
  company: string
  cover: any
}

const ProjectCard: React.FC<{data: ProjectMetadata}> = ({ data }) => {
  const { date, title, github, external, tech, description, company, cover } = data
  return (
    <div id={_.kebabCase(title)} className="project-card">
      <div className="project-card__wrapper">
        { cover && (
          <div className="project-card__media">
            <div className={classNames("asset", {
              "vertical": cover.childImageSharp.fluid.aspectRatio < 1
            })}>
              <a
                href={external ? external : github ? github : '#'}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Img
                  fluid={cover.childImageSharp.fluid}
                  alt={title}
                />
              </a>
            </div>
          </div>
        )}
        <div className="project-card__body">
          <h6 className="project-card__subtitle mb-2 text-muted">
            {date} {company && <><span>·</span> {company}</>}
          </h6>
          <h2 className="project-card__title">
            {external ? (
              <a
                href={external}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="External Link">
                {title}
              </a>
            ) : (
              title
            )}
          </h2>
          <p className="project-card__text">{description}</p>
          <div className="project-card__link-wrapper text-muted">
            { github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="GitHub Link">
                <IconGitHub />
              </a>
            )}
            { external && (
              <a
                href={external}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="External Link">
                <IconExternal />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
