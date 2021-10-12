import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import colors from '../../styles/colors';

interface PlaceholderProps extends TextInput {
  placeholder: string;
  onChange: any;
  type: any;
  length: number;
  defaultValue: any;
}

export default function Input({ placeholder, onChange, type, length, defaultValue } : PlaceholderProps){
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
      maxLength={length}
      defaultValue={defaultValue}
      // secureTextEntry={true}
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