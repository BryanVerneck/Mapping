import React, { useContext, useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  LogBox,
  Alert, 
  } from 'react-native';
import { Button } from '../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import herokuApi from '../services/HerokuAPI';
import { PreferencesCard } from '../components/PreferencesCard';
import { Load } from '../components/Load';
import { Data } from '../contexts/userDataContext';
import { CurrentUserData } from '../contexts/CurrentUserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import herokuApiSauce from '../services/HerokuAPISauce';

interface PreferenceProps {
  id: string;
  descricao: string;
  id_categoria: string;
}

export function EditPreferences(){
  const { id, preferenceSelected, setPreferenceSelected } = useContext(CurrentUserData);
  const [preference, setPreference] = useState([]);
  const [ token, setToken ] = useState('')
  const [loading, setLoading] = useState(true);
  const [filter1, setFilter1] = useState([]);
  const [filter2, setFilter2] = useState([]);
  const [filter3, setFilter3] = useState([]);

  useEffect(() => {
    async function loadStorageToken(){
      const tkn = await AsyncStorage.getItem('@mapping:Token');
      setToken(tkn || '');  
    }
    loadStorageToken();
  }, [])
  
  useEffect(() => {
    setPreferenceSelected(preferenceSelected.splice(1, preferenceSelected.length));
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  useEffect(() => {
    if(token){
      fetchPlaces();
      // getUserPreferences();
    }
  }, [token])

  useEffect(() => {
    console.log("TESTE")
    console.log(preferenceSelected);
  }, [preferenceSelected])

  async function fetchPlaces() {
    const { data } = await herokuApi.get(`/preferences`);
    if(!data.preferencesInfo)
          return setLoading(true);
    setLoading(false);
    setPreference(data.preferencesInfo);
  }

  // async function getUserPreferences() {
  //   if(token){
  //     await herokuApi.get(`/user/preferences/${id}`, 
  //     {
  //       headers: {
  //         Authorization: token
  //       },
  //     }).then(res => test = res.data.userPreference.id)
  //     .catch(error => error.message);
  //     setPreferenceSelected(test);
  //   }
  // }

  useEffect(() => {
    const cat1 = preference.filter((item: PreferenceProps) => item.id_categoria === "1")
    setFilter1(cat1);
    const cat2 = preference.filter((item: PreferenceProps) => item.id_categoria === "2")
    setFilter2(cat2);
    const cat3 = preference.filter((item: PreferenceProps) => item.id_categoria === "3")
    setFilter3(cat3);
  }, [preference])

  async function handleSubmit(){

    console.log("Teste")
    console.log(preferenceSelected)

    await herokuApi.post(`user/updateUserPreferences/${id}`, {
      gostos_pessoais: preferenceSelected
    },
    {
      headers: {
        Authorization: token
      }
    }).then(res => {
      console.log(res.data);
      Alert.alert("Preferências atualizadas com sucesso!");
    })
    
    // navigation.navigate('Profession');
  }

  function handlePreferenceSelected(item: string){
    if(preferenceSelected.includes(item) === true){
      setPreferenceSelected(preferenceSelected.filter(value => value !== item))
    }
    else{
      setPreferenceSelected([...preferenceSelected, item]);
    }
  }

  if(loading){
    return <Load />
  }

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Editar preferências
            </Text>
          </View>
          <ScrollView style={{flex: 1, width: '100%'}}>
            <View style={styles.list}>
              <View style={{marginVertical: 10}}>
                <Text style={styles.category}>Gostos Gerais</Text>
              </View>              
              <FlatList
                data={filter1}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.6}>
                    <PreferencesCard data={item} onPress={() => handlePreferenceSelected(item.id)} 
                      style={preferenceSelected.includes(item.id) ? styles.cardSelected : styles.card}/>
                  </TouchableOpacity>
                  )}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}   
                    onEndReachedThreshold={0.1}                          
                  />
              <View style={{marginVertical: 10}}>
                <Text style={styles.category}>Restaurantes</Text>
              </View>
              <FlatList
                data={filter2}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.6}>
                    <PreferencesCard data={item} onPress={() => handlePreferenceSelected(item.id)} 
                      style={preferenceSelected.includes(item.id) ? styles.cardSelected : styles.card}/>
                  </TouchableOpacity>
                  )}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}   
                    onEndReachedThreshold={0.1}                          
                  />
              <View style={{marginVertical: 10}}>
                <Text style={styles.category}>Gêneros musicais</Text>
              </View>
              <FlatList
                data={filter3}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.6}>
                  <PreferencesCard data={item} onPress={() => handlePreferenceSelected(item.id)} 
                    style={preferenceSelected.includes(item.id) ? styles.cardSelected : styles.card}/>
                  </TouchableOpacity>
                  )}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}   
                    onEndReachedThreshold={0.1}                          
                  />
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button alt={false} title="Confirmar" onPress={handleSubmit}/>
          </View>
        </View>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50
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
  category: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center', 
    color: colors.main,
    fontFamily: fonts.heading,
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
    width: '100%'
  },
  card: {
    flexDirection: 'row',
    maxWidth: '100%',
    backgroundColor: colors.shape,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1
  },
  cardSelected: {
    flexDirection: 'row',
    maxWidth: '100%',
    backgroundColor: colors.main,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1
  }
});