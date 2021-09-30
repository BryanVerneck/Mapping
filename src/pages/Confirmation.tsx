import React from 'react';
import { SafeAreaView, View, StyleSheet, Text} from 'react-native';

import { Button } from '../components/Button';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';

export function Confirmation(){
    const navigation = useNavigation();

    function handleMoveOn(){
        navigation.navigate('PlaceSelect');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😁
                </Text>

                <Text style={styles.title}>
                    Tudo certo!
                </Text>

                <Text style={styles.subtitle}>
                    Agora vamos começar a conhecer { '\n'} 
                    melhor a sua região.
                </Text>

                <View style={styles.footer}>
                    <Button title="Começar" onPress={handleMoveOn} alt={false}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 20,
        color: colors.heading
    },
    emoji: {
        fontSize: 70,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 75,
        marginTop: 20
    }


})