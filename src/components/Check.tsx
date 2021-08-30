import React from 'react'
import { View, CheckBox, Text, StyleSheet } from 'react-native';

type Values = {
  value: boolean,
  setValueChange: any,
  text: string
}

export function Check({value, setValueChange, text}: Values){
  return(
    <View style={styles.checkboxContainer}>
      <CheckBox value={value}
          onValueChange={setValueChange}
          style={styles.checkbox}
          />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{text}</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
  checkboxContainer: {
      flexDirection: "row",
      marginBottom: 5,
      marginHorizontal: 40
  },
  label: {
    marginLeft: 20,
    fontSize: 22,
  },
  labelContainer: {
    margin: 0,
    padding: 0,
    flex: 1,
    alignItems: "flex-start"
  }
})