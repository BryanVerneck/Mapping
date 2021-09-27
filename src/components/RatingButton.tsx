import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function RatingButton({ title, ...rest } : ButtonProps){

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
        backgroundColor: colors.main,
        height: 56,
        borderTopEndRadius: 100,
        borderTopStartRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }
})