import React from 'react'
import { Text, StyleSheet, Platform} from 'react-native'

export const Header = () => {
    
    return (
        <Text style={styles.header}>Clima</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        backgroundColor: '#1777F0',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 10
    }
})