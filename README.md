# Lost My Wheels README.md

LostMyWheels.com is a tool to help those in need, whether it is identifying a lost vehicle or reporting one. This is a completely free to use website that runs of both donations and low invasive ads. Our goal is to help those without placing a price tag on top.

# Installation

To get this website running locally, you will need the following that can not be found on the repository for safety purposes:
 - .env: This file contains all of the sensitive information that we do not want the public to see.

You do not have to worry about running any local database as we are using AWS RDS (Relation Database Service).

Please note that the initial set up (npm start) will take longer as SnowPack will need to build all of the dependencies

## Commands
 - **npm start**: This will start up SnowPack Dev (initial set up may take longer, as it needs to install all dependencies).
 - **npm build**: Will make a final version build ready to upload to AWS.
 - **npm lint**: Will run ESLint without " --fix" argument to view the errors / warnings without automatically fixing them if wanted.
  - **npm format**: Runs "ESLint --fix" and "prettier --write" for automatically fixing ESLint errors and formatting the code. 
  - **npm format:eslint**: Runs "ESLint --fix".
  - **npm format:prettier**: Runs "prettier --write" for formatting the code.
(WARNING: Prettier is not configured properly and will cause problems when trying to format, please stick to **"npm format:eslint"** for now).

# Systems we are using
We are using the following to build and run:
 - [Node](https://nodejs.org/en/)
 - [React Hooks](https://reactjs.org/docs/hooks-intro.html)
 - [ESLint](https://eslint.org/)
 - [SnowPack](https://www.snowpack.dev/)
 - AWS (login details are available on request **DEVS ONLY**)
	- S3 Buckets
	- RDS
	- Cognito
