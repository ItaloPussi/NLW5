import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TextInput, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification(){
    const [name, setName] = useState<string>("")
    const [isFocused, setIsFocused] = useState(false)
    
    function handleInputBlur(){
        setIsFocused(false)
    }

    function handleInputFocus(){
        setIsFocused(true)
    }

    const confirmationScreenParams = {
        title: "Prontinho",
        subtitle: "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
        icon: "smile",
        buttonTitle: "Começar",
        nextScreen: "PlantSelect"
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}>
                                {
                                    name.length >= 3 ? "😃" : "😄"
                                }              
                                
                            </Text>

                            <Text style={styles.title}>
                                Como podemos {"\n"}
                                chamar você?
                            </Text>

                            <TextInput
                                value={name}
                                onChangeText={setName}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                style={[
                                    styles.input,
                                    (isFocused || name.length >= 3) && { borderColor: colors.green}
                                ]}
                                placeholder="Digite um nome"
                            />

                            <View style={styles.footer}>
                                <Button to="Confirmation" title="Confirmar" params={{...confirmationScreenParams, name}} disabled={!(name.length >= 3)} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "space-around"
    },
    content: {
        flex: 1,
        width: "100%",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 54,
        alignItems: "center",
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        marginTop: 40,
        width: "100%",
        paddingHorizontal: 20
    }
})