import React, {useState} from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import UsuarioDao from '../../../daos/usuarioDao'
import ContaDao from '../../../daos/ContaDao';
import loadingAnimated from '../../../animations/form_loading.json';

import LoadingView from '../../../components/Loading';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import {Input, ConfirmarSenha} from './styles';

export default function Cadastro({navigation}){

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [keyUsuario, setKeyUsuario] = useState('');
    const [keyListaFavoritos, setKeyListaFavoritos] = useState('');
    const [uId, setUId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [esconderSenha, setEsconderSenha] = useState(true);
    const [iconeSenha, setIconeSenha] = useState('ios-eye');
  
    const inputs = [];

    function focusField(index) {
        inputs[index].focus();
      }

    formularioPossuiCampoVazio = ()=>{
        if(nome == '' || sobrenome == '' || email == '' || senha == '' || confirmaSenha == '' )
            return true;
        return false;
    }

    senhasSaoIguais = () =>{
        if(senha == confirmaSenha) 
            return true;
        return false;
    }

    realizaCadastro = async()=>{
        Keyboard.dismiss();
        if(formularioPossuiCampoVazio()){
            Toast.show("todos os campos são obrigatórios");
            return;
        }
        if(senha.length <6){
            Toast.show("A senha precisa ter no mínimo 6 caracteres");
            return;
        }
        if(senhasSaoIguais()){
            //faz cadastro no firebase
            setIsLoading(true);
            ContaDao.criaConta(email, senha)
                .then(uId=>{
                    ContaDao.salvaContaNoDatabase(uId, "USUARIO")
                        .then(()=>{
                            setUId(uId);
                            UsuarioDao.salvaUsuario({nome,sobrenome, email, keyUsuario, keyListaFavoritos, uId })
                                .then(()=>{
                                    setIsLoading(false)
                                    navigation.replace('TelaLoading');
                                })
                                .catch(()=>Toast.show("Algo deu errado no seu cadastro, tente novamente !"));
                        });
                }).catch(e=>{
                    Toast.show('Algo deu errado da criação da sua conta');
                });
            
        }else{
            // apaga a confirmação de senha e informa o usuário
            Toast.show("As enhas não coincidem");
        }
    }



    if(isLoading){
        return(
            <LoadingView>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </LoadingView> 
        )
    }else{
        return(
            <ScrollView>
                <Text style={styles.txtPrincipal}>Preencha os dados de cadastro</Text>
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.formulario}
                    scrollEnabled={false}
                >
                    <Input  autoCapitalize="words" placeholder="Nome" value={nome} onChangeText={nome=>setNome(nome)}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('sobrenome');
                        }}
                        blurOnSubmit={false}
                    />
                    <Input  autoCapitalize="words" placeholder="Sobrenome" value={sobrenome} onChangeText={sobrenome=>setSobrenome(sobrenome)}
                        ref={input => {
                            inputs.sobrenome = input;
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('email');
                        }}
                        blurOnSubmit={false}
                    />
                    <Input  autoCapitalize="none" textContentType="emailAddress" keyboardType="email-address" 
                        autoCompleteType="email" placeholder="E-mail"  value={email} onChangeText={email=>setEmail(email)}
                        ref={input => {
                            inputs.email = input;
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('senha');
                        }}
                        blurOnSubmit={false}
                    />
                    
                    
                    <ConfirmarSenha>
                        <TextInput style={styles.inputSenha} autoCapitalize="none" secureTextEntry={esconderSenha} 
                            placeholder="Senha" value={senha} onChangeText={senha=>setSenha(senha)}
                            ref={input => {
                                inputs.senha = input;
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                focusField('confirmaSenha');
                            }}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity style={styles.iconeTogleSenha} 
                                onPress={()=>{
                                    setEsconderSenha(!esconderSenha);
                                    setIconeSenha(iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye');
                                }}>
                            <Ionicons name={iconeSenha} size={35}/>
                        </TouchableOpacity>
                    </ConfirmarSenha>

                    <Input autoCapitalize="none" secureTextEntry={esconderSenha} placeholder="Confirme sua senha" 
                        value={confirmaSenha} onChangeText={confirmaSenha=>setConfirmaSenha(confirmaSenha)}
                        ref={input => {
                            inputs.confirmaSenha = input;
                        }}
                        returnKeyType="send"
                        onSubmitEditing={realizaCadastro}
                    />
                    
                    <Botao color="#612F74" marginTop="30px" onPress={()=>realizaCadastro()}>
                        <Texto color="#fff" size="12px">Cadastrar</Texto>
                    </Botao>
                </KeyboardAwareScrollView>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 20
    },
    inputSenha:{
        paddingBottom: 0,
        width: '85%',
    },
    iconeTogleSenha:{
        paddingRight: 2,
    },
    formulario:{
        margin: 15,
        marginTop: 50,
    }
})