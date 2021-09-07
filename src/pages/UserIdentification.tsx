import React, { useState } from 'react'
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
import herokuApi from '../services/HerokuAPI';
import herokuApiSauce from '../services/HerokuAPISauce';

export function UserIdentification(){
  const [ name, setName ] = useState('');

  const navigation = useNavigation();

  async function handleSubmit(){
    if(!name){
      return Alert.alert('Me diz como chamar você 😥')
    }

    await AsyncStorage.setItem('@mapping:user', name);

    await herokuApiSauce.post('/user/addUser', {
      nome: "Bryan",
      senha: "12345678",
      senha_confirma: "12345678",
      email: 'bryanvck@gmail.com',
      data_nascimento: '2000-01-01',
      sexo: 'M',
      id_profissao: "1",
      gostos_pessoais: [
        "1", "3", "4"
      ]
    }).then(response => console.log(response));

    // const data = await herokuApi.post('/user/addUser', {
    //   nome: "Bryan",
    //   senha: "12345678",
    //   senha_confirma: "12345678",
    //   email: 'bryanvck@gmail.com',
    //   data_nascimento: '2000-01-01',
    //   sexo: 'M',
    //   id_profissao: "1",
    //   gostos_pessoais: [
    //     "1", "3", "4"
    //   ]
    // })

    // console.log(data);
    
    //   await fetch('https://api-mapping.herokuapp.com/user/addUser', {
    //     method: 'post',
    //     mode: 'no-cors',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       nome: "Bryan",
    //       senha: "12345678",
    //       senha_confirma: "12345678",
    //       email: 'bryanvck@gmail.com',
    //       data_nascimento: '2000-01-01',
    //       sexo: 'M',
    //       id_profissão: "1",
    //       gostos_pessoais: [
    //         "1", "3", "4"
    //       ]
    //     })
    //   })
    // } catch(e) {
    //   console.log(e);
    // }
    
    navigation.navigate('PlaceSelect');
  // navigation.navigate('Confirmation');
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

                          <Input placeholder="Nome de usuário" onChange={handleInputChange} type="default"/>
                          
                          <View style={styles.footer}>
                              <Button alt={false} title="Confirmar" onPress={handleSubmit}/>
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
    }
});