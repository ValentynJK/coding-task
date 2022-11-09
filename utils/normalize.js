// return an object with 'name', 'height', 'mass' and 'gender' properties
export default function normalizeSwapiPerson(character) {
  const properties = ['name', 'height', 'mass', 'gender', 'isSynced']
  const genders = {
    'unknown': 0,
    'male': 1,
    'female': 2,
    'n/a': 3,
  }
  return properties.reduce((acc, curr) => {
    switch (curr) {
      case 'gender':
        if (genders[character['gender']]) {
          acc['gender'] = genders[character['gender']]
        } else acc['gender'] = 4;
        break;
      case 'height':
        character[curr] === 'unknown' ? acc['height'] = null : acc[curr] = Number.parseInt(character[curr])
        break;
      case 'mass':
        character[curr] === 'unknown' ? acc['weight'] = null : acc['weight'] = Number.parseInt(character[curr])
        break;
      case 'isSynced':
        acc[curr] = null
        break
      default:
        acc[curr] = character[curr]
        break
    }
    return acc
  }, {})
};
