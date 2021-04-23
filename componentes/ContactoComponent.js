import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';


function RenderContact(props) {
    return(
        <Card>
            <Card.Title>Información de contacto</Card.Title>
            <Card.Divider/>
            
            <Text style={{margin: 20}}>
                Kaixo Mendizale!
            </Text>
            <Text style={{margin: 20}}>
                Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.
            </Text>
            <Text style={{margin: 20}}>    
                Para lo que quieras, estamos a tu disposición!
            </Text>
            <Text style={{margin: 20}}>    
                Tel: +34 948 277151
            </Text>
            <Text style={{margin: 20}}>    
                Email: gaztaroa@gaztaroa.com
            </Text>
        </Card>
    );
}
function Contact(props) {
    return(<RenderContact/>);
}


export default Contact;