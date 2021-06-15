import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Platform, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorGaztaroaOscuro } from '../comun/comun';
import * as Calendar from 'expo-calendar'

class PruebaEsfuerzo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edad: 18,
            federado: false,
            fecha: new Date(),
            show: false,
            mode: 'date',
            showModal: false
        }
    }

    resetForm() {
        this.setState({
            edad: 18,
            federado: false,
            fecha: new Date(),
            showModal: false
        });
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }


    async gestionarReserva() { 
        console.log(JSON.stringify(this.state));

        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
            const details = {
                title: "Prueba de esfuerzo",
                location: "Sesma",
                url: "http://www.gaztaroa.com",
                timeZone: "GMT+2", 
                startDate: new Date(this.state.fecha), 
                endDate: new Date(this.state.fecha) 
            };

            await Calendar.createEventAsync(calendars[0].id, details)
        }
    this.toggleModal();
    }



    
    seleccionarFecha = (event, selectedDate) => {
        this.setState({show: false})
        const currentDate = selectedDate || new Date(0);
        this.setState({fecha: currentDate})
        
      };

    render() {


          const showDatepicker = () => {
            this.setState({mode: 'date'})
            this.setState({show: true})
          };
        
          const showTimepicker = () => {
            this.setState({mode: 'time'})
            this.setState({show: true})
          };

        return(
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Edad</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.edad}
                    onValueChange={(itemValue, itemIndex) => this.setState({edad: itemValue})}>
                    <Picker.Item label="< 20" value="< 20" />
                    <Picker.Item label="20 - 30" value="20 - 30" />
                    <Picker.Item label="31 - 40" value="31 - 40" />
                    <Picker.Item label="41 - 50" value="41 - 50" />
                    <Picker.Item label="51 - 60" value="51 - 60" />
                    <Picker.Item label="> 60" value="> 60" />
                </Picker>
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Federado/No-federado?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.federado}
                    trackColor={colorGaztaroaOscuro}
                    onValueChange={(value) => this.setState({federado: value})}>
                </Switch>
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Día y hora</Text>
                <View>
                    <Button onPress={showDatepicker} title="Seleccionar fecha" />
                </View>

                <View>
                    <Button onPress={showTimepicker} title="Seleccionar hora" />
                </View>

                {this.state.show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.fecha}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.seleccionarFecha}
                    />
                )}
            </View>
            
            <View style={styles.formRow}>
                <Button
                    onPress={() => this.gestionarReserva()}
                    title="Reservar"
                    color={colorGaztaroaOscuro}
                    accessibilityLabel="Gestionar reserva..."
                    />
            </View>

            <Modal animationType = {"slide"} transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                <View style = {styles.modal}>
                    <Text style = {styles.modalTitle}>Detalle de la reserva</Text>
                    <Text style = {styles.modalText}>Edad: {this.state.edad}</Text>
                    <Text style = {styles.modalText}>Federado?: {this.state.federado ? 'Si' : 'No'}</Text>
                    <Text style={styles.modalText}>Día y hora: {this.state.fecha.getDate()}/{this.state.fecha.getMonth()+1}/{this.state.fecha.getFullYear()} {this.state.fecha.getHours()}:{this.state.fecha.getMinutes()}</Text>
                    
                    <Button 
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="Cerrar" 
                        />
                </View>
            </Modal>

        </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }

});

export default PruebaEsfuerzo;