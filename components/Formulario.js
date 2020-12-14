import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Animated, TouchableWithoutFeedback, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';

export const Formulario = ({ inputs, setInputs, setLoaded, hideKeyboard }) => {

    const { city, country } = inputs
    const [ bottonAnimation ] = useState(new Animated.Value(1))

    const inputsValidation = () => {
        if( city.trim() === '' || country.trim() === '' ){
            showAlert('Ingresa una ciudad y selecciona un pais')
            return
        }
        hideKeyboard()
        setLoaded(true)
    }

    const showAlert = (message) => {
        Alert.alert(
            'Error',
            message,
            [{ text: 'OK'}]
        )
    }

    const onPressInAnimation = () => {
        Animated.spring( bottonAnimation, {
            useNativeDriver: false,
            toValue: .95,
            tension: 100
        }).start()
    }

    const onPressOutAnimation = () => {
        Animated.spring( bottonAnimation, {
            useNativeDriver: false,
            toValue: 1,
            tension: 100
        }).start()
    }

    const AnimationStyle = {
        transform: [{ scale: bottonAnimation }]
    }

    return (
        <View style={styles.form}>

            <View>
                <TextInput
                    value={city}
                    onChangeText={ city => setInputs({ ...inputs, city }) }
                    style={styles.input}
                    placeholder='Ciudad'
                />
            </View>

            <View>
                <Picker
                    selectedValue={country}
                    onValueChange={ country => setInputs({ ...inputs, country }) }
                    style={styles.countryPicker}
                    itemStyle={styles.countryPickerItem}
                >
                    <Picker.Item label='-- Selecciona un país --' value=''/>
                    <Picker.Item label='Estados Unidos' value='US'/>
                    <Picker.Item label='España' value='ES'/>
                    <Picker.Item label='Argentina' value='AR'/>
                    <Picker.Item label='México' value='MX'/>
                    <Picker.Item label='Colombia' value='CO'/>
                    <Picker.Item label='Perú' value='PE'/>
                </Picker>
            </View>

            <TouchableWithoutFeedback
                onPress={inputsValidation}
                onPressIn={onPressInAnimation}
                onPressOut={onPressOutAnimation}
            >
                <Animated.View style={[styles.button, AnimationStyle]}>
                    <Text style={styles.buttonText}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 10,
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center'
    },
    countryPicker: {
        backgroundColor: '#FFF'
    },
    countryPickerItem: {
        
    },
    button: {
        marginVertical: 20
    },
    buttonText: {
        backgroundColor: '#1777F0',
        textAlign: 'center',
        paddingVertical: 7,
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    }
})