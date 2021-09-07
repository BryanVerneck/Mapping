import api from 'apisauce';

const herokuApiSauce = api.create({
    baseURL: `https://api-mapping.herokuapp.com`,
});

export default herokuApiSauce;