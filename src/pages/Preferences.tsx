import React, { useEffect, useState } from 'react';
import {  SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback,
    Keyboard, 
    } from 'react-native';
import { Button } from '../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';
import { Check } from '../components/Check';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import herokuApi from '../services/HerokuAPI';

interface PreferenceProps {

}

export function Preferences(){
  const [preference, setPreference] = useState([]);
  const [esportes, setEsportes] = useState(false);
  const [musica, setMusica] = useState(false);
  const [game, setGame] = useState(false);
  const [arte, setArte] = useState(false);
  const [design, setDesign] = useState(false);
  const [ automobilismo, setAutomobilismo ] = useState(false);

    const navigation = useNavigation();

    async function fetchPlaces() {
        // const { data } = await api.get(`places?_sort=name&_order=asc&_page=${page}&_limit=8`);
        const { data } = await herokuApi.get(`/preferences`);
        console.log('data:' + data)
        setPreference(data.preferencesInfo);

    }

    useEffect(() => {
        fetchPlaces();
    }, [])

    function handleSubmit(){
        navigation.navigate('Profession');
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
                  Para realizarmos { '\n'} algumas indicações, 
                  quais são seus gostos pessoais?  
                </Text>
              </View>

              {/* <View style={styles.options}>
                <FlatList 
                  data={preference}
                  renderItem={({ item }) => (
                    <Check value={item} setValue={setPreference} text={item}/>
                  )}
                  /> */}

              <Check value={esportes} setValue={setEsportes} text="Esporte" />
              <Check value={musica} setValue={setMusica} text="Musica"/>
              <Check value={game} setValue={setGame} text="Games"/>
              <Check value={arte} setValue={setArte} text="Arte"/>
              <Check value={design} setValue={setDesign} text="Design"/>
              <Check value={automobilismo} setValue={setAutomobilismo} text="Automobilismo"/>
            </View>
                  
            <View style={styles.footer}>
                <Button title="Confirmar" alt={false} onPress={handleSubmit}/>
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
        marginTop: 40,
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
        // justifyContent: 'space-around',
        marginLeft: 10,
        fontSize: 20
    },
    options: {
      alignItems: 'flex-start',
    },
});