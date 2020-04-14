import React from "react";

interface ExperienceMetadata {
  role: string;
  company: string;
  location: string;
  external: string;
  period: { from: string, to: string }[];
  tags: string[];
  tech: string[];
  highlight: boolean;
  cover: any;
}

interface ExperienceElementProps {
  data: {
    frontmatter: ExperienceMetadata;
    excerpt: string;
  }
}

const ExperienceElement: React.FC<ExperienceElementProps> = ({ data }) => {

  const { company, role, period, location, external, cover } = data.frontmatter;
  return (
    <li className="experience__elem">
      <div className="container">
        <div className="row">
          <div className="experience__info row">
            {cover && <a
              href={external ? external : "#"}
              className="experience__img"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img src={cover.childImageSharp.fluid.tracedSVG} alt={company} />
            </a>}
            <div className="col-8">
              <h5>{company}</h5>
              <h6>{role}{location && <span>{` · ${location}`}</span>}</h6>
              <p className="d-none d-md-block">{data.excerpt}</p>
            </div>
          </div>
          <p className="experience__periods">
            {period.map((p) => `${p.from} - ${p.to}`)}
          </p>
        </div>
        <div className="row d-md-none">
          <p>{data.excerpt}</p>
        </div>
      </div>
    </li>
  );
};

export default ExperienceElement;
