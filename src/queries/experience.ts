import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

export interface Period {
  from: string;
  to: string;
  machineFrom: string;
  machineTo: string;
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
        from(formatString: "MMMM YYYY")
        to(formatString: "MMMM YYYY")
        machineTo: to(formatString: "YYYY-MM-DD")
        machineFrom: from(formatString: "YYYY-MM-DD")
      }
      tags
      tech
      highlight
      cover {
        childImageSharp {
          fluid(
            maxWidth: 700
            quality: 90
            traceSVG: { color: "currentColor" }
          ) {
            tracedSVG
          }
        }
      }
    }
  }
`;
