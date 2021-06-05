import axios from 'axios';

const mapsApi = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + -33.8670522 + ',' + 151.195736 + '&radius=1000&type=restaurant&keyword=restaurant&key=AIzaSyAFpAsoBD9Q75ttqJPjmopTCzM0dX3ZsTQ',
});

export default mapsApi;
