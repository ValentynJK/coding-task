const { normalizeSwapiPerson } = require("./main");

test("SWAPI person normalization", () => {
	expect(normalizeSwapiPerson({})).toEqual({});
});
