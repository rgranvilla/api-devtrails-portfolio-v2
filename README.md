# Github Api Proxy

_Development of an API proxy for the selection process of Shaw and Partners._

A Node.js server that acts as a proxy to the Github API. This project uses fastify as the server framework, zod for input validation, dotenv for managing environment variables, and is written in TypeScript.

## Installation

1. Clone the repository: `git clone git@github.com:rgranvilla/github-api-proxy.git-v1`
2. Install dependencies: `yarn install`

## Getting Started

1. Rename the `.env.example` file to `.env` and fill in the required environment variables
2. Run the server in development mode using `yarn dev` or build and start the server using `yarn build` and `yarn start`

## Available Scripts

- `dev`: Starts the server in development mode using `tsx watch`
- `start`: Starts the server in production mode
- `build`: Builds the project using `tsup`
- `lint`: Lints the project using `eslint`
- `format`: Formats the code using `prettier`
- `commit`: Creates a new changeset, versions the package, runs `lint-staged`, and prompts to create a commit message using `commitizen`
- `co`: Same as `commit`, but also stages the changes for commit
- `changeset`: Runs the `changeset` CLI
- `version-packages`: Versions the packages using `changeset`
- `publish-packages`: Builds, lints, tests, versions, and publishes the packages using `changeset`

## Environment Variables

- `NODE_ENV`: The environment the server is running in (`development`, `production`, `test`, etc.)
- `API_BASE_URL`: The base URL of the Github API
- `PORT`: The port the server will listen on

**Note**: Make sure to never commit your .env file to source control. The .env.example file is provided as a template to show what environment variables are required.
