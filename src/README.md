# Project structure 🏗

This source structure is designed to maintain modularity and keep clear.

<br>

| File or folder | Description                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| `assets/`      | Any generated markdown pages, broken into sections `awards`, `education`, `experience`, `hero`, `projects`. |
| `components/`  | Components used within the site, each should be contained within a folder with any sub-components marked.   |
| `pages/`       | Any pages defined directly as opposed to generated from markdown files.                                     |
| `sections/`    | Any sections within pages.                                                                                  |
| `queries/`     | Any graphql queries exported for usage as fragments.                                                        |
| `styles/`      | SCSS collections with any component specific styles within the `components/`.                               |
| `utils/`       | Utility (helper) functions that are used in multiple places across the codebase. Most commonly hooks.       |
| `../gatsby/`   | Hooks to the gatsby build process.                                                                          |
| `globals.d.ts` | Any globally defined types - primarily used for scss declaration.                                           |
