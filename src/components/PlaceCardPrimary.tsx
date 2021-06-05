import React from  'react';

import { StyleSheet, Text, Image } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PlaceProps extends RectButtonProps {
    data: {
        name: string;
        icon: string;
        place_id: string;
        
    }
} 

export const PlaceCardPrimary = ({ data, ...rest} : PlaceProps) => {
    return(
        <RectButton style={styles.container} {...rest}>
            
            <Image style={styles.image} source={{ uri: data.icon }} />
    
            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
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
