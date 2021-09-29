import React, { useState } from  'react';

import { StyleSheet, Text } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PreferencesProps extends RectButtonProps {
    data: { 
      id: string
      descricao: string
      id_categoria: string
    }
} 

export const PreferencesCard = ({ data, ...rest} : PreferencesProps) => {

  return(
      <RectButton {...rest}>
          <Text style={styles.text}>
              {data.descricao}
          </Text>
      </RectButton>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 5,
    marginLeft: 10,
    textAlign: 'center'
  },
  image: {
    width: 20,
    height: 20,
    marginTop: 5
  }
})
