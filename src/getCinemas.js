 
 function getCinemas (region) {
 
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const url= `${proxyUrl}https://open-air-cinema.herokuapp.com/api/search?region=${region}`
    const options = {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        }
      }
  
      fetch(url, options)  
        .then(res => {
          if (!res.ok) {
            throw new Error('Something went wrong, please try again later.');
          }
          return res;
        })
        .then(res => res.json())
      
    return fetch(url).then(response => response.json())
}

export {getCinemas};