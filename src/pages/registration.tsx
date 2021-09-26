import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker'
import { InputButton } from '../components/InputButton';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { Picker } from '@react-native-picker/picker';
import { setDate } from 'date-fns';

interface userData {
  email: string;
  senha: string;
  confirmarSenha: string;
  sexo: string;
  dataNascimento: string;
}

export const UserData = createContext({} as userData);

export function Registration(){
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ sexo, setSexo ] = useState('M');
  const [ showDate, setShowDate] = useState(false);
  const [ confirmarSenha, setConfirmarSenha ] = useState('');
  const [ dataNascimento, setdataNascimento ] = useState(format(new Date(), 'dd / MMM / Y', {
    locale: ptBR
  }))
  const [ newDate, setNewDate ] = useState('')
  const [ data, setData ] = useState(new Date())

  const navigation = useNavigation();

  function handleSubmit(){
    // if(!email){
    //   return Alert.alert('Precisamos que você preencha todos os dados 🙁')
    // }
    // console.log(email);
    if(senha !== confirmarSenha){
      return Alert.alert('Sua senha e senha de confirmação precisam ser iguais 😯')
    }
    else{
      navigation.navigate('Preferences');
    }
  }

  function showDatePicker(){
    setShowDate(!showDate);
  }

  return(
    <UserData.Provider value={{ email, senha, confirmarSenha, sexo, dataNascimento }}>
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
              <Input placeholder="E-mail" type="email-address" onChange={(value: string) => setEmail(value)}/>
              <Input placeholder="Senha" type="visible-password" onChange={(value: string) => setSenha(value)}/>
              <Input placeholder="Confirmar senha" type="visible-password" onChange={(value: string) => setConfirmarSenha(value)}/>
              <View style={styles.genderContainer}>
                <Picker style={{width: '70%', height: 50, color: colors.heading, marginTop: 50}}
                  selectedValue={sexo}
                  onValueChange={(item)=>{setSexo(item)}}
                >
                  <Picker.Item key={0} value="M" label="Sexo masculino"/>
                  <Picker.Item key={1} value="F" label="Sexo feminino"/>
                </Picker>
              </View>
              <InputButton
                title={"Data de nascimento: " + dataNascimento}
                onPress={showDatePicker}
                />
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={data}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(e, date) => {
                    setShowDate(!showDate);
                    if (date) {
                      const temp = date.toString();
                      setdataNascimento(temp.slice(8, 10) + '/' + temp.slice(4, 7) + '/' + temp.slice(11, 16))
                      setNewDate(date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
                    }
                 }}
                />
              )}

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
    </UserData.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  genderContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
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
})