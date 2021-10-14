import React, { useContext, useState } from 'react'
import { SafeAreaView, 
    StyleSheet, 
    View, 
    Text,  
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { Button } from '../components/Button';
import Input from '../components/Input';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import herokuApiSauce from '../services/HerokuAPISauce';
import { Data } from '../contexts/userDataContext';
import { CurrentUserData } from '../contexts/CurrentUserContext';
import { UserProps } from '../models/UserProps';
import jwt from 'jwt-decode';
import herokuApi from '../services/HerokuAPI';

export function UserIdentification(){
  let user: UserProps;
  const { setId, setEmail, setNewDate, setNome, setProfessionIdSelected, setSenha, setSexo, setConfirmarSenha } = useContext(CurrentUserData);
  const { email, senha, confirmarSenha, sexo, newDate, professionIdSelected, preferenceSelected } = useContext(Data);

  const [ name, setName ] = useState('');

  const navigation = useNavigation();

  async function handleSubmit(){
    if(!name){
      return Alert.alert('Me diz como chamar você 😥')
    }

    await AsyncStorage.setItem('@mapping:user', name);

    await herokuApi.post('/user/addUser', {
      nome: name,
      senha: senha,
      senha_confirma: confirmarSenha,
      email: email.toLowerCase(),
      data_nascimento: newDate,
      sexo: sexo,
      id_profissao: professionIdSelected,
      gostos_pessoais: preferenceSelected
    }).then(async response => {
      console.log(response)
      user = await jwt(response.data.userInfo.token);
      console.log(user);
      await AsyncStorage.setItem('@mapping:Token', response.data.userInfo.token);
      await AsyncStorage.setItem('@mapping:CurrentUserId', user.userData.id);
      await AsyncStorage.setItem('@mapping:user', user.userData.nome);
      setId(user.userData.id);
      setSenha(user.userData.senha);
      setConfirmarSenha(user.userData.senha);
      setEmail(user.userData.email);
      setNewDate(user.userData.data_nascimento);
      setSexo(user.userData.sexo);
      setNome(user.userData.nome);
      setProfessionIdSelected(user.userData.id_profissao)
    }).catch(e => console.log(e.data.message));
    
    navigation.navigate('Confirmation');
  }

  function handleInputChange(value: string){
    setName(value);
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
                              <Text style={styles.emoji}>
                                  😃
                              </Text>
                              <Text style={styles.title}>
                                  Como podemos {'\n'}
                                  chamar você?
                              </Text>
                          </View>

                          <Input placeholder="Nome de usuário" onChange={handleInputChange} type="email-address" length={15}/>
                          
                          <View style={styles.footer}>
                              {name ? <Button alt={false} title="Confirmar" onPress={handleSubmit}/> : <Button alt={false} title="Confirmar" disabled style={styles.buttonDisabled}/>}
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
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20  
    },
    buttonDisabled: {
      backgroundColor: colors.gray,
      height: 56,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }
});