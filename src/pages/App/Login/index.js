import React, {useState} from 'react';
import {View, ScrollView, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert, StatusBar} from 'react-native';
import Firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import loadingAnimated from '../../../animations/perfil.json';
import magicaSenha from '../../../animations/senha1.json';
import tchauSenha from '../../../animations/senha2.json';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import {Container, Animacao, Formulario, Toggle, ToggleAnimation, InputView, Input, Acao} from './styles';

const inputs = [];

function focusField(index) {
    inputs[index].focus();
}

vaiParaTelaDeCadastro = (navigation)=>{
    Alert.alert(
        'Novo cadastro',
        'Escolha seu tipo de cadastro',
        [
            {
                text: 'Cancelar',
                onPress: () => console.log("exclusão cancelada"),
                style: 'cancel',
            },
            {
                text: 'Empresa', 
                onPress: () => {
                    navigation.navigate('TelaCadastroEmpresa');
                }
            },
            {
                text: 'Usuário', 
                onPress: () => {
                    navigation.navigate('TelaCadastro');
                }
            },
        ],
        {cancelable: true},
    );
}

export default function login({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [esconderSenha, setEsconderSenha] = useState(true);
    const [iconeSenha, setIconeSenha] = useState('ios-eye');
    const [mostrarIconeAninamaoToggleSenha, setMostraIconeAninamaoToggleSenha] = useState(false);
    const [iconeAnimacaoToggleSenha, setIconeAnimacaoToggleSenha] = useState(magicaSenha);

    function EfetuaLogin(){
        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>navigation.replace('TelaLoading'))
            .catch(()=>Toast.show("E-mail ou senha inválidos"));
    }

    function ToggleSenha(){
        setMostraIconeAninamaoToggleSenha(true);
        setEsconderSenha(!esconderSenha);
        setIconeSenha(iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye');
        setTimeout(()=>{
            setIconeAnimacaoToggleSenha(tchauSenha);
            setTimeout(()=>{
                setMostraIconeAninamaoToggleSenha(false);
                setIconeAnimacaoToggleSenha(magicaSenha);
            }, 1500);
        }, 1500);
    }

    return(
        <Container>
            <Animacao>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay />
            </Animacao> 
            <Formulario>
                <Text style={styles.txtPrincipal} >Faça login com seu E-mail e senha</Text>
                <Toggle>
                    <ToggleAnimation>
                        {mostrarIconeAninamaoToggleSenha && (
                            <Lottie resizeMode="contain"  source={iconeAnimacaoToggleSenha} autoPlay loop={false} />
                        )}
                    </ToggleAnimation> 
                </Toggle>
                <View style={styles.viewForm}>
                    <InputView>
                        <Input 
                            autoCapitalize="none" 
                            keyboardType="email-address" 
                            placeholder="digite seu e-mail" 
                            value={email} onChangeText={email=>setEmail(email)}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                focusField('senha');
                            }}
                            blurOnSubmit={false}
                        />
                    </InputView>
                    <InputView>
                        <Input 
                            autoCapitalize="none" 
                            secureTextEntry={esconderSenha} 
                            placeholder="digite sua senha" 
                            value={password} 
                            onChangeText={password=>setPassword(password)} 
                            ref={input => {
                                inputs.senha = input;
                            }}
                            returnKeyType="send"
                            onSubmitEditing={EfetuaLogin}
                        />
                        <TouchableOpacity style={styles.iconeTogleSenha} onPress={()=>ToggleSenha()}>
                            <Ionicons name={iconeSenha} size={35}/>
                        </TouchableOpacity>
                    </InputView>
                    <Botao color="#612F74" marginTop="30px" onPress={()=>EfetuaLogin()}>
                        <Texto color="#fff" size="13px">Entrar</Texto>
                    </Botao>
                </View>
                <View>
                    <Acao marginTop="40px" onPress={()=>navigation.navigate('TelaRecuperarSenha')}>
                        <Texto color="#000" size="12px">Esqueci minha senha</Texto>
                    </Acao>
                    <Acao marginTop="10px" onPress={()=>vaiParaTelaDeCadastro(navigation)}>
                        <Texto color="#000" size="12px">Não tem uma conta ? Cadastre-se</Texto>
                    </Acao>
                </View>
            </Formulario>
        </Container>
    )
}




const styles = StyleSheet.create({
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 10,
        marginTop: 20
    },
    viewForm:{
        marginHorizontal: 20,
    },
    iconeTogleSenha:{
        paddingRight: 2,
    },
})