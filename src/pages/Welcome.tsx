import React, { useEffect } from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts'
import LottieView from 'lottie-react-native';
import SearchingAnimation from '../assets/searchingData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Welcome(){

useEffect(() => {
  
  async function handleUserNextScreen() {
    const userToken = await AsyncStorage.getItem('@mapping:userToken');

    navigation.navigate(userToken ? 'PlaceSelect' : 'Login');
  }

    handleUserNextScreen();
  }, []);

  const navigation = useNavigation();
  
  function handleStart(){
      navigation.navigate('Login');
  }

  return(
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>
            Encontre seu{'\n'}
            local favorito de{ '\n'}
            forma fácil
            </Text>

            <LottieView
                source={SearchingAnimation}
                autoPlay
                loop
                style={styles.animation}
            />

            <Text style={styles.subtitle}>
            Não perca mais tempo procurando { '\n'} 
            por um lugar novo. Nós procuramos para você.
            </Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={handleStart}>
                <Text>
                    <Feather 
                        name="chevron-right"
                        style={styles.buttonIcon}
                        />
                </Text>
            </TouchableOpacity>
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20 
    },
    title: {
        marginTop: 70,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
        height: 56,
        width: 100
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    },
    animation: {
        height: Dimensions.get('window').width * 0.5
    },

})
