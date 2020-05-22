/**
 * This react helmet code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 *
 *
 * Use the Helmet on pages to generate SEO and meta content!
 *
 * Usage:
 * <SEO
 *   title={title}
 *   description={description}
 *   image={image}
 * />
 *
 */

import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

interface MetaImage {
  src: string;
  height: number;
  width: number;
}

interface SiteMetadata {
  siteName: string;
  siteUrl: string;
  title: string;
  description: string;
  author: string;
  keywords: [string];
  twitter: string;
}

interface PageMetadata {
  pathname: string;
  contentType: string;
  title?: string;
  canonical?: string;
  description?: string;
  metaImage?: MetaImage;
  published?: string;
  updated?: string;
  category?: string;
  tags?: string;
  twitter?: string;
  readingTime?: string;
}

type MetaTags = SiteMetadata &
  PageMetadata & {
    imageUrl: string;
    url: string;
  };

// Twitter requires https to prepend any paths.
const addHttps = (path: string) => {
  if (path.substring(0, 5) === "https") return path;
  return `https:${path}`;
};

const getMetaTags = ({
  title,
  description,
  siteName,
  url,
  imageUrl,
  metaImage,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  readingTime,
  keywords,
}: MetaTags) => {
  const metaTags = [
    { charset: "utf-8" },
    { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#ffffff" },
    { itemprop: "name", content: title },
    { itemprop: "description", content: description },
    { name: "description", content: description },
    { name: "keywords", content: keywords.join(",") },

    { name: "twitter:site", content: siteName },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: twitter },

    { name: "msapplication-TileColor", content: "#e4ebee" },
    { name: "msapplication-config", content: "/favicon/browserconfig.xml" },

    { property: "og:title", content: title },
    { property: "og:type", content: contentType },
    { property: "og:url", content: url },
    { property: "og:description", content: description },
    { property: "og:site_name", content: siteName },
  ];

  if (imageUrl && metaImage) {
    metaTags.push({ itemprop: "image", content: addHttps(imageUrl) });
    metaTags.push({ property: "og:image", content: imageUrl });
    metaTags.push({ name: "twitter:image", content: addHttps(imageUrl) });
    metaTags.push({ name: "twitter:card", content: "summary_large_image" });
    metaTags.push({
      property: "og:image:width",
      content: metaImage.width.toString(),
    });
    metaTags.push({
      property: "og:image:height",
      content: metaImage.height.toString(),
    });
  } else {
    metaTags.push({ name: "twitter:card", content: "summary" });
  }

  if (published) {
    metaTags.push({ name: "article:published_time", content: published });
  }
  if (updated) {
    metaTags.push({ name: "article:modified_time", content: updated });
  }
  if (category) {
    metaTags.push({ name: "article:section", content: category });
  }
  if (tags) {
    metaTags.push({ name: "article:tag", content: tags });
  }

  if (readingTime) {
    // TODO: May be value:
    metaTags.push({ name: "twitter:label1", content: "Reading time" });
    metaTags.push({ name: "twitter:data1", content: readingTime });
  }

  return metaTags;
};

const getFaviconLinks = () => {
  return [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
    {
      rel: "mask-icon",
      href: "/favicon/safari-pinned-tab.svg",
      color: "#c0392b",
    },
    { rel: "shortcut icon", href: "/favicon/favicon.ico" },
  ];
};

const SEO: React.FC<PageMetadata> = ({ children, ...pageMetadata }) => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            siteName
            siteUrl
            title
            description
            author
            keywords
            twitter
          }
        }
      }
    `
  );
  const { title, canonical, pathname, metaImage } = pageMetadata;
  const seoURL = (path: string) =>
    `${site.siteMetadata.siteUrl}/${path.replace(/^\/+/g, "")}`;

  const canonicalLink = {
    rel: "canonical",
    href: canonical || seoURL(pathname),
  };
  const faviconLinks = getFaviconLinks();
  const metaTags = getMetaTags({
    ...site.siteMetadata,
    ...pageMetadata,
    imageUrl: metaImage && seoURL(metaImage.src),
    url: seoURL(pathname),
  });

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title || site.siteMetadata.title}
      link={[canonicalLink, ...faviconLinks]}
      meta={metaTags}
    >
      {children}
    </Helmet>
  );
};

export default SEO;
