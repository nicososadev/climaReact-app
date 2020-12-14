import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Formulario } from './components/Formulario';
import { Clima } from './components/Clima';
import { Header } from './components/Header';

const initialInputs = {
    city: '',
    country: ''
}

const App = () => {

    const [inputs, setInputs] = useState(initialInputs)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [APIresponse, setAPIresponse] = useState({})
    
    const { city, country } = inputs

    useEffect(() => {
        const consultarClima = async (city, country) => {
            
            const appID = '0cd25c46bf6f7c647bfcc33a93c97742'
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`
            try {
                if(loaded){
                    let response = await fetch(url);
                    let response_json = await response.json();
                    setLoading(true)
                    setTimeout(() => {
                        setAPIresponse(response_json)
                        setLoading(false)
                        setLoaded(false)
                    }, 2500);
                }
            } catch (error) {
                console.error(error);
            }
        };
        consultarClima(city, country)
    }, [loaded])

    const hideKeyboard = () => {
        Keyboard.dismiss()
    }

    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View style={styles.landing}>
                <Header />

                <View style={styles.container}>
                    <Formulario 
                        inputs={inputs}
                        setInputs={setInputs}
                        setLoaded={setLoaded}
                        hideKeyboard={hideKeyboard}
                    />
                    {
                        loading
                        ? <ActivityIndicator size='large' color='#1777F0' style={{ marginTop: 100 }}/>
                        : <Clima APIresponse={APIresponse}/>
                    }
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    landing: {
        flex: 1,
        backgroundColor: '#8BBEFF',
    },
    container: {
        marginHorizontal: '2.5%'
    }
});

export default App;
