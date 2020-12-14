import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export const Clima = ({ APIresponse }) => {

    const { name, main } = APIresponse

    if(APIresponse.cod == 404){
        return (
            <Text style={styles.cityNameText}>Ciudad no encontrada</Text>
        )
    }

    if(!name) return null

    const kelvin = 273.15

    return (
        <View style={styles.clima}>
            <View>
                <Text style={styles.cityNameText}>{name}</Text>
            </View>
            <View style={styles.weatherData}>
                <Text style={styles.temp}>{ parseInt(main.temp - kelvin) } &#x2103;</Text>
                <Image 
                    style={{ width: 100, height: 80 }}
                    source={{ uri: `http://openweathermap.org/img/w/${APIresponse.weather[0].icon}.png` }}
                />
                <View style={styles.subWeatherData}>
                    <Text style={styles.subWeatherDataText}>Min: { parseInt(main.temp_min - kelvin) } &#x2103;</Text>
                    <Text style={styles.subWeatherDataText}>Max: { parseInt(main.temp_max - kelvin) } &#x2103;</Text>
                    <Text style={styles.subWeatherDataText}>Humedad: { parseInt(main.humidity) } &#37;</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    clima: {
        marginTop: 10
    },
    cityNameText: {
        fontSize: 25,
        textAlign: 'center'
    },
    weatherData: {
        alignItems: 'center'
    },
    temp:{
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subWeatherData: {
        flexDirection: 'row'
    },
    subWeatherDataText: {
        fontSize: 15,
        marginHorizontal: 5
    }
})
