import axios from 'axios';
import GetLocation from 'react-native-get-location'
// import location from '../services/getLocation'

const mapsApi = axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/place/nearbysearch`,
});

export default mapsApi;

// -25.512860661205803, -49.18136380850622
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.195736&radius=1000&type=restaurant&keyword=restaurant&key=AIzaSyC_gkGpo4lfPP7bVMqBeMfu2nB7JmRfgF0