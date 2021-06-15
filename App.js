import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import ConexionCorrecta from './componentes/ComprobarConexionComponent';

const {store,persistor} = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <ConexionCorrecta></ConexionCorrecta>
      <View style={styles.container}>
        <PersistGate persistor={persistor} loading={null}>
            <Campobase />
        </PersistGate>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});