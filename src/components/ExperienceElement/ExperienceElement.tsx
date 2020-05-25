import { Experience, Period } from "@queries/experience";
import React from "react";

interface ExperienceElementProps {
  data: {
    frontmatter: Experience;
    excerpt: string;
  };
}

function escapeDataURI(src: string) {
  const svgTag = src.replace(/data:image\/svg\+xml,/, "");
  const svgTagWithColor = svgTag.replace(/fill=.white./, 'fill="currentColor"');
  return {
    __html: decodeURI(svgTagWithColor),
  };
}

const ExperienceElement: React.FC<ExperienceElementProps> = ({ data }) => {
  const { company, role, period, location, external, cover } = data.frontmatter;
  return (
    <li className="experience__elem">
      <div className="container">
        <div className="row">
          <div className="experience__info row">
            {cover && (
              <a
                href={external ? external : "#"}
                className="experience__img"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {cover.childImageSharp.fluid.tracedSVG && (
                  <div
                    dangerouslySetInnerHTML={escapeDataURI(
                      cover.childImageSharp.fluid.tracedSVG
                    )}
                  />
                )}
              </a>
            )}
            <div className="col-xs-12 col-md-8">
              <h5>{company}</h5>
              <h6>
                {role}
                {location && <span>{` · ${location}`}</span>}
              </h6>
              <p className="d-none d-md-block">{data.excerpt}</p>
            </div>
          </div>
          {period.map((p: Period, i) => (
            <p key={i} className="experience__periods">
              <span>{p.from}</span> - <span>{p.to}</span>
            </p>
          ))}
        </div>
        <div className="row d-md-none">
          <p>{data.excerpt}</p>
        </div>
      </div>
    </li>
  );
};

export default ExperienceElement;
