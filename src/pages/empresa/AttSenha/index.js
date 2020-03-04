import React,{useState} from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
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
  Input,
  InputSenha
} from './styles';


export default  attSenha = ({navigation})=> {
  const usuario = Firebase.auth().currentUser;
  const [senha, setSenha] = useState(null);
  const [novaSenha, setNovaSenha] = useState(null);
  const [novaSenha2, setNovaSenha2] = useState(null);
  const [esconderSenha, setEsconderSenha] = useState(true);
  const [iconeSenha, setIconeSenha] = useState('ios-eye');
  const [isLoading, setIsLoading] = useState(false);


  function atualizaSenha(usuario){
      if(senha == null){
        Toast.show("Digite a sua senha atual");
        return;
      }
      if(novaSenha == null || novaSenha2 == null){
        Toast.show("Digite a sua nova senha");
        return;
      }
      if(novaSenha.length<6){
        Toast.show("A senha deve ter no minimo 6 caracteres");
        return;
      }
      if(novaSenha != novaSenha2){
        Toast.show("As senhas são diferentes");
        return;
      }

      setIsLoading(true);

      const credential = Firebase.auth.EmailAuthProvider.credential(
          usuario.email,
          senha
      );

      usuario.reauthenticateWithCredential(credential)
        .then(()=>{
            usuario.updatePassword(novaSenha)
              .then(()=>{
                Toast.show("Senha atualizada com sucesso !");
                navigation.goBack();
              })
        })
        .catch(()=>{
            Toast.show("Erro ao tentar reautenticar !");
        })
      setIsLoading(false); 
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
    return (
          <Formulario>
              <Label>Senha Atual:</Label>
              <InputSenha>
                  <TextInput autoCapitalize="none" secureTextEntry={esconderSenha} style={styles.inputSenha} value={senha} onChangeText={senha=>setSenha(senha)}/>
                  <TouchableOpacity style={styles.iconeTogleSenha} onPress={()=>toggleSenha()}>
                      <Ionicons name={iconeSenha} size={35}/>
                  </TouchableOpacity>
              </InputSenha>

              <Label>Nova Senha:</Label>
              <Input autoCapitalize="none" secureTextEntry={esconderSenha} value={novaSenha} onChangeText={novaSenha=>setNovaSenha(novaSenha)}/>
              <Label>Confirme a Nova Senha:</Label>
              <Input autoCapitalize="none" secureTextEntry={esconderSenha} value={novaSenha2} onChangeText={novaSenha2=>setNovaSenha2(novaSenha2)} />

              <Botao color="#612F74" marginTop="40px" onPress={()=>atualizaSenha(usuario)}> 
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