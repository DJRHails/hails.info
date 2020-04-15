import { IconExternal, IconGitHub } from "@components/Icon";
import classNames from "classnames";
import Img from "gatsby-image";
import _ from "lodash";
import React from "react";

const ProjectCardMedia: React.FC<{ data: ProjectMetadata }> = ({ data }) => {
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
  const assetClassName = classNames({
    asset: true,
    vertical: cover.childImageSharp.fluid.aspectRatio < 1,
  });
  return (
    <div className="project-card__media">
      <div className={assetClassName}>
        <a
          href={external ? external : github ? `https://github.com/${github}` : "#"}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <Img fluid={cover.childImageSharp.fluid} alt={title} />
        </a>
      </div>
    </div>
  );
};

export default ProjectCardMedia;
