import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/ProfileImage.png'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadStorageUserName(){
      const user = await AsyncStorage.getItem('@mapping:user');
      setName(user || '');  
    }

    loadStorageUserName();
  }, []);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.gretting}>Olá,</Text>
                <Text style={styles.userName}>{name}</Text>
            </View>

            <Image source={userImg} style={styles.image}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    gretting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50
    }
})