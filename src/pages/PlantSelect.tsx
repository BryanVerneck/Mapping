import React, { useEffect, useState } from 'react';

import { View, Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { Load } from '../components/Load';
import { Header } from '../components/Header';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import api from '../services/api';
import mapsApi from '../services/mapsApi';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

interface TypeProps {
    key: string;
    title: string;
}

interface PlaceProps {
    place_id: string;
    name: string;
    about: string;
    icon: string;
    photo_reference: string;
    
}

export function PlantSelect(){
    const [enviroments, setEnviroments] = useState<TypeProps[]>([]);
    const [plants, setPlants] = useState<PlaceProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlaceProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    function handleEnvironmentSelected(environment: string){
        // setEnvironmentSelected(environment);

        // if(environment == 'all')
        //     return setFilteredPlants(plants);
        
        // const filtered = plants.filter(plant => 
        //     plant.environments.includes(environment)
        // );

        // setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        // const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        const { data } = await mapsApi.get(``);
        console.log("--------------------")
        console.log(data.results)

        if(!data.results)
            return setLoading(true);
        if(page > 1){
            // setPlants(oldValue => [...oldValue, ...data.results])
            // setFilteredPlants(oldValue => [...oldValue, ... data.results])
        }else{
            setPlants(data.results);
            setFilteredPlants(data.results);
        }
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get(
                'plants_environments?_sort=title&_order=asc'
            );
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos' 
                },
                ...data
            ]);
        }
        
        fetchEnviroment();

    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])

    if(loading){
        return <Load />
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>

                <Text style={styles.title}>
                    Que tipo de local
                </Text>
                <Text style={styles.subtitle}>
                    você deseja visitar?
                </Text>
            </View>

            <View>
               <FlatList 
                data={enviroments}
                keyExtractor={(item) => String(item.key)}
                renderItem={({ item }) => (
                    <EnviromentButton 
                        title={item.title}
                        active={item.key === environmentSelected}
                        onPress={() => handleEnvironmentSelected(item.key)}
                        
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}
               />
           </View>
                    
            <View style={styles.plants}>
            <FlatList 
                data={filteredPlants}
                keyExtractor={(item) => String(item.place_id)}
                renderItem={({ item }) => (
                    <PlantCardPrimary 
                        data={item} 
                        // onPress={() => handlePlantSelect(item)}
                    />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}   
                    onEndReachedThreshold={0.1}                          
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore 
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                   />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: colors.background
    },
    header:{
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 5
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 30,
        paddingRight: 60,
        marginVertical: 15,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    }
});