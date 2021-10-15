import React, { useEffect } from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions, View, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button';

export function Configuration(){

  const navigation = useNavigation();
  
  function handleEditData(){
      navigation.navigate('EditData');
  }

  function handleEditPreferences(){
    navigation.navigate('EditPreferences');
}

  function LogOut(){
    AsyncStorage.removeItem('@mapping:userToken')
    navigation.navigate('Login');
}

  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
                style={styles.container}
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>
                    Configurações
                </Text>
              </View>
              <View style={styles.options}>
                <Button title="Editar dados" onPress={handleEditData} alt={false}/>
                <Button title="Editar preferências" onPress={handleEditPreferences} alt={false}/>
                <Button title="Sair" onPress={LogOut} alt={false} style={styles.logOut}/>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
      flex: 1,
      width: '100%'
  },
  form: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 54,
      alignItems: 'center',
  },
  emoji: {
      fontSize: 44
  },
  header: {
      alignItems: 'center'
  },
  title: {
      fontSize: 24,
      lineHeight: 32,
      textAlign: 'center', 
      color: colors.heading,
      fontFamily: fonts.heading,
      marginBottom: 20
  },
  loginButton: {
      marginTop: 40,
      width: '100%',
      paddingHorizontal: 20  
  },
  RegisterButton: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20  
  },
  options: {
    width: '100%'
  },
  logOut: {
    backgroundColor: '#c90000',
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50
  }
})
