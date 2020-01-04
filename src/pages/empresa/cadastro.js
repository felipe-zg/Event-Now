import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import EmpresaDao from '../../daos/empresaDao';
import ContaDao from '../../daos/ContaDao';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../animations/form_loading.json';
import {validaCNPJ} from '../../helpers';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Cadastro extends Component{
    constructor(){
        super();
        this.state={
           empresa:{
                nome: '',
                cnpj: '',
                email:'',
                uId:'',
                keyEmpresa:'',
           },
           senha: '',
           confirmaSenha: '',
           isLoading: false,
           esconderSenha: true,
           iconeSenha: 'ios-eye'
        }
    }

    alteraEstado = (campo, valor)=>{
        const { empresa } = { ...this.state };
        const estadoAtual = empresa;

        estadoAtual[campo] = valor;
      
        this.setState({ empresa: estadoAtual });
    }

    realizaCadastro = async()=>{
        const {empresa, senha} = this.state;
        if(this.formularioPossuiCampoVazio()){
            Toast.show("todos os campos são obrigatórios");
            return;
        }
        if(!validaCNPJ(this.state.empresa.cnpj)){
            Toast.show("CNPJ inválido");
            return;
        }
        if(senha.length<6){
            Toast.show("A senha precisa ter no minimo 6 caracteres");
            return;
        }

        if(this.senhasSaoIguais()){
            //faz cadastro no firebase
            this.setState({isLoading: true});
            const uId = await ContaDao.criaConta(empresa.email, senha);
            ContaDao.salvaContaNoDatabase(uId, "EMPRESA")
                .then(()=>{
                    this.alteraEstado("uId", uId);
                    EmpresaDao.salvaEmpresa(empresa)
                        .then(()=>{
                            this.setState({isLoading: false});
                            this.props.navigation.navigate('TelaCadastroEndereco');
                        });
                });
        }else{
            // apaga a confirmação de senha e informa o usuário
            Toast.show("As senhas não coincidem");
        }
    }

    formularioPossuiCampoVazio = ()=>{
        const {empresa, senha, confirmaSenha} = this.state;
        if(empresa.nome =='' || empresa.cnpj =='' || empresa.email=='' || senha=='' || confirmaSenha=='')
            return true;
        return false;
    }

    senhasSaoIguais = ()=>{
        const {senha, confirmaSenha} = this.state;
        if(senha == confirmaSenha) 
            return true;
        return false;
    }

    render(){
        const {empresa, senha, confirmaSenha, isLoading, esconderSenha, iconeSenha} = this.state;
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
                    <Text style={styles.txtPrincipal}>Cadastro de empresas</Text>
                    <View style={styles.viewForm}>
                        <TextInput style={styles.input} placeholder="Nome da empresa" value={empresa.nome} onChangeText={nome=>this.alteraEstado("nome", nome)}/>
                        <TextInput style={styles.input} keyboardType='number-pad' maxLength={14} placeholder="CNPJ - somente números" value={empresa.cnpj} onChangeText={cnpj=>this.alteraEstado("cnpj", cnpj)}/>
                        <TextInput style={styles.input} keyboardType='email-address' placeholder="E-mail" value={empresa.email} onChangeText={email=>this.alteraEstado("email", email)}/>
                        
                        <View style={styles.viewInput}>
                            <TextInput style={styles.inputSenha} secureTextEntry={esconderSenha} placeholder="Senha" value={senha} onChangeText={senha=>this.setState({senha})}/>
                            <TouchableOpacity style={styles.iconeTogleSenha} onPress={()=>{
                                                                                            this.setState({esconderSenha: !esconderSenha});
                                                                                            this.setState({iconeSenha: iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye'});
                                                                                        }}>
                                <Ionicons name={iconeSenha} size={35}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input} secureTextEntry={esconderSenha} placeholder="Confirme a senha" value={confirmaSenha} onChangeText={confirmaSenha=>this.setState({confirmaSenha})}/>
                           
                        <View style={styles.viewBotao}>
                            <Button title="Cadastrar"  color="#612F74" onPress={()=>this.realizaCadastro()} />
                        </View>
                    </View>
                </ScrollView>
            )
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