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

## Quick start 

#### Install node modules

`npm install` or `yarn`

#### Start development

Before start you need pull and run with server, reference here: [Pull](http://git.dominitech.com/bryan/proud-of-mom-server)
Make sure you already install postgres under your local. Check out the .env.example in server repo.

`npm run dev` or `yarn dev`

#### Test

`npm run test` or `yarn test`

#### Production build

`npm run build` or `yarn build`

## Working processes

This one explains the process step to step from picking task and go to finish the ticket.

### Step 01:
- After checked out the repository, go to the source folder and create a branch for development.
Example
<code>
git checkout develop

git pull

git checkout -b <Name_of_branch> // for example f/signin

git push origin f/signin
</code>

### Step 02:

Code something, do what you need to do.
Example
<code>
git add ./src/path/.../.../files.(ts,tsx)

...

git commit -m 'f/signin: [POM-CLIENT] create new sign in form'
</code>

Commit message follow the format: `BRANCH_NAME: [REPO_NAME] MESSAGE TEXT` 

### Step 03:

Create/Review pull request:
- Create pull request from your branch to develop.
- Pull request needs approved before merge to develop.
- If everything is ok, click merge the pull request and delete old branch.