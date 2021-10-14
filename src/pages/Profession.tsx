import React, { useContext, useEffect, useState } from 'react';

import { View, Text, SafeAreaView, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import colors from '../../styles/colors';

import { useNavigation } from '@react-navigation/native';
import herokuApi from '../services/HerokuAPI';
import { ProfessionsCard } from '../components/professionsCard';
import { Button } from '../components/Button';
import fonts from '../../styles/fonts';
import { Load } from '../components/Load';
import { Data } from '../contexts/userDataContext';

interface ProfessionProps {
  id: string
  descricao: string
}

export function Profession(){
    const { professionIdSelected, setProfessionIdSelected } = useContext(Data);
    const [loading, setLoading] = useState(true);
    const [professions, setProfessions] = useState<ProfessionProps[]>([]);
    const [professionSelected, setProfessionSelected] = useState('');
    
    const navigation = useNavigation()

    async function fetchProfessions() {
      const { data } = await herokuApi.get(`/professions`);

      if(data.professionsInfo){
        setLoading(false);
      }
      
      setProfessions(data.professionsInfo);
      
    }

    function handleSubmit(){
      navigation.navigate('UserIdentification');
    }

    function professionSelect(item: ProfessionProps){
      setProfessionSelected(item);
    }

    useEffect(() => {
        fetchProfessions();
    }, [])

    if(loading){
      return <Load />
    }

    function handleProfessionSelected(item: ProfessionProps){
      professionSelect(item)
      setProfessionIdSelected(item.id)
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
                    Com qual dessas áreas você mais se identifica?
                </Text>
              </View>
              <View style={styles.list}>
                <FlatList 
                data={professions}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <ProfessionsCard data={item} onPress={() => handleProfessionSelected(item)} style={ 
                      professionIdSelected === item.id ? styles.professionSelected : styles.professionsContainer } />
                  )}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}   
                    onEndReachedThreshold={0.1}                          
                  />
              </View>
              
              <View style={styles.footer}>
                {professionSelected ? <Button alt={false} title="Confirmar" onPress={handleSubmit}/> : <Button alt={false} title="Confirmar" onPress={handleSubmit} disabled style={styles.buttonDisabled}/>}
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
    justifyContent: 'center',
    marginVertical: 40
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
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center', 
    color: colors.heading,
    fontFamily: fonts.heading,
    marginVertical: 20,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20  
  },
  checkbox: {
      alignSelf: "center",
  },
  checkboxContainer: {
      flexDirection: "row",
  },
  label: {
      marginLeft: 10,
      fontSize: 20
  },
  options: {
    alignItems: 'flex-start',
  },
  list: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    marginTop: 20,
  },
  professionsContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    backgroundColor: colors.shape,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1
  },
  professionSelected: {
    flexDirection: 'row',
    maxWidth: '100%',
    backgroundColor: colors.main,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
  },
  buttonDisabled: {
    backgroundColor: colors.gray,
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});