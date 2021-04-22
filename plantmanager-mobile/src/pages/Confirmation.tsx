import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/core'

interface Params{
    name?: string,
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreen: string
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

export function Confirmation(){
    const route = useRoute()
    const {name, title, subtitle, buttonTitle, icon, nextScreen} = route.params as Params
    const [isSaved, setIsSaved] = useState(false)

    useEffect(()=>{
        if(!name) return
        async function saveName(){
            setIsSaved(false)
            try {
                await AsyncStorage.setItem('@plantmanager:user', name || '')
            } catch{
                Alert.alert("Erro! Tente novamente em alguns instantes")
            }
            setIsSaved(true)
        }

        saveName()
    }, [name])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button title={buttonTitle} to={nextScreen} disabled={!(name || isSaved)} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        padding: 20
    },
    emoji: {
        fontSize: 78 ,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: "center",
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
    footer: {
        width: "100%",
        paddingHorizontal: 50,
        marginTop: 20
    }
})