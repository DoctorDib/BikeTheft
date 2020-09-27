## Developing
DO NOT TOUCH `api.js` or `database.js` in any of the dirs. These are setup fine and are used as helpers for the actual
api calls.

Develop within `user.js`, `forum.js` or `vehicles.js`.
If it gets too long, then you can just split it out into other files also. It's just much easier to keep them in a single
file as configuration objects, etc don't need to be setup multiple times. Maybe in the future I will ensure they are in `api.js`
alongside other bits.

## API route

The current route to the production api is: `https://api.lostmywheels.com/`

Each micro-service has its own path `/users`, `/forum`, `/vehicles`


## Deploying
First things first, you need to set-up an AWS CLI profile named BTP using an IAM
role on AWS.

Run `npm i`

May also need to run `npm i serverless -g` to be able to run the functions through CLI.

Also, you will need to create a `.env` file in the root of the `api` dir (this current dir)

Within the `.env` file the only variable needed currently is `postgres` which must contain a valid postgres connection string.
Forgetting this step will mean that the endpoints of this service cannot connect to the database.

Then simply run `sls deploy` within one of the `users/vehicles/forum` dirs.

This will automatically deploy the entire microservice onto AWS.

[Find more about the deployment here](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy/)
