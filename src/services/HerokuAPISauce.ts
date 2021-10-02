import api from 'apisauce';

const herokuApiSauce = api.create({
    baseURL: `https://api-mapping.herokuapp.com`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
});

export default herokuApiSauce;