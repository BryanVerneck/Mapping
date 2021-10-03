import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/ProfileImage.png'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Header(){
  const [name, setName] = useState('');

  const navigation = useNavigation()

  useEffect(() => {
    async function loadStorageUserName(){
      const user = await AsyncStorage.getItem('@mapping:user');
      setName(user || '');  
    }

    loadStorageUserName();
  }, []);

  function handleEditData(){
    navigation.navigate('Configuration');
  }

  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.gretting}>Olá,</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>

      {/* <Image source={userImg} style={styles.image}/> */}
      
      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={handleEditData}>
        <Text>
          <AntDesign name="setting" size={25} color="black" />
        </Text>
      </TouchableOpacity>
      
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
        fontSize: 28,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 28,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      borderRadius: 10,
      marginBottom: 10,
      height: 50,
      width: 60,
    }
})