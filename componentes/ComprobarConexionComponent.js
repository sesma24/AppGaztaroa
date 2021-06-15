import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView, Text, Platform } from 'react-native';
import { Card } from 'react-native-elements';


const ConexionCorrecta = () => {
    const [isInternetReachable, setIsInternetReachable] = useState(false);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsInternetReachable(state.isInternetReachable);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    if (isInternetReachable){       
        return null;
    }
  
    return (
        <Card style={{backgroundColor: 'red'}}>
        <Card.Title>ERROR</Card.Title>
        <Card.Divider/>
        <Text style={{margin: 10,  backgroundColor: 'red'}}>
        Error de conexión
        {'\n'}{'\n'}
        Vuelva a conectarse a la red, gracias!
        </Text>
    </Card>
    );
}

export default ConexionCorrecta;