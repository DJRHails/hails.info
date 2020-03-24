![Logo Header](https://i.imgur.com/MzaxQpN.png?1)

<br />

# hails.info

<!-- Right now I study _Computing (Artificial Intelligence)_ and have been nominated to join the Imperial-MIT Academic Exchange. I've been delighted to receive [several awards]() for academic achievement and project work.

I've worked for [Shell](#blog-shell), [Entrepreneur First](#blog-ef), [HMG](#blog-hmg) and for [myself](#blog-cybabrain).

CALL TO ACTION HERE... -->

#### Technology

hails.info is powered by [Gatsby](gatsbyjs.org) and is hosted on a custom barebones server.

#### Installation

```sh
# Go to your favourite directory and clone
git clone git@github.com:DJRHails/hails.info.git && cd hails.info

# Install all depedencies
yarn

# 🎉 that’s it, you've installed repo locally. One last step!
```

<!-- ### Enviroment Variables

This project uses [Contentful](https://www.contentful.com) to pull in some copy and images. To get this variables you can go to a couple different locations. First, you can log directly into Narative's Contentful account and look for the API keys. Second, you can check [Netlify's](https://netlify.com) deploy settings for the variables. -->

#### Running the code locally

```sh
yarn start
```

#### Building the website

```sh
yarn build
```

#### Deploying the website

<!-- Deployments are done using [Netlify](https://app.netlify.com/). You must be added to the Narative Netlify organization to deploy. -->

```sh
# To deploy, commit and push to master
git push
```

### Branching

#### `feature/[feature-name]`

Working on your feature branch can be previewed after every push.

#### `staging`

Before deploying to hails.info, double check your code on `staging` branch. This is published to staging.hails.info.

#### `master`

To deploy to hails.info merge your code into master.
