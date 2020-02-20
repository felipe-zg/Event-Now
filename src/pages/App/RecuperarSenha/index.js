import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import Toast from 'react-native-root-toast';

import UsuarioDao from '../../../daos/usuarioDao';
import loadingAnimated from '../../../animations/form_loading.json';
import LoadingView from '../../../components/Loading';
import Botao from '../../../components/Botao'
import Texto from '../../../components/Texto'
import {Formulario, Input} from './styles';

export default function RecuperarSenha({navigation}){
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function SolicitaRecuperacao(){
        if(email == ''){
            Toast.show("Digite seu e-mail cadastrado");
        }else{
            setIsLoading(true);
            UsuarioDao.recuperarSenha(email)
                .then(()=>{
                    setIsLoading(false);
                    navigation.goBack();
                    Toast.show("O link para recuperação de senha foi enviado para seu e-mail");
                })
                .catch(e=>Toast.show("E-mail inválido"));
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
            <View>
                <Text style={styles.txtPrincipal}>Digite seu e-mail cadastrado no sistema</Text>
                <Formulario>
                    <Input autoCapitalize="none" keyboardType="email-address" placeholder="digite seu e-mail" value={email} onChangeText={email=>setEmail(email)} />
                    <Botao color="#612F74" marginTop="5px" onPress={()=>SolicitaRecuperacao()}>
                        <Texto color="#fff" size="13px">Recuperar</Texto>
                    </Botao>
                </Formulario>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 40
    },
})