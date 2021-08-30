import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';
import Input from '../components/Input';

export function Registration(){

  const navigation = useNavigation();

  function handleSubmit(){
    navigation.navigate('Preferences');
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
                    Precisamos de apenas algumas informações
                </Text>
              </View>
              <Input placeholder="E-mail" />
              <Input placeholder="Senha" />
              <Input placeholder="Idade" />
              <Input placeholder="Sexo" />
              <View style={styles.loginButton}>
                <Button
                title="Confirmar"
                alt = {false}
                onPress={handleSubmit}
                />
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
    marginTop: 20
},
loginButton: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20  
}
})