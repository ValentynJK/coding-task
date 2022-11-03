const { db } = require("./db");

const normalizeSwapiPerson = (person) => {
	return {};
};

const getData = async () => {
	// fetch people from the SWAPI
	// normalize the results so they are ready to be saved to the database
	// insert (or update) the results in the database
};

const sendData = async () => {
	// fetch people from the database; focus on the ones that have empty isSynced value
	// for every person prepare a GraphQL call and execute it
	// if everything went fine, update the isSynced value in the database
	// eventually all the people will be synced :)
};

module.exports = {
	normalizeSwapiPerson,
	getData,
	sendData,
};
