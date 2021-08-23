import React, { useState } from 'react';
import {  SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback,
    Keyboard, 
    CheckBox } from 'react-native';
import { Button } from '../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';

export function Preferences(){
    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);
    const [ name, setName ] = useState();
    const [ age, setAge ] = useState();

    const navigation = useNavigation();

    function handleSubmit(){
        navigation.navigate('UserIdentification');
    }
    
    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    // function handleAgeChange(value: string){
    //     setIsFilled(!!value);
    //     setName(value);
    // }

    // function handleTitleChange(value: string){
    //     setIsFilled(!!value);
    //     setName(value);
    // }

    // function handleGenderChange(value: string){
    //     setIsFilled(!!value);
    //     setName(value);
    // }

    // function handleTasteChange(value: string){
    //     setIsFilled(!!value);
    //     setName(value);
    // }
    
    const options = [
        'musica',
        'games',
        'esportes'
    ];
    
    const [esportes, setEsportes] = useState(false);
    const [musica, setMusica] = useState(false);
    const [list, setList] = React.useState([]);
    // const [games, setMusica] = useState(false);
    // const [tecnologia, setMusica] = useState(false);
    // const [atividadesF, setMusica] = useState(false);
    // const [arte, setMusica] = useState(false);
    // const [design, setMusica] = useState(false);

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
                                <View style={styles.checkboxContainer}>
                                  <CheckBox value={esportes}
                                      onValueChange={setEsportes}
                                      style={styles.checkbox}
                                      onPress={() => {
                                          setChecked(!checked);
                                          setList(list.concat(checked));
                                          console.log("list" + list);
                                        }}
                                      />
                                  <Text style={styles.label}>Esportes</Text>
                              </View>
                              <View style={styles.checkboxContainer}>
                                  <CheckBox value={musica}
                                      onValueChange={setMusica}
                                      style={styles.checkbox}
                                      />
                                  <Text style={styles.label}>Músicas</Text>
                              </View>
                              <View style={styles.checkboxContainer}>
                                  <CheckBox value={musica}
                                      onValueChange={setMusica}
                                      style={styles.checkbox}
                                      />
                                  <Text style={styles.label}>Games</Text>
                              </View>
                              
                            </View>
                            <View style={styles.footer}>
                                <Button title="Confirmar" onPress={handleSubmit}/>
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
    }
});