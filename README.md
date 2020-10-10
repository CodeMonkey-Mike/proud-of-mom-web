# Proud of Mom 

## Tech Stack

#### Major stacks

- [x] [Next.js](https://nextjs.org/)
- [x] [Apollo Client](https://www.apollographql.com/docs/react/)

#### Form library

- [x] [Formik](https://github.com/formik/formik)

#### Create custom components

- [x] [styled-components](https://github.com/styled-components/styled-components)
- [x] [Styled System](https://github.com/styled-system/styled-system)
- [x] [Storybook](https://github.com/storybookjs/storybook)'

#### Test

- [x] [Jest](https://github.com/facebook/jest)
- [x] [ts-jest](https://github.com/kulshekhar/ts-jest)
- [x] [React Testing Library](https://github.com/testing-library/react-testing-library)

#### Linter & Formatter

- [x] [ESLint](https://github.com/eslint/eslint)
- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [EditorConfig](https://editorconfig.org/)

#### Pre-commit checks

- [x] [lint-staged](https://github.com/okonet/lint-staged)
- [x] [Husky](https://github.com/typicode/husky)


## Get started

To communicate with server side before start you need to set it up with the server, go to the server repository: [Link](https://github.com/CodeMonkey-Mike/proud-of-mom-be).

## Quick start 

#### Start development 

- Install node packages and run development mode.

`yarn && yarn dev`

#### Test

`yarn test`

#### Production build

`yarn build`

## Staging release and confirm for production release

- Merge the PR into master, at this step the automation process will be triggered.

## Production release

> ! One hint: for the first release, the `-auto` tag won't work completely, therefore we need to release by manual step to make sure the `-auto` tag and encasement will be worked afterward.

There are two kinds of release step:

#### 1. Automatically

Checkout branch master and run the command line:

```

yarn release -auto

```
- `-auto`: this tag will be enabled the automation process by collecting the commit message to put into release information and increase the version number.

#### 2. Manually

```
// example
yarn release -a v1.0.0 -m '- This is first release'

```
