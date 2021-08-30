import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import Input from '../components/Input';
import {Button} from '../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  function handleLogin(){
    navigation.navigate('PlaceSelect');
    // navigation.navigate('Confirmation');
  }

  function handleRegistration(){
    navigation.navigate('Registration');
    // navigation.navigate('Confirmation');
  }

  function handleEmailInputChange(value: string){
    setEmail(value);
  }

  function handlePasswordInputChange(value: string){
    setPassword(value);
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
                    Olá, seja muito bem-vindo!
                </Text>
              </View>
              <Input placeholder="E-mail de usuário" onChange={handleEmailInputChange}/>
              <Input placeholder="Senha" onChange={handlePasswordInputChange}/>
              <View style={styles.loginButton}>
                <Button
                title="Login"
                alt = {false}
                onPress={handleLogin}
                />
              </View>
              <View style={styles.RegisterButton}>
                <Button
                title="Criar uma conta"
                alt = {true}
                onPress={handleRegistration}
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
  },
  RegisterButton: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20  
  },

})