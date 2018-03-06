# WeGot - Nearby-Recommendations
## Purpose
This service forms a part of the WeGot food review website. It renders 6 recommended restaurants based on proximity to the current restaurant selected showing basic information about a restaurant, including the name, description, type, neighborhood, price level, WeGot and Google reviews summary. Clicking on the restaurant will take you to the newly selected restaurant page.

## Description
The service is composed of a server, a  client, and a database.
### Server API
Serves static client files in response to a GET request to the root endpoint.
### Database
A MongoDB database that holds restaurant information.
### Client
Takes in a restaurant ID and requests restaurant information from the server. Renders the information.

## Getting Started
### Prerequisites
-npm
-node
-jest
-webpack
-MongoDB

### Installation
1. Install dependencies: `npm install`
2. Start database server: `npm run database`
3. Seed database: `npm run seed-database`
4. Start server: `npm start`

To start, in your browser navigate to: [http://localhost:3000](http://localhost:3000)

## Tests
Run: `npm test`