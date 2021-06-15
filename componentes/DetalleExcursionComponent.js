import React, { Component } from 'react';
import { Text, Button, View, ScrollView, FlatList, StyleSheet, Modal} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      comentarios: state.comentarios,
      favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})



function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Image source = {{ uri: excursion.imagen }}>
                <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
              </Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon
                raised
                reverse
                name={ props.favorita ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                style={{ textAlign: 'center' }}
                onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
              />
              <Icon
                raised
                reverse
                name='pencil'
                type='font-awesome'
                color={colorGaztaroaOscuro}
                onPress={() => props.comentarExcursion()}
              />
              </View>
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;
          
  const renderCommentarioItem = ({item, index}) => {
      
      return (
          <View key={index} style={{margin: 10}}>
              <Text style={{fontSize: 14}}>{item.comentario}</Text>
              <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
              <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia} </Text>
          </View>
      );
  };
  
  return (
      <Card>
        <Card.Title>Comentarios</Card.Title>
        <Card.Divider/>
        <FlatList 
            data={comentarios}
            renderItem={renderCommentarioItem}
            keyExtractor={item => item.id.toString()}
            />
      </Card>
  );
}


class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        valoracion: 3,
        autor: [],
        comentario: [],
        //dia: new Date(),
        showModal: false
    }
  }

  marcarFavorito(excursionId) {
    //this.setState({favoritos: this.state.favoritos.concat(excursionId)});
    this.props.postFavorito(excursionId);
  }

  comentarExcursion() {
    console.log('HOLA');
    this.setState({showModal: !this.state.showModal});
  } 

  resetearModal() {
    this.setState({
        valoracion: 3,
        autor: [],
        comentario: [],
        showModal: false
    });
  }

  gestionarComentario(excursionId) {
      console.log(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
      this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
      this.resetearModal();
  }


  render(){
    const {excursionId} = this.props.route.params;
    return(
        <ScrollView>
            <RenderExcursion
                excursion={this.props.excursiones.excursiones[+excursionId]}
                favorita={this.props.favoritos.some(el => el === excursionId)}
                onPress={() => this.marcarFavorito(excursionId)}
                comentarExcursion={() => this.comentarExcursion()}
           />
            <RenderComentario
                comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
            />

            <Modal animationType = {"slide"} transparent = {false}
                visible = {this.state.showModal}>
                    <View style = {styles.modal}>
                    <Rating
                      type='star'
                      ratingCount={5}
                      startingValue={3}
                      imageSize={60}
                      showRating
                      onFinishRating={rating => this.setState({ valoracion: rating })}
                    />
                    <Input
                      placeholder="Autor"
                      leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                      onChangeText={value => this.setState({ autor: value })}
                      //onChangeText={value => this.setState({ comment: value })}
                    />
                    <Input
                      placeholder="Comentario"
                      leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                      onChangeText={value => this.setState({ comentario: value })}
                      //onChangeText={value => this.setState({ comment: value })}
                    />
                    
                    <View>
                            <Text style={styles.modalText} onPress={() => this.gestionarComentario(excursionId)}>ENVIAR</Text>
                            <Text style={styles.modalText} onPress={() => this.resetearModal()}>CANCELAR</Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
  } 
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalText: {
      textAlign: 'center',
      color: colorGaztaroaOscuro,
      fontSize: 18,
      margin: 10
  }
  });

export default connect(mapStateToProps,mapDispatchToProps)(DetalleExcursion);