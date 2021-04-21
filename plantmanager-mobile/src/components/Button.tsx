import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
    title: string;   
    to: string; 
}

export function Button({title, to, ...rest} : ButtonProps){
    
    const navigation = useNavigation()

    function handleNavigation(){
        navigation.navigate(to)
    }
    return (
        <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleNavigation}
            {...rest}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height: 56,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    },
})