import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

type Values = {
  value: boolean,
  setValue: any,
  text: string
}

export function Check({value, setValue, text}: Values){
  return(
    <View style={styles.container}>
      <CheckBox value={value}
          onValueChange={(newValue) => setValue(newValue)}
          style={styles.checkbox}
          tintColors={{ true: colors.main, false: colors.black}}
          />
        <View style={styles.preferences}>
          <Text style={styles.label}>{text}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    marginTop: 5
  },
  container: {
    flexDirection: 'row',
    maxWidth: '100%',
    backgroundColor: colors.shape,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    margin: 5
  },
  label: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 5,
    marginLeft: 10
  },
  preferences: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  }
})