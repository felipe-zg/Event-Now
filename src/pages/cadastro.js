import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, StatusBar} from 'react-native';
import UsuarioDao from '../daos/usuarioDao'
import Toast from 'react-native-root-toast';
import ContaDao from '../daos/ContaDao';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/form_loading.json';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Cadastro extends Component{
    constructor(){
        super();
        this.state ={
            usuario:{
                nome: '',
                sobrenome:'',
                email:'',
                senha:'',
                keyUsuario: '',
                keyListaFavoritos: '',
                uId: '',
            },
            confirmaSenha:'',
            isLoading: false,
            esconderSenha: true,
            iconeSenha: 'ios-eye',
        }
    }

    alteraEstado = (campo, valor)=>{
        const { usuario } = { ...this.state };
        const estadoAtual = usuario;

        estadoAtual[campo] = valor;
      
        this.setState({ usuario: estadoAtual });
    }

    formularioPossuiCampoVazio = ()=>{
        const { usuario, confirmaSenha } = { ...this.state };
        if(usuario.nome == '' || usuario.sobrenome == '' || usuario.email == '' || usuario.senha == '' || confirmaSenha == '' )
            return true;
        return false;
    }

    realizaCadastro = async()=>{
        const {usuario} = this.state;
        if(this.formularioPossuiCampoVazio()){
            console.warn("todos os campos são obrigatórios");
            return;
        }
        if(this.senhasSaoIguais()){
            //faz cadastro no firebase
            this.setState({isLoading: true});
            const uId = await ContaDao.criaConta(usuario.email, usuario.senha);
            ContaDao.salvaContaNoDatabase(uId, "USUARIO")
                .then(()=>{
                    this.alteraEstado("uId", uId);
                    UsuarioDao.salvaUsuario(usuario)
                        .then(()=>{
                            this.setState({isLoading: false});
                            this.props.navigation.push('TelaLoading');
                        })
                        .catch(()=>Toast.show("Algo deu errado no seu cadastro, tente novamente !"));
                });
        }else{
            // apaga a confirmação de senha e informa o usuário
            Toast.show("As enhas não coincidem");
        }
    }

    senhasSaoIguais = () =>{
        const {usuario, confirmaSenha} = this.state;
        if(usuario.senha == confirmaSenha) 
            return true;
        return false;
    }

    render(){
        const {usuario, isLoading, iconeSenha, esconderSenha} = this.state;
        if(isLoading){
            return(
                <View style={styles.viewLoading}>
                    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View> 
            )
        }else{
            return(
                <ScrollView>
                    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                    <Text style={styles.txtPrincipal}>Preencha os dados de cadastro</Text>
                    <View style={styles.viewForm}>
                        <TextInput style={styles.input} autoCapitalize="words" placeholder="Nome" value={usuario.nome} onChangeText={nome=>this.alteraEstado("nome", nome)}/>
                        <TextInput style={styles.input} autoCapitalize="words" placeholder="Sobrenome" value={usuario.sobrenome} onChangeText={sobrenome=>this.alteraEstado("sobrenome", sobrenome)}/>
                        <TextInput style={styles.input} textContentType="emailAddress" keyboardType="email-address" autoCompleteType="email" placeholder="E-mail"  value={usuario.email} onChangeText={email=>this.alteraEstado("email", email)}/>
                        
                        
                        <View style={styles.viewInput}>
                        <TextInput style={styles.inputSenha} secureTextEntry={esconderSenha} placeholder="Senha" value={usuario.senha} onChangeText={senha=>this.alteraEstado("senha", senha)}/>
                            <TouchableOpacity style={styles.iconeTogleSenha} onPress={()=>{
                                                                                            this.setState({esconderSenha: !esconderSenha});
                                                                                            this.setState({iconeSenha: iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye'});
                                                                                        }}>
                                <Ionicons name={iconeSenha} size={35}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input} secureTextEntry={esconderSenha} placeholder="Confirme sua senha" value={this.state.confirmaSenha} onChangeText={confirmaSenha=>this.setState({confirmaSenha})}/>
                        <View style={styles.viewBotao}>
                            <Button title="Cadastrar" color="#612F74" onPress={()=>this.realizaCadastro()}/>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 20
    },
    viewForm:{
        margin: 15,
        marginTop: 50
    },
    input:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    viewBotao:{
        marginTop: 30,
        borderRadius: 5,
        overflow: 'hidden'
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    viewInput:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputSenha:{
        paddingBottom: 0,
        width: '85%',
    },
    iconeTogleSenha:{
        paddingRight: 2,
    },
})