import { graphql } from "gatsby";

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
