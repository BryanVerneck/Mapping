import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';

import { Load } from '../components/Load';
import { Header } from '../components/Header';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import mapsApi from '../services/mapsApi';
import { PlaceCardPrimary } from '../components/PlaceCardPrimary';
import placeType from '../services/server.json';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import herokuApi from '../services/HerokuAPI';
import ApiMapping from '../services/ApiMapping';

interface TypeProps {
    key: string;
    title: string;
}

interface PlaceProps {
    place_id: string;
    name: string;
    icon: string;
    types: [string];
    recomendar: string;
}

export function PlaceSelect(){
  const [id, setId] = useState('')
  const [enviroments, setEnviroments] = useState<TypeProps[]>([]);
  const [restaurant, setRestaurant] = useState<PlaceProps[]>([]);
  const [bar, setBar] = useState<PlaceProps[]>([]);
  const [park, setPark] = useState<PlaceProps[]>([]);
  const [museum, setMuseum] = useState<PlaceProps[]>([]);
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('restaurant');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const navigation = useNavigation();

  async function loadStorageUserId(){
    const userId = await AsyncStorage.getItem('@mapping:CurrentUserId');
    setId(userId || '');
  }
  
  useEffect(() => {
    getCoords();
    fetchEnviroment();
    loadStorageUserId();
  }, [])

  useEffect(() => {
    if(id && lat && long){
      fetchPlaces();
      console.log(id)
    }
  }, [id, lat, long])

  useEffect(() => {
    if(environmentSelected == 'restaurant'){
      return setFilteredPlaces(restaurant);
    }

    if(environmentSelected == 'bar'){
      return setFilteredPlaces(bar);
    }

    if(environmentSelected == 'park'){
      return setFilteredPlaces(park);
    }

    if(environmentSelected == 'museum'){
      return setFilteredPlaces(museum);
    }
  }, [environmentSelected])

  async function getCoords() {
    console.log('Coords')
    Location.installWebGeolocationPolyfill()
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setLat(latitude);
        setLong(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }
      
  async function fetchEnviroment() {
    console.log('Environ')
    const data = placeType.places_environments;
    setEnviroments([
      ...data
    ]);
  }

  function handleEnvironmentSelected(type: string){
    setEnvironmentSelected(type);

    // const filtered = places.filter(place => 
    //     place.types.includes(type)
    // );
    
    // setFilteredPlaces(filtered);
  }

  async function fetchPlaces() {
    // const { data } = await mapsApi.get(`/json?location=${lat},${long}&radius=2000&keyword=restaurant|bar|park|museum&key=AIzaSyC_gkGpo4lfPP7bVMqBeMfu2nB7JmRfgF0`);
    // await ApiMapping.get(`/recommender/477/2/restaurant/-25.4444/-49.2881`).then(res => setRestaurant(res.data.results));

    await herokuApi.post(`/recommender/${id}/restaurant`, {
      lat: "-25.4444",
      long: "-49.2881",
    }).then(res => {
      setRestaurant(res.data.results)
      setFilteredPlaces(res.data.results)
    });
    
    api.post(`/recommender/${id}/bar`, {
    "lat": "-25.4444",
    "long": "-49.2881",
    }).then(res => setBar(res.data.results));

    api.post(`/recommender/${id}/museum`, {
    "lat": "-25.4444",
    "long": "-49.2881",
    }).then(res => setMuseum(res.data.results));

    api.post(`/recommender/${id}/park`, {
    "lat": "-25.4444",
    "long": "-49.2881",
    }).then(res => setPark(res.data.results));

    // const filtered = restaurant.filter(place => 
    //   place.recomendar
    // ); 

    // setFilteredPlaces(filtered);

    if(!restaurant)
        return setLoading(true);
    if(page > 1){
        // setPlaces(oldValue => [...oldValue, ...data.results])
        // setFilteredPlaces(oldValue => [...oldValue, ... data.results])
    }else{
        // setPlaces(data.results);
        // setFilteredPlaces(restaurant);
    }
    setLoading(false);
    setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
      // if(distance < 1)
      //     return;

      // setLoadingMore(true);
      // setPage(oldValue => oldValue + 1);
      // fetchPlaces();
    }
 
    function handlePlaceSelected(place: PlaceProps){
      navigation.navigate('PlaceDetail', {place});
      console.log("place:" + place.place_id)
    }

    if(loading){
      return <Load />
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                
                <Text style={styles.title}>
                  Que tipo de local
                </Text>
                <Text style={styles.subtitle}>
                    você deseja visitar?
                </Text>
            </View>

            <View>
               <FlatList 
                data={enviroments}
                keyExtractor={(item) => String(item.key)}
                renderItem={({ item }) => (
                    <EnviromentButton 
                        title={item.title}
                        active={item.key === environmentSelected}
                        onPress={() => handleEnvironmentSelected(item.key)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}
               />
            </View>
                    
            <View style={styles.places}>
              <FlatList 
                  data={filteredPlaces}
                  keyExtractor={(item) => String(item.place_id)}
                  renderItem={({ item }) => (
                      <PlaceCardPrimary 
                          data={item} 
                          onPress={() => handlePlaceSelected(item)}
                        />
                      )}
                      showsVerticalScrollIndicator={false}
                      numColumns={1}   
                      onEndReachedThreshold={0.1}                          
                      onEndReached={({ distanceFromEnd }) => 
                          handleFetchMore(distanceFromEnd)
                      }
                      // ListFooterComponent={
                      //     loadingMore 
                      //     ? <ActivityIndicator color={colors.main} />
                      //     : <></>
                      // }
                    />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    header:{
      paddingHorizontal: 17,
    },
    title: {
      fontSize: 17,
      fontFamily: fonts.heading,
      color: colors.heading,
      lineHeight: 20,
      marginTop: 5
    },
    subtitle: {
      fontFamily: fonts.text,
      fontSize: 17,
      lineHeight: 20,
      color: colors.heading
    },
    enviromentList: {
      height: 40,
      justifyContent: 'center',
      paddingBottom: 5,
      marginLeft: 15,
      paddingRight: 30,
      marginVertical: 15,
    },
    places: {
      flex: 1,
      paddingHorizontal: 15,
      justifyContent: 'center',
    }
});