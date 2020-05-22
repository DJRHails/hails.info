import { graphql } from "gatsby";

export interface Ribbon {
  icon: string;
  theme: string;
}

export interface AwardFrontmatter {
  title: string;
  type: string;
  ribbon: Ribbon;
  date: string;
  external: string;
}

export const awardsFragment = graphql`
  fragment AwardFrontmatter on MarkdownRemark {
    frontmatter {
      title
      type
      ribbon {
        icon
        theme
      }
      date(formatString: "MMMM YYYY")
      external
    }
  }
`;