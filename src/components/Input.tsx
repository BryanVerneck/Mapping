import React, { useRef, useEffect, useCallback, useState } from 'react'
import { TextInput, TextInputProps, Text, StyleSheet } from 'react-native'
import colors from '../../styles/colors';
import { useField } from '@unform/core'

interface PlaceholderProps {
  placeholder: string;
}

export default function Input({ placeholder } : PlaceholderProps){
  const [ isFocused, setIsFocused ] = useState(false);
  const [ isFilled, setIsFilled ] = useState(false);
  const [ name, setName ] = useState<string>();
  
  function handleInputBlur(){
  setIsFocused(false);
  setIsFilled(!!name);
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  }

  return(
    <TextInput
      style={[
          styles.input,
          (isFocused || isFilled) && { borderColor: colors.green }
      ]}
      placeholder={placeholder}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
      onChangeText={handleInputChange}
      keyboardType="default"
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
})