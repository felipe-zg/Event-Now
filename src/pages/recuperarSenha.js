import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, StatusBar} from 'react-native';
import UsuarioDao from '../daos/usuarioDao';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/form_loading.json';
import Toast from 'react-native-root-toast';

export default class RecuperarSenha extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            isLoading: false,
        }
    }

    recuperarSenha = ()=>{
        const {email} = this.state;
        if(email == ''){
            Toast.show("Digite seu e-mail cadastrado");
        }else{
            this.setState({isLoading: true});
            UsuarioDao.recuperarSenha(email)
                .then(()=>{
                    this.setState({isLoading: false});
                    this.props.navigation.goBack();
                    Toast.show("O link para recuperação de senha foi enviado para seu e-mail");
                })
                .catch(e=>Toast.show("E-mail inválido"));
        }
    }

    render(){
        const {email, isLoading} = this.state;
        if(isLoading){
            return(
                <View style={styles.viewLoading}>
                    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View> 
            )
        }else{
            return(
                <View>
                    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                    <Text style={styles.txtPrincipal}>Digite seu e-mail cadastrado no sistema</Text>
                    <View style={styles.viewForm}>
                        <TextInput style={styles.input} placeholder="digite seu e-mail" value={email} onChangeText={email=>this.setState({email})} />
                        <View style={styles.viewBotao}>
                            <Button title="Recuperar" color="#612F74" onPress={()=>this.recuperarSenha()} />
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 40
    },
    viewForm:{
        margin: 20,
        marginTop: 50,
    },
    viewBotao:{
        marginTop: 30,
        borderRadius: 5,
        overflow: 'hidden',
    },
    input:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})