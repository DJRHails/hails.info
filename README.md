<div align="center">

  ![Logo Header](https://i.imgur.com/MzaxQpN.png?1)

</div>

<h1 align="center">
  <strong>HAILS</strong>.info
</h1>

<h4 align="center">

[![Stars](https://img.shields.io/github/stars/DJRHails/hails.info.svg?style=plasticr)](https://github.com/DJRHails/hails.info/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/DJRHails/hails.info.svg?style=plasticr)](https://github.com/DJRHails/hails.info/commits/master)
[![Production Deploy](https://github.com/DJRHails/hails.info/workflows/Production%20Deploy/badge.svg)](https://github.com/DJRHails/hails.info/actions?query=workflow%3A"Production+Deploy")
[![GitHub issues](https://img.shields.io/github/issues-raw/DJRHails/hails.info?style=flat)](https://github.com/DJRHails/hails.info/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/DJRHails/hails.info)](https://github.com/DJRHails/hails.info/pulls)
</h4>

<h3 align="center">
  <a href="https://hails.info/">Visit the site</a> |
  <a href="https://github.com/DJRHails/hails.info/issues/new">Leave feedback</a>
</h3>

## :wrench: Technology

hails.info is powered by [Gatsby], coded with [React], with [Bootstrap] and [SASS] styling. It is deployed statically to a custom bare-metal server, with [surge.sh] for staging.

## :gear: Installation

```sh
# Go to your favourite directory and clone
git clone git@github.com:DJRHails/hails.info.git && cd hails.info

# Install all depedencies
yarn install

# 🎉 that’s it, you've installed repo locally. One last step!
```

### Running the code locally

```sh
yarn start
```

### Building the website

```sh
yarn build
```

## :rocket: Deploying the website

### Staging
```sh
surge ./public
```

### Production

```sh
# To deploy, commit and push to master
git push master
```

## :palm_tree: Branching

### `feature/[feature-name]`

Working on your feature branch can be previewed after every push.

If you have a Pull Request open then it will be automaticatly deployed to `feature-feature-name.hails.surge.sh`.

### `master`

To deploy to hails.info merge your code into master.

[Gatsby]:https://www.gatsbyjs.org/
[React]:https://www.reactjs.org/
[Bootstrap]:https://getbootstrap.com/
[SASS]:https://sass-lang.com/
[surge.sh]:https://surge.sh/
