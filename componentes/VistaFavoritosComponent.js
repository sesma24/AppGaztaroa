import React, { Component } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import IndicadorActividad from './IndicadorActividadComponent';
import { borrarFavorito } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId)),
})



class VistaFavoritos extends Component {

    alertaBorrar(item) {
        Alert.alert(
            "¿Esta seguro que desea borrar la excursión?",
            "Borrar " + item.nombre + "de la lista",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log(item.nombre + ' Favorito no borrado')
                },
                {
                    text: "Eliminar",
                    onPress: () => this.props.borrarFavorito(item.id)
                }
            ],
            { cancelable: false }
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderFavoritoItem = ({ item, index }) => {

            const rightButton = [
                {
                    text: 'Borrar',
                    type: 'delete',
                    onPress: () => this.alertaBorrar(item)
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        onLongPress={() => this.alertaBorrar(item)}
                        bottomDivider>
                        <Avatar source={{uri: baseUrl + item.imagen}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem> 
                </Swipeout>
            );
        };

        if (this.props.excursiones.isLoading) {
            return (
                <IndicadorActividad />
            );
        }

        else if (this.props.excursiones.errMess) {
            return (
                <View>
                    <Text>{this.props.excursiones.errMess}</Text>
                </View>
            );
        }

        else {
            if (this.props.favoritos.length > 0) {
                let favorito = [];
                this.props.favoritos.sort()
                this.props.favoritos.forEach(indice => {
                    favorito.push(this.props.excursiones.excursiones[indice])
                });
                return (
                    <FlatList
                        data={favorito}
                        renderItem={renderFavoritoItem}
                        keyExtractor={item => item.id.toString()}
                    />
                );
            } else {
                return (
                    <View>

                    </View>
                );
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);