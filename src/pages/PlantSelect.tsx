import React, { useEffect, useState } from 'react';

import { View, Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { Load } from '../components/Load';
import { Header } from '../components/Header';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

interface EnviromentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    }
}

export function PlantSelect(){
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    function handleEnvironmentSelected(environment: string){
        setEnvironmentSelected(environment);

        if(environment == 'all')
            return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    }

    async function fetchPlants(){
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);        

        if(!data)
            return setLoading(true);

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else {
            setPlants(data);
            setFilteredPlants(data);
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
        async function fetchPlants() {
            const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
            
            if(!data)
                return setLoading(true);

            if(page > 1){
                setPlants(oldValue => [...oldValue, ...data])
                setFilteredPlants(oldValue => [...oldValue, ... data])
            }else{
                setPlants(data);
                setFilteredPlants(data);
            }
            setLoading(false);
            setLoadingMore(false);
        }
        
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
                keyExtractor={(item) => String(item.id)}
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
        marginVertical: 30,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    }
});