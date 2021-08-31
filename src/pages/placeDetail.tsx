import React from 'react'
import { Alert, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableOpacity, OpaqueColorValue} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute } from '@react-navigation/core';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
  place: {
    place_id: string;
    name: string;
    rating: number;
    user_ratings_total: number;
  }
}

export function PlaceDetail(){
  const route = useRoute();
  const { place } = route.params as Params;

  return(
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
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
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
    marginTop: 15,
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
  }
})
