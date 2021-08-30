import React, { useState } from 'react';
import {  SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback,
    Keyboard, 
    CheckBox } from 'react-native';
import { Button } from '../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';
import { Check } from '../components/Check';

export function Preferences(){
    const [esportes, setEsportes] = useState(false);
    const [musica, setMusica] = useState(false);
    const [game, setGame] = useState(false);
    const [arte, setArte] = useState(false);
    const [design, setDesign] = useState(false);
    const [ automobilismo, setAutomobilismo ] = useState(false);
    const [ name, setName ] = useState();

    const navigation = useNavigation();

    function handleSubmit(){
        navigation.navigate('UserIdentification');
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
                              <View style={styles.options}>
                                <Check value={esportes} setValueChange={setEsportes} text="Esporte"/>
                                <Check value={musica} setValueChange={setMusica} text="Musica"/>
                                <Check value={game} setValueChange={setGame} text="Games"/>
                                <Check value={arte} setValueChange={setArte} text="Arte"/>
                                <Check value={design} setValueChange={setDesign} text="Design"/>
                                <Check value={automobilismo} setValueChange={setAutomobilismo} text="Automobilismo"/>
                              </View>
                            
                            <View style={styles.footer}>
                                <Button title="Confirmar" alt={false} onPress={handleSubmit}/>
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