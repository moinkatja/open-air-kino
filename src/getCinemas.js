import API_ENDPOINT from "./config";

function getCinemas(region) {

  const options = {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    }
  }

  return fetch(API_ENDPOINT + `${region}`, options)
    .then(response => {
      return Promise.resolve(response.json())
    })
}

export { getCinemas };