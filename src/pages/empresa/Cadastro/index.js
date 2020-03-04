import React, {Component, useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import EmpresaDao from '../../../daos/empresaDao';
import ContaDao from '../../../daos/ContaDao';
import loadingAnimated from '../../../animations/form_loading.json';
import {validaCNPJ} from '../../../helpers';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import{
    Animacao,
    Input,
    ViewInputSenha,
    InputSenha
}from './styles';

export default function  Cadastro({navigation}){

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [esconderSenha, setEsconderSenha] = useState(true);
    const [iconeSenha, setIconeSenha] = useState('ios-eye');

    const inputs = [];

    function focusField(index) {
        inputs[index].focus();
    }

    async function realizaCadastro(){
        if(formularioPossuiCampoVazio()){
            Toast.show("todos os campos são obrigatórios");
            return;
        }
        if(!validaCNPJ(cnpj)){
            Toast.show("CNPJ inválido");
            return;
        }
        if(senha.length<6){
            Toast.show("A senha precisa ter no minimo 6 caracteres");
            return;
        }

        if(senhasSaoIguais()){
            //faz cadastro no firebase
            setIsLoading(true);
            let uId = await ContaDao.criaConta(email, senha);
            ContaDao.salvaContaNoDatabase(uId, "EMPRESA")
                .then(()=>{
                    EmpresaDao.salvaEmpresa(empresa = {nome, cnpj, email, uId})
                        .then(()=>{
                            setIsLoading(false);
                            navigation.replace('TelaCadastroEndereco');
                        });
                });
        }else{
            setConfirmaSenha('');
            Toast.show("As senhas não coincidem");
            return;
        }
    }

    function formularioPossuiCampoVazio(){
        if(nome =='' || cnpj =='' || email=='' || senha=='' || confirmaSenha=='')
            return true;
        return false;
    }

    function senhasSaoIguais(){
        if(senha == confirmaSenha) 
            return true;
        return false;
    }

    function toggleSenha(){
        setEsconderSenha(!esconderSenha);
        setIconeSenha(iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye');
    }

   
    if(isLoading){
        return(
            <Animacao>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </Animacao> 
        )
    }else{
        return(
            <ScrollView>
                <Text style={styles.txtPrincipal}>Cadastro de empresas</Text>
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.formulario}
                    scrollEnabled={false}
                >
                    <Input
                        placeholder="Nome da empresa" 
                        autoCapitalize="none"
                        value={nome} 
                        onChangeText={nome=>setNome(nome)}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('cnpj');
                        }}
                        blurOnSubmit={false}
                    />
                    <Input
                        keyboardType='number-pad' 
                        maxLength={14} 
                        placeholder="CNPJ - somente números" 
                        value={cnpj} 
                        onChangeText={cnpj=>setCnpj(cnpj)}
                        ref={input => {
                            inputs.cnpj = input;
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('email');
                        }}
                        blurOnSubmit={false}
                    />
                    <Input
                        keyboardType='email-address' 
                        autoCapitalize="none"
                        placeholder="E-mail" 
                        value={email} 
                        onChangeText={email=>setEmail(email)}
                        ref={input => {
                            inputs.email = input;
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('senha');
                        }}
                        blurOnSubmit={false}
                    />
                    
                    <ViewInputSenha>
                        <InputSenha
                            secureTextEntry={esconderSenha} 
                            autoCapitalize="none"
                            placeholder="Senha" 
                            value={senha} 
                            onChangeText={senha=>setSenha(senha)}
                            ref={input => {
                                inputs.senha = input;
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                focusField('confirmarSenha');
                            }}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity style={styles.iconeTogleSenha}  onPress={()=>{toggleSenha()}}>
                            <Ionicons name={iconeSenha} size={35}/>
                        </TouchableOpacity>
                    </ViewInputSenha>
                    <Input
                        secureTextEntry={esconderSenha} 
                        autoCapitalize="none"
                        placeholder="Confirme a senha" 
                        value={confirmaSenha} 
                        onChangeText={confirmaSenha=>setConfirmaSenha(confirmaSenha)}
                        ref={input => {
                            inputs.confirmarSenha = input;
                        }}
                        returnKeyType="send"
                        onSubmitEditing={realizaCadastro}
                    />
                        
                    <Botao color="#612F74" marginTop="30px" onPress={()=>realizaCadastro()} >
                        <Texto color="#fff" size="14px">Cadastrar</Texto>
                    </Botao>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
    
}

const styles = StyleSheet.create({
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 20
    },
    formulario:{
        margin: 15,
        marginTop: 50
    },
    iconeTogleSenha:{
        paddingRight: 2,
    },
})