import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import colors from '../../styles/colors';

interface PlaceholderProps {
  placeholder: string;
  onChange: any;
  type: any;
}

export default function Input({ placeholder, onChange, type } : PlaceholderProps){
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
          (isFocused || isFilled) && { borderColor: colors.main }
      ]}
      placeholder={placeholder}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
      onChangeText={onChange}
      keyboardType={type}
      // maxLength={15}
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
    textAlign: 'center',
  },
})