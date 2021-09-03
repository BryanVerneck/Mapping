import axios from 'axios';
import GetLocation from 'react-native-get-location'
// import location from '../services/getLocation'

const herokuApi = axios.create({
    baseURL: `https://api-mapping.herokuapp.com/public`,
});

export default herokuApi;