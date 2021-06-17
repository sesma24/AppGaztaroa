import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import QuienesSomos from './QuienesSomosComponent';
import Contacto from './ContactoComponent';
import ExcursionesFavoritas from './VistaFavoritosComponent';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorGaztaroaOscuro, colorGaztaroaClaro, configDB, obtenerImagen } from '../comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';
import PruebaEsfuerzo from './PruebaEsfuerzoComponent';
import firebase from 'firebase';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';


const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
    login: state.login
  }
}

const mapDispatchToProps = dispatch => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
})

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Campo Base',
        }}
      />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="QuienesSomos"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>),
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={{
          title: 'Quiénes somos',
        }}
      />
    </Stack.Navigator>
  );
}

function CalendarioNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        }}
    >
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
          headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>),
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}

function ContactoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>),
      }}
    >
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );
}

function PruebaEsfuerzoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="PruebaEsfuerzo"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>),
      }}
    >
      <Stack.Screen
        name="Prueba de esfuerzo"
        component={PruebaEsfuerzo}
        options={{
          title: 'Prueba de esfuerzo',
        }}
      />
    </Stack.Navigator>
  );
}

function ExcursionesFavoritasNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ExcursionesFavoritas"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="ExcursionesFavoritas"
        component={ExcursionesFavoritas}
        options={{
          title: 'ExcursionesFavoritas',
        }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/appgaztaroa-66736.appspot.com/o/logo.png?alt=media&token=e9455f98-7136-411c-91a6-5fb677273976"}} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function DrawerNavegador() {
  return (
      <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colorGaztaroaClaro,
      }}
      initialRouteName="Campo base"
      drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Login" component={LoginNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='user'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            )
          }}
        />
        <Drawer.Screen name="Campo base" component={HomeNavegador}
          options={{
            drawerIcon: ({ tintColor}) => (
              <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
            )
            }}
        />        
        <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador}
          options={{
              drawerIcon: ({ tintColor}) => (
                <Icon
                name='info-circle'
                type='font-awesome'            
                size={24}
                color={tintColor}
                />
              )
              }}
          />          
        <Drawer.Screen name="Calendario" component={CalendarioNavegador}
          options={{
            drawerIcon: ({ tintColor}) => (
              <Icon
              name='calendar'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
            )
            }}
        />
        <Drawer.Screen name="Contacto" component={ContactoNavegador}
          options={{
            drawerIcon: ({ tintColor}) => (
              <Icon
              name='address-card'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
            )
            }}
        />
        <Drawer.Screen name="Excursiones favoritas" component={ExcursionesFavoritasNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='thumbs-up'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            )
          }}
        />
        <Drawer.Screen name="PruebaEsfuerzo" component={PruebaEsfuerzoNavegador}
          options={{
            drawerIcon: ({ tintColor}) => (
              <Icon
              name='heartbeat'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
            )
            }}
        />      
      </Drawer.Navigator>
  );
}


function LoginNavegador() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'SignUp',
        }}
      />
      <Stack.Screen
        name="Inicio"
        component={DrawerNavegador}
      />
    </Stack.Navigator>
  );
}

class Campobase extends Component {

  componentDidMount() {
    firebase.initializeApp(configDB);

    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {

    return (
      <NavigationContainer>
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
        <View>
        </View>
          <DrawerNavegador />
        </View>      
      </NavigationContainer>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);