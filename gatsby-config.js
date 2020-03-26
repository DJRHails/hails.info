
const currentJob = require("./src/assets/data/currentJob.json")

exports.siteMetadata = {
  siteName: `Hails`,
  title: `Daniel Hails | hails.info`,
  description: `Daniel Hails | ${currentJob.role} working @ ${currentJob.company}.`,
  author: `Daniel Hails`,
  keywords: [`technology`],
  siteUrl: `https://hails.info`,
  twitter: `@_djrh`,
}

exports.plugins = [
  `gatsby-plugin-typescript`,
  `gatsby-plugin-tslint`,
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      precision: 6,
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "assets",
      path: `${__dirname}/src/assets/`
    }
  },
  {
    resolve: "gatsby-plugin-web-font-loader",
    options: {
      google: {
        families: ["Lato:300,500,700"]
      },
      custom: {
        families: ["Jaapokki Enchance"],
        urls: ["fonts/fonts.css"],
      },
    },
  }
]
