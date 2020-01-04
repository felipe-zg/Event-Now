import React, {useState} from 'react';
import {View, ScrollView, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert, StatusBar} from 'react-native';
import Firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';

import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/perfil.json';
import magicaSenha from '../animations/senha1.json';
import tchauSenha from '../animations/senha2.json';
import Ionicons from 'react-native-vector-icons/Ionicons'

efetuaLogin = (email, password, navigation)=>{
    Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>navigation.push('TelaLoading'))
        .catch(()=>Toast.show("E-mail ou senha inválidos"));
}

vaiParaTelaRecuperarSenha = (navigation)=>{
  navigation.navigate('TelaRecuperarSenha');
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

toggleSenha = (sets, estados)=>{
    sets.setMostraIconeAninamaoToggleSenha(true);
    sets.setEsconderSenha(!estados.esconderSenha);
    sets.setIconeSenha(estados.iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye');
    setTimeout(()=>{
        sets.setIconeAnimacaoToggleSenha(tchauSenha);
        setTimeout(()=>{
            sets.setMostraIconeAninamaoToggleSenha(false);
            sets.setIconeAnimacaoToggleSenha(magicaSenha);
        }, 1500);
    }, 1500);
}


export default function login({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [esconderSenha, setEsconderSenha] = useState(true);
    const [iconeSenha, setIconeSenha] = useState('ios-eye');
    const [mostrarIconeAninamaoToggleSenha, setMostraIconeAninamaoToggleSenha] = useState(false);
    const [iconeAnimacaoToggleSenha, setIconeAnimacaoToggleSenha] = useState(magicaSenha);
    const sets = {setIconeSenha, setEsconderSenha, setMostraIconeAninamaoToggleSenha, setIconeAnimacaoToggleSenha};
    const estados = {esconderSenha, iconeSenha, mostrarIconeAninamaoToggleSenha, iconeAnimacaoToggleSenha};

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            <View style={styles.viewAnimacao}>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay />
            </View> 
            <View style={styles.viewLogin}>
                <ScrollView>
                    <Text style={styles.txtPrincipal} >Faça login com seu E-mail e senha</Text>
                    <View style={styles.viewRowAnimacao}>
                        <View style={styles.viewAnimacaoTrocaSenha}>
                            {mostrarIconeAninamaoToggleSenha && (
                                <Lottie resizeMode="contain"  source={iconeAnimacaoToggleSenha} autoPlay loop={false} />
                            )}
                        </View> 
                    </View>
                    <View style={styles.viewForm}>
                        <View style={styles.viewInput}>
                            <TextInput style={styles.input} keyboardType="email-address" placeholder="digite seu e-mail" value={email} onChangeText={email=>setEmail(email)}/>
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput style={styles.input} secureTextEntry={esconderSenha} placeholder="digite sua senha" value={password} onChangeText={password=>setPassword(password)} />
                            <TouchableOpacity style={styles.iconeTogleSenha} onPress={()=>toggleSenha(sets, estados)}>
                                <Ionicons name={iconeSenha} size={35}/>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.viewBotao}>
                            <Button title="Entrar" color="#612F74" onPress={()=>efetuaLogin(email, password, navigation)}/>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.txtRecuperarSenha} onPress={()=>vaiParaTelaRecuperarSenha(navigation)}>
                            <Text style={styles.txtRecuperarSenha}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.txtCadastrar} onPress={()=>vaiParaTelaDeCadastro(navigation)}>
                            <Text style={styles.txtCadastrar}>Não tem uma conta ? Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
        container:{
            flex: 1
        },
        viewAnimacao:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10
        },
        viewLogin:{
            flex: 2,
        },
        txtPrincipal:{
            alignSelf: 'center',
            fontSize: 10,
            marginTop: 20
        },
        txtRecuperarSenha:{
            alignSelf: 'center',
            fontSize: 12,
            marginTop: 20
        },
        txtCadastrar:{
            alignSelf: 'center',
            fontSize: 12,
            marginTop: 5
        },
        viewForm:{
            marginHorizontal: 20,
        },
        viewInput:{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: "grey",
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        input:{
            paddingBottom: 0,
            width: '85%',
        },
        viewRowAnimacao:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        viewAnimacaoTrocaSenha:{
            height: 100,
            width: 100,
        },
        iconeTogleSenha:{
            paddingRight: 2,
        },
        viewBotao:{
            marginTop: 30,
            borderRadius: 5,
            overflow: 'hidden'
        }
})