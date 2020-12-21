import classNames from "classnames";
import { Link } from "gatsby";
import Img from "gatsby-image";
import _ from "lodash";
import React from "react";

import Flags from "@components/ProjectCard/ProjectCard.Flags";
import { ProjectFrontmatter } from "@queries/projects";

const Media: React.FC<{ data: ProjectFrontmatter; alternate?: true }> = ({
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
    recognition,
  } = data;
  const assetClassName = classNames({
    asset: true,
    vertical: cover.childImageSharp.fluid.aspectRatio < 1,
  });

  const recognitionFrontmatter =
    recognition && recognition.map((r) => r.frontmatter);

  const img = <Img fluid={cover.childImageSharp.fluid} alt={title} />;

  return (
    <div className="project-card__media">
      <div className={assetClassName}>
        {recognitionFrontmatter && (
          <Flags recognition={recognitionFrontmatter} alternate={alternate} />
        )}
        {slug ? <Link to={`/${slug}`}>{img}</Link> : img}
      </div>
    </div>
  );
};

export default Media;
