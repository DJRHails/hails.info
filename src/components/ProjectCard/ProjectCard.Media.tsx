import React from "react";

import * as Icons from "@components/Icons";
import Flags from "@components/ProjectCard/ProjectCard.Flags";
import classNames from "classnames";
import Img from "gatsby-image";
import _ from "lodash";

const Media: React.FC<{ data: ProjectMetadata; alternate?: true }> = ({
  data,
  alternate,
}) => {
  const {
    date,
    title,
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
  return (
    <div className="project-card__media">
      <div className={assetClassName}>
        {recognitionFrontmatter && (
          <Flags recognition={recognitionFrontmatter} alternate={alternate} />
        )}
        <a
          href={
            external ? external : github ? `https://github.com/${github}` : "#"
          }
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <Img fluid={cover.childImageSharp.fluid} alt={title} />
        </a>
      </div>
    </div>
  );
};

export default Media;
