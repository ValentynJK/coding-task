# The problem

This exercise is meant to check basic JavaScript skills, but most importantly - the ability to research and explore. The project will be about data synchronization.
We have [SWAPI](https://swapi.dev), the API of Star Wars universum data. The goal is to synchronize (one-way) the data about **people** to a GraphQL API [here](https://codingtask.stratokit.io).

# The application structure

The script (`main.js`) is split into two stages:

- fetching people from SWAPI and saving them into an SQLite database - `getData`;
  Flow:
  * fetches people from the SWAPI;
	* normalizes the results so they are ready to be saved to the database
	* inserts (or updates) the results in the local database  
- and then fetching people from that database and sending them using the GraphQL endpoint - `sendData`.
  Flow:
  * fetches people from the database; every iteration it focuses on the ones that have empty isSynced value;
	* for every characters prepares a GraphQL call and executes it
	* if everything went fine, updates the isSynced value in the local database 
	* check if there are characters which have null as isSynced value and recurse the `sendData`;
	* if there are all people are synced returns
- `utils` folder:
  * `apiCall` - generic async function to make api call to specific endpoint
  * `gqlMutation` - mutation function to make a call to GraphQL Apollo server
  * `normalize` - converts received after HTTP call character object and returns an object with 'name', 'height', 'mass' and 'gender' properties only
  * `updateLocalDB` - **inserts** a new values in `data.sqlite3` (Local DB) OR **updates** exist values for keys ('height', 'mass', 'gender' and 'isSynced') 
- `main.test` - tests
- `run` runs asynchronously `getData` and `sendData` one after another 

**Important** Application has ES6 module structure, that is why `babel.config.json` needed to configure JEST testing library

## SWAPI

Connection to SWAPI is established through HTTP request library, `node-fetch`.

## SQLite

SQLite connection is established using [better-sqlite3](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md). 
Data are stored in `data.sqlite3` file. The `people` table has following columns:

- `name` - TEXT (and the primary key). The name of this person.
- `height` - INTEGER. The height of the person in centimeters.
- `weight` - INTEGER. The height of the person in kilograms.
- `gender` - INTEGER that acts like an enum. `0` = unknown, `1` = male, `2` = female, `3` = n/a
- `isSynced` - INTEGER that acts like a boolean. `NULL` = not synced, anything else (preferably `1`) = synced

## GraphQL

The endpoint is https://codingtask.stratokit.io.

TL;DR version: it contains a single mutation `savePerson`. Input and output is similar to what you store in SQLite, except `gender` being an actual enum: `UNKNOWN`/`MALE`/`FEMALE`/`NA`.

On every person from the `people` table `sendData` performs the `savePerson` mutation. If it ran without errors, it marks in the local DB that this person `isSynced`.

Connection to GraphQL is established through the helper library `graphql-request`.

**IMPORTANT #1**: Apollo server authentication: `Authorization`: `LukeSkywalkerIsTheBest`.

**IMPORTANT #2**: Since connecting to APIs in real life involves occasional downtimes, our mutation is designed to randomly fail in approximately 10% of attempts.

