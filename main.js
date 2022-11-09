import { db } from './db.js'
import gqlMutateCall from './utils/gqlMutation.js' // for gql mutation
import apiCall from './utils/apiCall.js' // generic fn to fetch data from REST API
import normalizeSwapiPerson from './utils/normalize.js' // for data modification before sending to gql
import updateLocalDB from './utils/updateLocalDB.js' // updates local DB

export const getData = async () => {
	try {
		// initial call
		const { count, results } = await apiCall('https://swapi.dev/api/people/')
		const pagesCount = Math.ceil(count / 10); // calculates amount of pages to be fetched
		let endPoints = []; // initial array for all endPoints to fetch

		// pushes every page to a promise list
		for (let i = 2; i <= pagesCount; i++) {
			endPoints.push(`https://swapi.dev/api/people/?page=${i}`)
		}

		// returns all pages of people except the 1-st
		const allPages = await Promise.all(endPoints.map(endPoint => apiCall(endPoint)))

		// concats people altogether in one array
		const people = results.concat(allPages.reduce((acc, curr) => acc.concat(curr.results), []))

		// checks the final people array
		if (people.length !== count) throw Error('api call result returns different amount of people then specified in initial response')

		const normalized = people.map(character => normalizeSwapiPerson(character))
		updateLocalDB(normalized)
	}

	catch (error) {
		console.log('Oops, something went wrong', error)
	}
};

export const sendData = async () => {
	const peopleDB = db.prepare('SELECT * FROM people WHERE isSynced IS NULL').all(); // array of characters
	// main sync iteration
	await Promise.all(peopleDB.map(async (character) => {
		if (await gqlMutateCall(character)) {
			db.prepare('UPDATE people SET isSynced = ? WHERE name = ?').run(1, character.name)
		}
	}))

	if (db.prepare('SELECT * FROM people WHERE isSynced IS NULL').all().length !== 0) return await sendData()

};

