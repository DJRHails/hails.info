---
date: 2020-02-09
title: SpeakEasy
slug: projects/speakeasy
github: Windjabber/speak-easy
external: ""
tech:
  - ReactJS
  - JS
  - CSS
  - NLP Toolkit
  - Speech-to-Text
  - IBM Watson
description: >
  Slide generation as you speak, we used Google Cloud speech-to-text, IBM & custom semantic analysis for inferring slide structure, sizes, colour and translating keywords into gifs.

  All made in 24 hours.
cover: ./we-are-speakeasy.png
highlight: false
---

_Slide generation as you speak._ That was the concept we came up with in the 4<sup>th</sup> hour. It's visual, plausibly do-able, and uses some interesting technology.

Even now, the concept feels solid; all you have to do is speak and slideshow riffs off with you. It is really easy to make terrible slideshows - those are the ones you sit through, looking at the clock while some reads off the slides.

## Inspiration

The motivation behind this project was reducing people's dependence on slides when presenting, while providing an engaging visual aid. We get into bad habits with a pre-prepared slide deck: We're less dynamic, more wooden and are _oh so tempted_ to glimpse at the slides. We also have a tendency to put too much information on a slide.

All of these bad habits are prevented with SpeakEasy. You can't rely on it as a memory crutch because it's different every time. It encourages you to speak freely while still emphasizing your points (visually and with **bold** headers).

## How we built it

We created a pipeline that passes raw audio to the Google Cloud Speech-to-text API, producing plaintext. We then take that text data and apply various natural language processing techniques (including IBM Watson) to generate semantic analysis, from which we can extract key information to format our slides.

Knowing for instance that subject of a sentence can provide a header and the bullet points beneath are the verb-noun pairs corresponding to that subject. We also do a level of emotive analysis for creating color choices for text.

From this we create an internal AST which contains the object types which are then converted into enhanced markdown that can take React Components known as MDX data.

We then hot-reload these files into Gatsby (a React based framework).

If you want to know more, we [vlogged](https://www.youtube.com/playlist?list=PLJ8AtA_9yvjj46mhBRofRCgl81HzPLoSY) the whole hackathon.

## Challenges we ran into

- Gatsby is not well documented when interacting with MDX
- First time using Google Speech-to-text API
- Delirium due to general lack of sleep!
- The prevalence of distractions and free food.
- And the joy of working with such funny teammates

## Accomplishments that we're proud of

- Designed and executing an innovative idea in a short period of time.
- Creating a joyful and engaging user experience
- GIFs
- Automatic semantic analysis and formatting
- Emoji hot-loading

## What we learned

- Gatsby is super fast and, when not using `mdx-themes`, is an easy to use tool.
- How to use Speech-to-text API in an endless stream.
- No sleep is a poor choice for hackathons.

## What should we do next

- Negative Latency with predictive descriptions
- Improved speech recognition
- Embedded image lookup
- Improved slide transitions

[Early Demo Link](https://www.youtube.com/watch?v=UDkzLdDV0h8&feature=youtu.be)
