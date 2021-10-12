import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
} 

export function EnviromentButton({
    title,
    active = false,
    ...rest
}: EnviromentButtonProps){
    return(
      <RectButton 
        {...rest}>
        <View style={[
            styles.container,
            active && styles.containerActive
            ]}>
          <Text 
              style={[
                  styles.text,
                  active && styles.textActive
                  ]}>
              { title }
          </Text>
        </View>
      </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: colors.shape
    },
    containerActive: {
        backgroundColor: colors.green_light,
        borderWidth: 0
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textActive: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})