import 'whatwg-fetch';

class Api {
  /**
  * Add an item to the shopping cart on server side
  */
  static retrieveCrimes(west, south, east, north, callback) {
    // const url = 'https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2016-01';
    let poly = west +':'+ south +':'+ north +':'+ east;
    // alert(JSON.stringify(poly));
    let url = 'https://data.police.uk/api/crimes-street/all-crime?poly='+ poly +'8&date=2016-01';

    // const url = 'https://data.police.uk/api/crimes-street/all-crime?date=2016-01';
    console.log('fetch crime cases', poly)
    fetch(url)
      .then(response => {
        var jsonResponse = response.json();
        console.log('response', jsonResponse);
        return jsonResponse} )
      .then(data => callback(data))
      .catch(e => console.log(e));
    }

static retrieveCrimeOutcomes(locationId, callback) {
  const url = 'https://data.police.uk/api/outcomes-at-location?&date=2016-01&location_id='+locationId;

  fetch(url)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(e => console.log(e));
  }

}

export default Api;
