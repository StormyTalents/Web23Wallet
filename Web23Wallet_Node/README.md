# Node Express & Typescript Web23 Wallet MVP Node

## Usage:

You should copy `.env.sample` to `.env` and then:

`npm run dev` - Run the development server.

`npm test` - Run tests.

`npm run test:watch` - Run tests when files update.

`npm run build` - Builds the server.

`npm start` - Runs the server.
## Default endpoints:

A `GET` request to `/` will respond with a description of the application.

A `POST` request to `/web23/new_account` create new account transaction endpoint.

A `POST` request to `/web23/get_nfts`  show nfts restful api endpint.

A `POST` request to `/web23/send_hbar` send hbar transaction endpoint.

A `POST` request to `/web23/get_domain` get godaddy domains endpoint.