const { getData, sendData } = require("./main");

const run = async () => {
	console.log("Fetching data from SWAPI...");
	await getData();
	console.log("Sending data to the GraphQL endpoint...");
	await sendData();
	console.log("Job done!");
};

run();
