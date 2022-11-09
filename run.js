import { getData, sendData } from './main.js'

const run = async () => {
	try {
		console.log("Fetching data from SWAPI...");
		await getData();
		console.log("Sending data to the GraphQL endpoint...");
		await sendData();
		console.log("Job done!");
	}
	catch (error) {
		console.log('Ooops, something went wrong, please check the code')
	}
};

run();
