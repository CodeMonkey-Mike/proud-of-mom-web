# Proud of Mom 

## Tech Stack

#### Major stuff

- [x] [Next.js](https://nextjs.org/)
- [x] [Apollo Client](https://www.apollographql.com/docs/react/)

#### Form library

- [x] [Formik](https://github.com/formik/formik)

#### Create custom components

- [x] [Styled-components](https://github.com/styled-components/styled-components)
- [x] [Styled System](https://github.com/styled-system/styled-system)
- [x] [Storybook](https://github.com/storybookjs/storybook)'

#### Test

- [x] [Jest](https://github.com/facebook/jest)
- [x] [Ts-jest](https://github.com/kulshekhar/ts-jest)
- [x] [React Testing Library](https://github.com/testing-library/react-testing-library)

#### Linter & Formatter

- [x] [ESLint](https://github.com/eslint/eslint)
- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [EditorConfig](https://editorconfig.org/)

#### Pre-commit checks

- [x] [Lint-staged](https://github.com/okonet/lint-staged)
- [x] [Husky](https://github.com/typicode/husky)


## Get started

To communicate with server side before start you need to set it up with the server, go to the server repository: [Link](https://github.com/CodeMonkey-Mike/proud-of-mom-be).

## Set up


### Prerequisites

* [Install Yarn](https://yarnpkg.com/lang/en/docs/install/)

### Install

```
$ git clone git@github.com:CodeMonkey-Mike/proud-of-mom-web.git
$ cd proud-of-mom-web 
$ yarn
```

### Run
By run the command below, the site will start at `localhost:3000`. This will auto-reload when there is any change in the source code.

```
$ yarn dev
```
### Connect to Graphql

Pull and run `proudofmom-be` then change `NEXT_PUBLIC_API_URL` in `.env` file by `http://localhost:4000` at the root and restart the process: `$ yarn dev`

### Automation

##### 1.  When creating a new PR, the new build will execute for that PR, then create a new domain for it.

```
http://stage{PR_NUMBER}.proudofmom.com
```

##### 2.  When code is merged to master, will update the staging site automatically
- After code reviewed, use `Squash and merge` at the bottom of pull request page. The pipeline will run after all checks passed the site will update.
```
http://staging.proudofmom.com
```

##### 3. After staging tested and passed. Create a tag and push to git, will update the production site automatically.

Command line:
- This action will run release script automatically which is pull a latest commit and collecting the message then increase previous version to new version.

```
$ yarn release -auto
```
The format of release tag:
```
vX.X.X
```
E.g v0.1.0

Produciton url:
```
http://proudofmom.com
```

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
