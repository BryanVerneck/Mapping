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

export function UserIdentification(){
  const [ name, setName ] = useState('');

  const navigation = useNavigation();

  async function handleSubmit(){
    if(!name){
      return Alert.alert('Me diz como chamar você 😥')
    }

    await AsyncStorage.setItem('@mapping:user', name);
    
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

                          <Input placeholder="Nome de usuário" onChange={handleInputChange}/>
                          
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