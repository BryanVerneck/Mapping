import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface RateProps extends RectButtonProps {
  options: {
    text: string
  }
}

export function RatingCard ( {options, ...rest}: RateProps) {
    
  return(
    <RectButton {...rest}>
      <Text style={styles.text}>
        {options.text}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 200,
    backgroundColor: colors.shape,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 5,
    marginLeft: 10
  },
  image: {
    width: 20,
    height: 20,
    marginTop: 5
  }
})
