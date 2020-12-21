import { graphql } from "gatsby";

export interface Ribbon {
  icon: string;
  theme: string;
}

export interface Award {
  title: string;
  type: string;
  ribbon: Ribbon;
  date: string;
  machineDate: string;
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
      machineDate: date(formatString: "YYYY-MM-DD")
      external
    }
  }
`;
