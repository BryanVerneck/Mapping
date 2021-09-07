import axios from 'axios';

const herokuApi = axios.create({
    baseURL: `https://api-mapping.herokuapp.com`,
});

export default herokuApi;