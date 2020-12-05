import React from "react"


export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        {/* Warm up external origins*/}
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous"/>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" crossOrigin="anonymous"/>

        {/* Webfont optimisation*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous"/>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" crossOrigin="anonymous"/>

        <link rel="preload"
              as="style"
              href="/fonts/fonts.css&display=swap" />

        <noscript>
          <link rel="stylesheet" href="/fonts/fonts.css&display=swap" />
        </noscript>

      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
    )
}
