import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, ScrollView, FlatList } from 'react-native';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function Historia(props) {


  return (
    <Card>
      <Card.Title>Un poquito de historia</Card.Title>
      <Card.Divider />

      <Text style={{ margin: 20 }}>
        El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
              </Text>
      <Text style={{ margin: 20 }}>
        Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
              </Text>
      <Text style={{ margin: 20 }}>
        Gracias!
              </Text>

    </Card>
  );

}



class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    const renderActividadesItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          bottomDivider>
          <Avatar source={{uri: baseUrl + item.imagen}} />
          <ListItem.Content>
            <ListItem.Title>{item.nombre}</ListItem.Title>
            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    return (

      <ScrollView>
        <Historia />
        <SafeAreaView>
        <Card>
          <Card.Title>"Actividades y recursos"</Card.Title>
          <Card.Divider />
          <FlatList
            data={this.state.actividades}
            renderItem={renderActividadesItem}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
        </SafeAreaView>
      </ScrollView>

    );
  }
}

export default QuienesSomos;