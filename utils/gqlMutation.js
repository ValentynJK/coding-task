import { GraphQLClient, gql } from 'graphql-request'

const apolloEndPoint = 'https://codingtask.stratokit.io/'

const graphQLClient = new GraphQLClient(apolloEndPoint, {
  headers: {
    authorization: 'LukeSkywalkerIsTheBest'
  }
})

// mutation function
export default async function gqlMutateCall(character) {
  const { name, weight, height, gender } = character
  const genders = ['UNKNOWN', 'MALE', 'FEMALE', 'NA', 'OTHER'] // for converting genders

  try {
    const mutation = gql`
      mutation SavePerson($input: PersonInput!) {
        savePerson(input: $input) {
          name
          height
          weight
          gender
        }
      } 
    `
    const input = {
      input: {
        name: name,
        height: height,
        weight: weight,
        gender: genders[gender],
      }
    }

    const data = await graphQLClient.request(mutation, input)
    return true
  }
  catch (error) {
    return false
  }
}
