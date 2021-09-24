import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../../styles/colors';

import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function InputButton({ title, ...rest } : ButtonProps){

  return(
    <>
      <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
          <Text style={styles.text}>
              { title }
          </Text>
      </TouchableOpacity> 
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 56,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: colors.gray,
      width: '100%',
      fontSize: 18,
      marginTop: 50,
      padding: 10,
      textAlign: 'center'
    },
    text: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.complement
    },
})