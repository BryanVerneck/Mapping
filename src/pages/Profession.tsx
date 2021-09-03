import React, { useEffect, useState } from 'react';

import { View, Text, SafeAreaView, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import colors from '../../styles/colors';

import { useNavigation } from '@react-navigation/native';
import herokuApi from '../services/HerokuAPI';
import { ProfessionsCard } from '../components/professionsCard';
import { Button } from '../components/Button';
import fonts from '../../styles/fonts';
import { Load } from '../components/Load';

interface ProfessionProps {
  id: string
  descricao: string
}

export function Profession(){
    const [loading, setLoading] = useState(true);
    const [professions, setProfessions] = useState<ProfessionProps[]>([]);

    const [professionSelected, setProfessionSelected] = useState<ProfessionProps>();
    
    const navigation = useNavigation()

    async function fetchProfessions() {
      // const { data } = await api.get(`places?_sort=name&_order=asc&_page=${page}&_limit=8`);
      const { data } = await herokuApi.get(`/professions`);

      if(data.professionsInfo){
        setLoading(false);
      }
      
      setProfessions(data.professionsInfo);
      
    }

    function handleSubmit(){
      navigation.navigate('UserIdentification');
    }

    function changeProfession(item: ProfessionProps){
      setProfessionSelected(item);
    }

    useEffect(() => {
        fetchProfessions();
    }, [])

    if(loading){
      return <Load />
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
                    <ProfessionsCard data={item} onPress={() => changeProfession(item)}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}   
                    onEndReachedThreshold={0.1}                          
                  />
              </View>
              
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
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40
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
    paddingHorizontal: 20  
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
    marginTop: 20
  },
});