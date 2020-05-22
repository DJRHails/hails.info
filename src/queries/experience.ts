import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

export interface Period {
  from: string;
  to: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  external: string;
  period: Period[];
  tags: string[];
  tech: string[];
  highlight: boolean;
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export const experienceFragment = graphql`
  fragment ExperienceFrontmatter on MarkdownRemark {
    frontmatter {
      role
      company
      location
      external
      period {
        from(formatString: "MMM YY")
        to(formatString: "MMM YY")
      }
      tags
      tech
      highlight
      cover {
        childImageSharp {
          fluid(
            maxWidth: 700
            quality: 90
            traceSVG: { color: "rgb(255, 255, 255)" }
          ) {
            tracedSVG
          }
        }
      }
    }
  }
`;
