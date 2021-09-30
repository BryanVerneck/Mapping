// import React, { useEffect, useState } from 'react';
// import {  
//     StyleSheet, 
//     View, 
//     ScrollView, 
//     } from 'react-native';
// import { Button } from '../components/Button';
// import colors from '../../styles/colors';
// import { useNavigation } from '@react-navigation/core';
// import fonts from '../../styles/fonts';
// import herokuApi from '../services/HerokuAPI';
// import {
//   MultiselectDropdown,
// } from 'sharingan-rn-modal-dropdown';

// export function Preferences(){
//   const [preference, setPreference] = useState([]);
//   const [valueMS, setValueMS] = useState<string[]>([]);
//   const [valueSS, setValueSS] = useState('');
//   const [valueGS, setValueGS] = useState('');

//   const onChangeMS = (value: string[]) => {
//     setValueMS(value);
//   };

//   const navigation = useNavigation();

//     async function fetchPlaces() {
//         // const { data } = await api.get(`places?_sort=name&_order=asc&_page=${page}&_limit=8`);
//         const { data } = await herokuApi.get(`/preferences`);
//         console.log('data:' + data)
//         setPreference(data.preferencesInfo);

//     }

//     useEffect(() => {
//         fetchPlaces();
//     }, [])

//     function handleSubmit(){
//         navigation.navigate('Profession');
//     }

//     return(
//       <View
//       style={{
//         flexDirection: 'column',
//         height: '100%',
//         backgroundColor: colors.white
        
//       }}
//     >
//       <ScrollView>
//         <View style={styles.container}>
//           <MultiselectDropdown
//             label="Restaurantes"
//             data={data}
//             value={valueMS}
//             onChange={onChangeMS}
//             primaryColor={colors.main}
//             textInputPlaceholder="teste"
//             helperText="teste"
//             textInputPlaceholderColor={colors.white}
//             emptyListText="Lista vazia :("
//             emptySelectionText="O que você gosta em restaurantes?"
//             selectedItemsText="Preferências selecionadas"
//           />
//         </View>
//       </ScrollView>
//     </View>
//     )
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 30,
//     marginLeft: 20,
//     marginRight: 20,
//     flex: 1,
//     color: colors.white,
//     backgroundColor: colors.white
//   },
//   buttonView: {
//     display: 'flex',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 10,
//   },
// });