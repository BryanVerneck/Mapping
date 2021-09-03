import React, { useState } from  'react';

import { StyleSheet, Text } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ProfessionProps extends RectButtonProps {
    data: { 
      id: string
      descricao: string
    }
} 

// https://maps.googleapis.com/maps/api/place/photo?maxwidth=960&photoreference="+ photoRef +"&key=AIzaSyBp0cy7ti0z5MJMAwWiPMNvbJobmWYGyv4' alt=''

export const ProfessionsCard = ({ data, ...rest} : ProfessionProps) => {
  const [ check, setCheck ] = useState(false);
  
  function handleProfessionSelect(){
    setCheck(!check);
  }

  return(
      <RectButton style={[
        styles.container, (check) && { backgroundColor: colors.main, }]} {...rest} onPress={() => handleProfessionSelect()}>
          <Text style={styles.text}>
              {data.descricao}
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
    margin: 5,
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
