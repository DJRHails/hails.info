import { Link } from "gatsby";
import _ from "lodash";
import React from "react";

import * as Icons from "@components/Icons";
import Media from "@components/ProjectCard/ProjectCard.Media";
import { ProjectFrontmatter } from "@queries/projects";

const ProjectCard: React.FC<{ data: ProjectFrontmatter; alternate?: true }> = ({
  data,
  alternate,
}) => {
  const {
    date,
    title,
    slug,
    github,
    external,
    tech,
    description,
    company,
    cover,
  } = data;

  const linkedTitle = slug ? <Link to={`/${slug}`}>{title}</Link> : title;

  const githubLink = (
    <a
      href={`https://github.com/${github}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="GitHub Link"
    >
      <Icons.Github />
    </a>
  );
  const externalLink = (
    <a
      href={external}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="External Link"
    >
      <Icons.External />
    </a>
  );
  return (
    <div id={_.kebabCase(slug)} className="project-card">
      <div className="project-card__wrapper">
        <div className="project-card__body">
          <h6 className="project-card__subtitle">
            {date}{" "}
            {company && (
              <>
                <span>·</span> {company}
              </>
            )}
          </h6>
          <h2 className="project-card__title">{linkedTitle}</h2>
          <p className="project-card__text">{description}</p>
          {tech &&
            tech.map((t, i) => (
              <span key={i} className="badge">
                {t}
              </span>
            ))}
          <div className="project-card__link-wrapper">
            {github && githubLink}
            {external && externalLink}
          </div>
        </div>
        {cover && <Media data={data} alternate={alternate} />}
      </div>
    </div>
  );
};

export default ProjectCard;
