import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { logIn } from '../redux/ActionCreators';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => ({
    logIn: (email) => dispatch(logIn (email))
  })


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        }
      }
    updateInputState = (key, val) => {
        if (key === "email") {
            this.setState(prevState => {
                return {
                    ...prevState,
                    email: val
                }
            });
        }
        if (key === "password") {
            this.setState(prevState => {
                return {
                    ...prevState,
                    password: val
                }
            });
        }
    };

    
    loginHandler = ({navigate}) => {
        const apiKey = "AIzaSyA3wFC2eHwQ-fj8GI-bx4D5sSeHUa9PbEw";
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                alert(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.idToken) {
                    alert(parsedRes.error.message);
                } else {
                    this.props.logIn(this.state.email)
                    navigate('Inicio', { user: this.state.email })
                    
                }
            });
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.contianer}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Iniciar sesión</Text>
                </View>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    value={this.state.email}
                    onChangeText={val => this.updateInputState("email", val)}
                    underlineColorAndroid="#1E22027A"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    value={this.state.password}
                    onChangeText={val => this.updateInputState("password", val)}
                    underlineColorAndroid="#22027A"
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.button}>
                    <Button title="Entrar" onPress={() => this.loginHandler({navigate})} style={styles.button} disabled={(this.state.email === "" || this.state.password === "")} />
                </View>
                <Text style={styles.text}>¿No tienes una cuenta? <Text onPress={() => navigate('SignUp')} style={styles.navigateText}>Registrarse</Text></Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerView: {
        marginBottom: 50
    },
    header: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#22027A"
    },
    text: {
        color: "black"
    },
    navigateText: {
        color: "#22027A"
    },
    input: {
        width: "90%"
    },
    button: {
        marginTop: 25,
        marginBottom: 25
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);  