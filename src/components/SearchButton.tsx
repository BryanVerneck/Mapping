import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View } from 'react-native';

import colors from '../../styles/colors';

import color from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    alt: boolean;
}

export function SearchButton({ title, ...rest } : ButtonProps){

  return(
    <View style={styles.containerT}>
      <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
          <Text style={styles.text}>
              { title }
          </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.main,
    height: 56,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerT: {
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  },
})