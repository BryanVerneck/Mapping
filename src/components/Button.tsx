import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../../styles/colors';

import color from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    alt: boolean;
}

export function Button({ title, alt, ...rest } : ButtonProps){
  const [alternative, setAlternative] = useState(true);

  useEffect(() => {
    setAlternative(alt)
  , []})

  return(
    <>
      {!alternative ? (
      <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
          <Text style={styles.text}>
              { title }
          </Text>
      </TouchableOpacity> 
      ) : (
      <TouchableOpacity style={styles.alternativeContainer} activeOpacity={0.6} {...rest}>
        <Text style={styles.alternativeText}>
            { title }
        </Text>
      </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.main,
        height: 56,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alternativeContainer: {
      backgroundColor: color.white,
      borderWidth: 0.5,
      borderColor: color.main,
      height: 56,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    },
    alternativeText: {
        fontSize: 16,
        color: colors.main,
        fontFamily: fonts.heading
    }
})