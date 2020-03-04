import React,{useState} from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { useStore } from 'react-redux';
import Firebase  from 'react-native-firebase';
import Toast from 'react-native-root-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Lottie from 'lottie-react-native';

import loadingAnimated from '../../../animations/form_loading.json';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import {
  Animacao,
  Formulario,
  Label,
  InputSenha,
  Input
} from './styles';

export default  attSenha = ({navigation})=> {
    const usuario = Firebase.auth().currentUser;
    const [senha, setSenha] = useState(null);
    const [novoEmail, setNovoEmail] = useState(null);
    const [esconderSenha, setEsconderSenha] = useState(true);
    const [iconeSenha, setIconeSenha] = useState('ios-eye');
    const [isLoading, setIsLoading] = useState(false);


    function toggleSenha(){
        setEsconderSenha(!esconderSenha);
        setIconeSenha(iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye');
    }

    function atualizaEmail(usuario){
        if(novoEmail == null){
          Toast.show('O novo e-mail é obrigatório');
          return;
        }
        if(senha == null){
          Toast.show('Digite sua senha atual');
          return;
        }
        setIsLoading(true);
      
        const credential = Firebase.auth.EmailAuthProvider.credential(
            usuario.email,
            senha
        );
    
        usuario.reauthenticateWithCredential(credential)
          .then(()=>{
              usuario.updateEmail(novoEmail)
                .then(()=>{
                  Toast.show("E-mail atualizado com sucesso !");
                  navigation.goBack();
                })
          })
          .catch(()=>{
              Toast.show("Erro ao tentar reautenticar !");
          })
          setIsLoading(false);
    }

    if(isLoading){
        return(
            <Animacao>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </Animacao> 
        )
    }else{
        return (
            <Formulario>
                <Label>Novo e-mail:</Label>
                <Input keyboardType="email-address" value={novoEmail} onChangeText={novoEmail=>setNovoEmail(novoEmail)}/>

                <Label>Senha Atual:</Label>
                <InputSenha>
                    <TextInput secureTextEntry={esconderSenha} style={styles.inputSenha} value={senha} onChangeText={senha=>setSenha(senha)}/>
                    <TouchableOpacity style={styles.iconeTogleSenha} onPress={()=>toggleSenha()}>
                        <Ionicons name={iconeSenha} size={35}/>
                    </TouchableOpacity>
                </InputSenha>

                <Botao color="#612F74" marginTop="40px" onPress={()=>atualizaEmail(usuario)}> 
                  <Texto color="#fff" size="14px">Atualizar</Texto>
                </Botao>
            </Formulario>
        );
    }
}

const styles = StyleSheet.create({
    inputSenha:{
      width: '85%',
      padding: 1,
    },
    iconeTogleSenha:{
      paddingRight: 2,
    },
});