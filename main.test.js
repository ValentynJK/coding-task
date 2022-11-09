import normalizeSwapiPerson from './utils/normalize'

describe('normalize.js', () => {
	test("SWAPI character has all fields not null", () => {
		expect(normalizeSwapiPerson({
			name: 'Luke Skywalker',
			height: '172',
			mass: '77',
			gender: 'male',
		})).toMatchObject({
			name: 'Luke Skywalker',
			height: 172,
			weight: 77,
			gender: 1,
			isSynced: null
		});
	});
	test("SWAPI character has weight and height are null and not predefined gender", () => {
		expect(normalizeSwapiPerson({
			name: 'Luke Skywalker',
			height: 'unknown',
			mass: 'unknown',
			gender: 'superhuman',
		})).toMatchObject({
			name: 'Luke Skywalker',
			height: null,
			weight: null,
			gender: 4,
			isSynced: null
		});
	});
})
