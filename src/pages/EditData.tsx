import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker'
import { InputButton } from '../components/InputButton';
import { Picker } from '@react-native-picker/picker';
import herokuApiSauce from '../services/HerokuAPISauce';
import { CurrentUserData } from '../contexts/CurrentUserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function EditData(){
  const { id, email, senha, confirmarSenha, sexo, newDate, preferenceSelected, professionIdSelected, nome, 
    setEmail, setSenha, setConfirmarSenha, setSexo, setNewDate, setNome } = useContext(CurrentUserData);
  let emailInput = email;
  let senhaInput = senha;
  let confirmaSenhaInput = confirmarSenha;
  let sexoInput = sexo;
  const [ showDate, setShowDate] = useState(false);
  const [ data, setData ] = useState(new Date())
  const [ token, setToken ] = useState('')
  let mounth = data.getMonth() + 1;

  useEffect(() => {
    async function loadStorageToken(){
      const tkn = await AsyncStorage.getItem('@mapping:Token');
      setToken(tkn || '');  
    }
    loadStorageToken();
  }, [])

  async function handleSubmit(){
    if(senhaInput != confirmaSenhaInput){
      return Alert.alert('Senha e confirmar senha devem ser iguais')
    }
    await herokuApiSauce.post(`/user/updateUser/${id}`, {
      senha: senhaInput,
      senha_confirma: confirmaSenhaInput,
      email: emailInput.toLowerCase(),
      sexo: sexoInput,
      id_profissao: professionIdSelected,
    },
    {
      headers: {
        Authorization: token
      }
    }).then(response => {
        console.log(response)
        setEmail(emailInput);
        if(response.status == 200){
          Alert.alert('Dados alterados com sucesso :)')
        }
    }).catch(() => Alert.alert("Ocorreu um erro :("));
  }

  useEffect(()=> {
    setNewDate(data.getFullYear() + '-' + mounth.toString().padStart(2, '0') + '-' + data.getDate().toString().padStart(2, '0'));
  }, [])

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
                    Editar
                </Text>
              </View>
              
              <Input placeholder="E-mail" type="email-address" defaultValue={email} onChange={(value: string) => emailInput = value}/>
              <Input placeholder="Senha" type="default" onChange={(value: string) => senhaInput = value}/>
              <Input placeholder="Confirmar senha" type="default" onChange={(value: string) => confirmaSenhaInput = value}/>
              <View style={styles.genderContainer}>
                <Picker style={{width: '70%', height: 50, color: colors.heading, marginTop: 50}}
                  selectedValue={sexo}
                  onValueChange={(item)=>{setSexo(item), sexoInput = item}}
                >
                  <Picker.Item key={0} value="M" label="Sexo masculino"/>
                  <Picker.Item key={1} value="F" label="Sexo feminino"/>
                  <Picker.Item key={2} value="Outros" label="Outros" style={{textAlign: 'center', backgroundColor: 'black'}}/>
                </Picker>
              </View>
              {/* <InputButton
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
                      mounth = data.getMonth() + 1;
                      setNewDate(date.getFullYear() + '-' + mounth.toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
                    }
                 }}
                />
              )} */}

              <View style={styles.loginButton}>
                <Button title="Confirmar" alt = {false} onPress={handleSubmit}/> 
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
buttonDisabled: {
  backgroundColor: colors.gray,
  height: 56,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center'
}
})