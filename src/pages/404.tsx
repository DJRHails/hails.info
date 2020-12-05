import { graphql, Link } from "gatsby";
import React from "react";
import StringSimilarity from "string-similarity";

import DiagonalButton from "@components/DiagonalButton";
import Layout from "@components/Layout";
import Section from "@components/Section";
import SEO from "@components/SEO";

import "@styles/main.scss";

const SIMILARITY_THRESHOLD = 0.7;

interface PageQueryData {
  allSitePage: {
    nodes: Array<{
      path: string;
    }>;
  };
}

interface FourZeroFourPageProps {
  location: any;
  data: PageQueryData;
}

const FourZeroFourPage: React.FC<FourZeroFourPageProps> = ({
  location,
  data,
}) => {
  const pages = data.allSitePage.nodes.map(({ path }) => path);
  const pathname = location.pathname;
  const result = StringSimilarity.findBestMatch(pathname, pages).bestMatch;

  const subtitle =
    result.rating > SIMILARITY_THRESHOLD ? (
      <>
        You were probably looking for{" "}
        <Link to={result.target}>{result.target}</Link>
      </>
    ) : (
      <>You're very lost. Don't worry it's easy to get back.</>
    );

  return (
    <Layout>
      <>
        <SEO title="404 | hails.info" pathname="/404" contentType="website" />
        <div className="page-wrapper">
          <Section id="404" title="404 Page Not Found">
            <h3 className="subtitle">{subtitle}</h3>
            <DiagonalButton to="/">Go Back</DiagonalButton>
          </Section>
        </div>
      </>
    </Layout>
  );
};

export default FourZeroFourPage;

export const pageQuery = graphql`
  {
    allSitePage(
      filter: { path: { nin: ["/dev-404-page/", "/404/", "/404.html"] } }
    ) {
      nodes {
        path
      }
    }
  }
`;
