const path = require(`path`)

exports.siteMetadata = {
  siteName: `Hails`,
  title: `Daniel Hails | hails.info`,
  description: `Daniel Hails ...`, // TODO: Update site description
  author: `Daniel Hails`,
  keywords: [`technology`],
  siteUrl: `https://hails.info`,
  twitter: `@_djrh`,
}

exports.plugins = [
  `gatsby-plugin-typescript`,
  `gatsby-plugin-tslint`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      precision: 6,
    },
  },
  {
    resolve: "gatsby-plugin-web-font-loader",
    options: {
      google: {
        families: ["Lato:400,500,600,700,800"]
      },
      custom: {
        families: ["Jaapokki Enchance"],
        urls: ["fonts/fonts.css"],
      },
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "assets",
      path: path.join(__dirname, `src`, `assets`),
    }
  },
  `gatsby-transformer-sharp`,
  {
    resolve: "gatsby-transformer-remark",
    options: {
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
      ]
    }
  }
]
