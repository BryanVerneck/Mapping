import axios from 'axios';

const ApiMapping = axios.create({
    baseURL: `https://mapping-recommender.herokuapp.com/`,
});

export default ApiMapping;