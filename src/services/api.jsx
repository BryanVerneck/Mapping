import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { Alert } from 'react-native';

// const navigation = useNavigation();

const api = axios.create({
    baseURL: 'https://api-mapping.herokuapp.com',
});

api.interceptors.response.use(
  response => {

    // Do something with response data

    return response
  },
  error => {

    // Do something with response error

    // You can even test for a response code
    // and try a new request before rejecting the promise

    if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      Alert.alert(
        'Aviso',
        'Não foi possível conectar aos nossos servidores, sem conexão a internet',
        [ { text: 'OK' } ],
        { cancelable: false },
      )
    }

    if (error.response.status === 401) {
      const requestConfig = error.config

      // O token JWT expirou

      AsyncStorage.removeItem('@mapping:userToken').then(() => {
        navigation.navigate('Login', {})
      })

      return axios(requestConfig)
    }

    return Promise.reject(error)
  },
)

api.interceptors.request.use(
  config => {
    return AsyncStorage.getItem('@mapping:userToken')
      .then(user => {
        user = JSON.parse(user)
        if (user && user)
          config.headers.Authorization = `Bearer ${user}`
        return Promise.resolve(config)
      })
      .catch(error => {
        console.log(error)
        return Promise.resolve(config)
      })
  },
  error => {
    return Promise.reject(error)
  },
)

export default api;