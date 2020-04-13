import { IconExternal, IconGitHub } from "@components/Icons";
import Media from "@components/ProjectCard/ProjectCard.Media";
import classNames from "classnames";
import Img from "gatsby-image";
import _ from "lodash";
import React from "react";

interface ProjectMetadata {
  date: string;
  title: string;
  github: string;
  external: string;
  tech: string[];
  description: string;
  company: string;
  cover: any;
}

const ProjectCard: React.FC<{ data: ProjectMetadata }> = ({ data }) => {
  const {
    date,
    title,
    github,
    external,
    tech,
    description,
    company,
    cover,
  } = data;

  const linkedTitle = external ? (
    <a
      href={external}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="External Link"
    >
      {title}
    </a>
  ) : (
    title
  );
  const githubLink = (
    <a
      href={`https://github.com/${github}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="GitHub Link"
    >
      <IconGitHub />
    </a>
  );
  const externalLink = (
    <a
      href={external}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="External Link"
    >
      <IconExternal />
    </a>
  );
  return (
    <div id={_.kebabCase(title)} className="project-card">
      <div className="project-card__wrapper">
        <div className="project-card__body">
          <h6 className="project-card__subtitle mb-2 text-muted">
            {date}{" "}
            {company && (
              <>
                <span>·</span> {company}
              </>
            )}
          </h6>
          <h2 className="project-card__title">{linkedTitle}</h2>
          <p className="project-card__text">{description}</p>
          <div className="project-card__link-wrapper text-muted">
            {github && githubLink}
            {external && externalLink}
          </div>
        </div>
        {cover && <Media data={data} />}
      </div>
    </div>
  );
};

export default ProjectCard;
