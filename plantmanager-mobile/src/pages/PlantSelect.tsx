import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { EnvironmentButton } from '../components/EnvironmentButton'
import { Header } from '../components/Header'
import { Load } from '../components/Loading'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { PlantProps } from '../libs/storage'
import { api } from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentProps{
    key: string,
    title: string
}

export function PlantSelect(){
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [activeEnvironment, setActiveEnvironment] = useState("all")
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(true)
    
    const navigation = useNavigation()

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate("PlantSave", {plant})
    }
    async function fetchPlants(){
        const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
        
        if(!data){
            return setLoading(false)
        }

        if(page > 1){
            setPlants(() => [...plants, ...data])
        } else {
            setPlants(data)
        }
        setLoading(false)
        setLoadingMore(false)
    }


    function handleFetchMore(distance: number){
        if(distance < 1) return

        setLoadingMore(true)
        setPage(prev => prev+=1) 
        fetchPlants()
    }

    useEffect(()=>{
        async function fetchEnvironments(){
            const {data} = await api.get("plants_environments?_sort=title&order=asc")
            
            setEnvironments([
                {
                    key: "all",
                    title: "Todos"
                },
                ...data
            ])
        }

        fetchEnvironments()
    }, [])

    useEffect(()=>{
        fetchPlants()
    }, [])

    useEffect(()=>{
        if(plants == [] || activeEnvironment == "") return

        if (activeEnvironment == 'all'){
            setFilteredPlants(plants)
        } else {
            setFilteredPlants(plants?.filter(plant=>(
                plant.environments.includes(activeEnvironment)
            )))
        }
        
    }, [plants, activeEnvironment])

    if(loading){
        return <Load />
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
            </View>

            <View>
                <FlatList 
                    data={environments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({item})=>(
                        <EnvironmentButton identifier={item.key} title={item.title} active={activeEnvironment == item.key} setActiveEnvironment={setActiveEnvironment} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            

            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardPrimary 
                            data={item}
                            onPress={()=>handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd )}
                    ListFooterComponent={
                        (loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>)
                    }
                />
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        backgroundColor: colors.background
    },
    wrapper: {
        padding: 30,
    },
    environmentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})