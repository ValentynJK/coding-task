import fetch from 'node-fetch'

// generic function to make api call to specific endpoint
export default async function apiCall(endPoint) {
  try {
    const response = await fetch(endPoint);
    const responseJSON = await response.json();
    return responseJSON;
  }
  catch (error) {
    console.log(error)
  }
}