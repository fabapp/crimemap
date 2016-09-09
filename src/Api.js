import 'whatwg-fetch';

class Api {
  /**
  * Add an item to the shopping cart on server side
  */
  static retrieveCrimes(callback) {
    const url = 'https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2016-01';

    fetch(url)
      .then(response => response.json())
      .then(data => callback(data))
      .catch(e => console.log(e));
    }

}

export default Api;
