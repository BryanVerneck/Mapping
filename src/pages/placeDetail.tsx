import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, OpaqueColorValue, Modal, Alert, Pressable } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute } from '@react-navigation/core';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { RatingButton } from '../components/RatingButton';
import { Button } from '../components/Button';
import Fonts from '../../styles/fonts';
import { RatingCard } from '../components/RatingCard';
import ratingOptions from '../services/ratingOptions.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import herokuApiSauce from '../services/HerokuAPISauce';

const rating = ratingOptions;

interface RatingProps {
  value: string,
  text: string
}

interface Params {
  place: {
    place_id: string;
    name: string;
    rating: number;
    user_ratings_total: number;
    types: number[];
    price_level: number;
    vicinity: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    }
  }
}

export function PlaceDetail(){
  const [rateIdSelected, setRateIdSelected] = useState('');
  const [rateOptions, setRateOptions] = useState(rating.options);
  const [showDialog, setShowDialog] = useState(false)
  const route = useRoute();
  const { place } = route.params as Params;
  
  async function submitRate(){
    await herokuApiSauce.post('/reviews/addReview', {
      descricao: "dummy",
      id_estabelecimento_places: place.place_id,
      id_usuario: 2,
      nota: rateIdSelected,
      nome_estabelecimento: place.name,
      localizacao: place.geometry.location.lat + "|" + place.geometry.location.lng
    }).then(response => console.log(response)).catch(e => console.log(e.data.message));
    
    setShowDialog(false)
    await AsyncStorage.setItem('@mapping:placeRate', rateIdSelected);
  }

  function handleRateSelected(item: RatingProps) {
    console.log(item.value);
    setRateIdSelected(item.value);
  }
  
  return(
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
      <Marker coordinate = {{latitude: place.geometry.location.lat, longitude: place.geometry.location.lng}}
        pinColor = {colors.main}
        title={place.name}
        description={place.types[0].toString()}/>
      </MapView>
      <View style={styles.container}>
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>
            {place.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.placeRating}>
            ⭐ {place.rating}
            </Text>
            <Text style={styles.placeRating}>
              ({place.user_ratings_total})
            </Text>
          </View>
          <Text style={styles.placeText}>Endereço: {place.vicinity}</Text>
          <Text style={styles.typesText}>{place.types.join(', ')}</Text>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showDialog}
            onRequestClose={() => {
              setShowDialog(!showDialog);
            }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Como foi sua experiência { '\n'} com este local?</Text>
                {rateOptions.map((item) =>
                  <TouchableOpacity onPress={() => handleRateSelected(item)} key={item.value}>
                    <RatingCard options={item}
                      style={ rateIdSelected === item.value ? styles.rateSelected : styles.rateContainer }/> 
                  </TouchableOpacity>
                )}
                <View style={{width: 200}}>
                  <View style={{ marginTop: 10}}>
                    <Button alt={false} title="Confirmar" onPress={() => submitRate()}/>
                    <View style={{ marginTop: 10}}>
                      <Button alt={true} title="Cancelar" onPress={() => setShowDialog(false)}/>
                    </View>
                  </View>
                </View>
            </View>
          </View>
        </Modal>
        <RatingButton title="Avaliar" onPress={() => setShowDialog(true)}/>
      </View>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
    alignItems: 'center',
  },
  placeInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  placeName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
  },
  placeText: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.heading,
    marginTop: 50,
    textAlign: "center"
  },
  typesText: {
    fontFamily: fonts.heading,
    fontSize: 14,
    color: colors.darker_gray,
    marginTop: 50,
    textAlign: "center",
    width: 250
  },
  placeAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  placeRating: {
    fontFamily: fonts.heading,
    fontSize: 15,
    color: colors.heading,
    marginTop: 5,
    marginLeft: 10
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontFamily: Fonts.heading,
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  rateSelected: {
    flexDirection: 'row',
    width: 200,
    backgroundColor: colors.main,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1
  },
  rateContainer: {
    flexDirection: 'row',
    width: 200,
    backgroundColor: colors.shape,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1
  },
  map: {
    flex: 1
  }
})
