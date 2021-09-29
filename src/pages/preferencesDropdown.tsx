import React, { useEffect, useState } from 'react';
import {  SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView, 
    } from 'react-native';
import { Button } from '../components/Button';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';
import { Check } from '../components/Check';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import herokuApi from '../services/HerokuAPI';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';

export const data = [
  {
    value: '1',
    label: 'Tiger Nixon',
    employee_salary: '320800',
    employee_age: '61',
  },
  {
    value: '2',
    label: 'Garrett Winters',
    employee_salary: '170750',
    employee_age: '63',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '3',
    label: 'Ashton Cox',
    employee_salary: '86000',
    employee_age: '66',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '4',
    label: 'Cedric Kelly',
    employee_salary: '433060',
    employee_age: '22',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '5',
    label: 'Tiger Nixon',
    employee_salary: '320800',
    employee_age: '61',
  },
  {
    value: '6',
    label: 'Garrett Winters',
    employee_salary: '170750',
    employee_age: '63',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '7',
    label: 'Ashton Cox',
    employee_salary: '86000',
    employee_age: '66',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '8',
    label: 'Cedric Kelly',
    employee_salary: '433060',
    employee_age: '22',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '5',
    label: 'Tiger Nixon',
    employee_salary: '320800',
    employee_age: '61',
  },
  {
    value: '6',
    label: 'Garrett Winters',
    employee_salary: '170750',
    employee_age: '63',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '7',
    label: 'Ashton Cox',
    employee_salary: '86000',
    employee_age: '66',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '8',
    label: 'Cedric Kelly',
    employee_salary: '433060',
    employee_age: '22',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  }
];

export const groupData = [
  {
    title: 'Apple',
    data: [
      {
        value: '233',
        label: 'iPhone SE(2020)',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '242',
        label: 'iPhone 11',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '24w',
        label: 'iPhone 12',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '99',
        label: 'iPhone 12 Mini',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
    ],
  },
  {
    title: 'Google',
    data: [
      {
        value: '19',
        label: 'Pixel 3a',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '20',
        label: 'Pixel 3',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '21',
        label: 'Pixel 3 xl',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '16',
        label: 'Pixel 4',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '17',
        label: 'Pixel 4a',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '18',
        label: 'Pixel 5',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
    ],
  },
];

export function Preferences(){
  const [preference, setPreference] = useState([]);
  const [valueMS, setValueMS] = useState<string[]>([]);
  const [valueSS, setValueSS] = useState('');
  const [valueGS, setValueGS] = useState('');

  const onChangeMS = (value: string[]) => {
    setValueMS(value);
  };

  const navigation = useNavigation();

    async function fetchPlaces() {
        // const { data } = await api.get(`places?_sort=name&_order=asc&_page=${page}&_limit=8`);
        const { data } = await herokuApi.get(`/preferences`);
        console.log('data:' + data)
        setPreference(data.preferencesInfo);

    }

    useEffect(() => {
        fetchPlaces();
    }, [])

    function handleSubmit(){
        navigation.navigate('Profession');
    }

    return(
      <View
      style={{
        flexDirection: 'column',
        height: '100%',
        backgroundColor: colors.white
        
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <MultiselectDropdown
            label="Restaurantes"
            data={data}
            value={valueMS}
            onChange={onChangeMS}
            primaryColor={colors.main}
            textInputPlaceholder="teste"
            helperText="teste"
            textInputPlaceholderColor={colors.white}
            emptyListText="Lista vazia :("
            emptySelectionText="O que você gosta em restaurantes?"
            selectedItemsText="Preferências selecionadas"
          />
        </View>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    color: colors.white,
    backgroundColor: colors.white
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});