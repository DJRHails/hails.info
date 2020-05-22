import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import { Frontmatter } from ".";
import { Award } from "./awards";

export interface Project {
  title: string;
  date: string;
  github: string;
  external: string;
  description: string;
  company: string;
  tech: [string];
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  recognition: [Frontmatter<Award>];
}

export const projectFragment = graphql`
  fragment ProjectFrontmatter on MarkdownRemark {
    frontmatter {
      title
      date(formatString: "MMMM YYYY")
      github
      external
      description
      company
      tech
      cover {
        childImageSharp {
          fluid(maxWidth: 700, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      recognition {
        ...AwardFrontmatter
      }
    }
  }
`;
