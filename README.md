# StratoKit's coding task

Hello! If you're reading this, it means you've got qualified for the next stage of our recruitment for Junior Full-Stack Developer. Congratulations! 🎉

This exercise is meant to check your basic JavaScript skills, but most importantly - your ability to research and explore. It also unveils a little bit of what we typically work on - since StratoKit is a software integration company, your project will be about data synchronization.

Remember that we're looking for a junior developer, so please don't feel like you have to know everything. Whenever you feel too puzzled - you want to ensure the scope of the task, you have a few ideas to solve the problem but don't know which one is better, etc - **don't hesitate to approach me (michal@stratokit.io)**. _Better to ask the way than to go astray_ 🙂.

Also, if you simply don't feel like completing this task, you can send what you've finished and then we can talk about the difficulties around the missing parts.

**Good luck!** 🧑‍💻  
Michał Dzienisiewicz  
Your future colleague

# How to start working on the task

It's a template repository, which means that you have two possibilities:

- [create your own repo out of the template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), so that you can make it private (then please ensure that @Dzieni and @wmertens are invited);
- or just fork it, but then it's public by default.

Choose whatever you feel comfortable with.

To ensure you're not stuck with compatibility issues, the script relies on vanilla `npm` and Node.js (with a good ol' `require` syntax from CommonJS). You can change it and i.e. migrate to ES Modules and `yarn` if you want.

You can also assume that the script has to run in Node 18 or later, so feel free to use the modern JS syntax.

# The problem

We have [SWAPI](https://swapi.dev), the API of Star Wars universum data. The goal is to synchronize (one-way) the data about **people** to a GraphQL API [here](https://codingtask.stratokit.io).

# The application structure

The script (`main.js`) is split into two stages:

- fetching people from SWAPI and saving them into an SQLite database - `getData`;
- and then fetching people from that database and sending them using the GraphQL endpoint - `sendData`.

## SWAPI

Connection to SWAPI **should not** be established through the helper libraries, such as `swapi-node`. You can use HTTP request libraries, such as `axios`, `got` or `node-fetch`. **PROTIP**: Node 18 has a native `fetch` function available ✌️.

## SQLite

SQLite connection is established using [better-sqlite3](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md) and you can use it through the `db` variable. Data are stored in `data.sqlite3` file. You already have a table of `people` with following columns:

- `name` - TEXT (and the primary key). The name of this person.
- `height` - INTEGER. The height of the person in centimeters.
- `weight` - INTEGER. The height of the person in kilograms.
- `gender` - INTEGER that acts like an enum. `0` = unknown, `1` = male, `2` = female, `3` = n/a, `4` = other
- `isSynced` - INTEGER that acts like a boolean. `NULL` = not synced, anything else (preferably `1`) = synced

As you can see, the data structure in the database is a little bit different than what you get in SWAPI. Therefore, the data will have to be converted at some point. Please do this in `normalizeSwapiPerson` function. To ensure the results, you can test it using Jest (`npm test`; you have a ready test file `main.test.js`).

## GraphQL

The endpoint is simply https://codingtask.stratokit.io. When you open that URL in the browser, you'll get a web interface that allows you to explore the schema.

TL;DR version: it contains a single mutation `savePerson`. Input and output is similar to what you store in SQLite, except `gender` being an actual enum: `UNKNOWN`/`MALE`/`FEMALE`/`NA`/`OTHER`.

On every person from the `people` table, you should perform the `savePerson` mutation. If it ran without errors, you can mark in the database that this person `isSynced`.

Connection to GraphQL **can** be established through the helper libraries, such as `graphql-request`. It'll save you some hustle, although you can make an HTTP request directly if you find it more comfortable.

**IMPORTANT #1**: To perform the mutation, you have to authenticate using the `Authorization` HTTP header with a following value: `LukeSkywalkerIsTheBest`.

**IMPORTANT #2**: Since connecting to APIs in real life involves occasional downtimes, our mutation is designed to randomly fail in approximately 10% of attempts. Please don't be surprised - ideally, if the mutation has failed, the script should just skip the person you've tried to save and retry next time when you run the script.

# Useful resources

- [GraphQL tutorial](https://hasura.io/learn/graphql/intro-graphql/introduction/)
- [SQL tutorial](https://www.sqltutorial.org/)
- [DB Browser for SQLite](https://sqlitebrowser.org/)
- [Jest tutorial](https://dev.to/dsasse07/a-beginner-s-guide-to-unit-testing-with-jest-45cc)
