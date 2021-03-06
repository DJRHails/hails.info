const path = require(`path`);
require("ts-node").register({ files: true });

exports.siteMetadata = {
  siteName: `Hails`,
  title: `Daniel Hails | hails.info`,
  description: `Daniel Hails ...`, // TODO(DJRHails): Update site description
  author: `Daniel Hails`,
  keywords: [`technology`],
  siteUrl: `https://hails.info`,
  twitter: `@_djrh`,
};

const sourceCollection = (name) => {
  return {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: name,
      path: path.join(__dirname, `content`, name),
    },
  };
};

exports.plugins = [
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Daniel Hails | hails.info`,
      short_name: `Daniel Hails`,
      start_url: `/`,
      background_color: `#c0392b`,
      theme_color: `#c0392b`,
      // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
      // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
      display: `standalone`,
      icon: `static/favicon/android-chrome-192x192.png`,
    },
  },
  `gatsby-plugin-offline`,
  `gatsby-plugin-robots-txt`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-tslint`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      implementation: require("sass"),
    },
  },
  {
    resolve: "gatsby-plugin-web-font-loader",
    options: {
      google: {
        families: ["Lato:100,200,300,400,500,600,700,800"],
      },
      custom: {
        families: ["Jaapokki Enchance"],
        urls: ["/fonts/fonts.css"],
      },
    },
  },
  sourceCollection("awards"),
  sourceCollection("education"),
  sourceCollection("experience"),
  sourceCollection("hero"),
  sourceCollection("projects"),
  `gatsby-transformer-sharp`,
  {
    resolve: "gatsby-transformer-remark",
    options: {
      excerpt_separator: `<!-- end -->`,
      plugins: [
        "gatsby-remark-component",
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 590,
          },
        },
      ],
    },
  },
];
