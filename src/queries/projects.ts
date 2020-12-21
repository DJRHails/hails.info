import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import { Frontmatter } from ".";
import { Award } from "./awards";

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  date: string;
  machineDate: string;
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
    fields {
      collection
    }
    frontmatter {
      title
      slug
      date(formatString: "MMMM YYYY")
      machineDate: date(formatString: "YYYY-MM-DD")
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
