import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform, Keyboard, AsyncStorage, Image} from 'react-native';
import Input from '../components/Input';
import {Button} from '../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import jwt from 'jwt-decode';
import { CurrentUserData } from '../contexts/CurrentUserContext';
import { UserProps } from '../models/UserProps';
import { secondsToMinutes } from 'date-fns/esm';
import newIcon from '../../assets/newIcon.png';

export function Login(){
  let user: UserProps;
  const { setId, setEmail, setNewDate, setNome, setPreferenceSelected, setProfessionIdSelected, setSenha, setSexo } = useContext(CurrentUserData);
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // useEffect(() => {
  //   async function handleUserNextScreen() {
  //     const userToken = await AsyncStorage.getItem('@mapping:userToken');

  //     navigation.navigate(userToken ? 'PlaceSelect' : 'Login');
  //   }

  //   handleUserNextScreen();

  //   AsyncStorage.setItem('@mapping:userToken', JSON.stringify(null));
    
  // }, []);

  async function handleLogin(){
    if(!emailInput || password){
      return Alert.alert("Insira seu email e senha")
    }
    await api.post('/user/login', { 
      email: emailInput.toLowerCase(),
      senha: password,
    }).then(async response => {
      user = await jwt(response.data.userData);
      await AsyncStorage.setItem('@mapping:Token', response.data.userData);
      await AsyncStorage.setItem('@mapping:CurrentUserId', user.userData.id);
      await AsyncStorage.setItem('@mapping:user', user.userData.nome);
      setId(user.userData.id);
      setSenha(user.userData.senha)
      setEmail(user.userData.email);
      setNewDate(user.userData.data_nascimento);
      setSexo(user.userData.sexo);
      setNome(user.userData.nome);
      setProfessionIdSelected(user.userData.id_profissao)
      // setPreferenceSelected(user.userData.id);
      navigation.navigate('PlaceSelect');
    }).catch(() => {
        Alert.alert("Login e/ou senha incorreto(s) 😕")}
      );
  }

  function handleRegistration(){
    navigation.navigate('Registration');
  }

  function handleEmailInputChange(value: string){
    setEmailInput(value);
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
                {/* <Text style={styles.title}>
                    Olá, seja muito bem-vindo!
                </Text> */}
                <Image source={newIcon} />
              </View>
              <Input placeholder="E-mail de usuário" onChange={handleEmailInputChange} type="email-address" length={50}/>
              <Input placeholder="Senha" onChange={handlePasswordInputChange} type="default" length={50} />
              <View style={styles.loginButton}>
                { emailInput && password ? 
                <Button title="Login" alt={false} onPress={handleLogin}/> 
                :
                <Button title="Login" alt = {false} onPress={handleLogin}/>
                }
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
      alignItems: 'center',
      width: 285
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
      marginTop: 30,
      width: '100%',
      paddingHorizontal: 20  
  },
  RegisterButton: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20  
  },

})