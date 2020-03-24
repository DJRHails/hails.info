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

import React from 'react'
import Helmet from 'react-helmet'

interface HelmetProps {
  title: string
  description?: string
  pathname: string
  image?: string
  url?: string
  canonical?: string
  contentType?: string
  published?: string
  updated?: string
  category?: string
  tags?: string
  twitter?: string
  readingTime?: string
}

const seoURL = (path: string) => `https://hails.info${path}`

// Twitter requires https to prepend any paths.
const addHttps = (path: string) => {
  if (path.substring(0, 5) === 'https') return path
  return `https:${path}`
}

// TODO: Add seo description
const seoDescription = ''

const getMetaTags = ({
  title,
  description,
  url,
  image,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  readingTime,
}: HelmetProps) => {
  const metaTags = [
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#ffffff' },
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { name: 'description', content: description },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: 'Hails' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter || 'Daniel Hails' },

    { name: 'msapplication-TileColor', content: '#e4ebee' },
    { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },

    { property: 'og:title', content: title },
    { property: 'og:type', content: contentType },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:description', content: description },
    { property: 'og:site_name', content: 'Hails' },
  ]

  if (image) {
      metaTags.push({ itemprop: 'image', content: addHttps(image) })
      metaTags.push({ name: 'twitter:image', content: addHttps(image) })
  }

  if (published) {
    metaTags.push({ name: 'article:published_time', content: published })
  }
  if (updated) {
    metaTags.push({ name: 'article:modified_time', content: updated })
  }
  if (category) {
    metaTags.push({ name: 'article:section', content: category })
  }
  if (tags) {
    metaTags.push({ name: 'article:tag', content: tags })
  }

  if (readingTime) {
    // TODO: May be value:
    metaTags.push({ name: 'twitter:label1', content: 'Reading time' })
    metaTags.push({ name: 'twitter:data1', content: readingTime })
  }

  return metaTags
}

const getFaviconLinks = () => {
  return [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    { rel: 'manifest', href: '/favicon/site.webmanifest' },
    { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#c0392b' },
    { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
  ]
}

const SEO: React.FC<HelmetProps> = ({
  children,
  title,
  description = seoDescription,
  pathname,
  canonical,
  image,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  readingTime,
}) => {
  const canonicalLink = {
    rel: 'canonical',
    href: canonical
      ? canonical
      : `https://hails.info/${pathname.replace(/^\/+/g, '')}`,
  }
  const faviconLinks = getFaviconLinks()
  const metaTags = getMetaTags({
    title,
    description,
    contentType,
    pathname,
    url: seoURL(pathname),
    image,
    published,
    updated,
    category,
    tags,
    twitter,
    readingTime,
  })

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      link={[canonicalLink, ...faviconLinks]}
      meta={metaTags}
    >
      {children}
    </Helmet>
  )
}

export default SEO
