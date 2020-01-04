import React,{useState} from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { useStore } from 'react-redux';
import Firebase  from 'react-native-firebase';
import Toast from 'react-native-root-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../animations/form_loading.json';

atualizaEmail = (usuario, novoEmail, senha,  navigation)=>{
    sets.setIsLoading(true);
  
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


toggleSenha = (sets, estados)=>{
    sets.setEsconderSenha(!estados.esconderSenha);
    sets.setIconeSenha(estados.iconeSenha=='ios-eye'?'ios-eye-off':'ios-eye');
}



export default  attSenha = ({navigation})=> {
    const usuario = Firebase.auth().currentUser;
    const [senha, setSenha] = useState(null);
    const [novoEmail, setNovoEmail] = useState(null);
    const [esconderSenha, setEsconderSenha] = useState(true);
    const [iconeSenha, setIconeSenha] = useState('ios-eye');
    const [isLoading, setIsLoading] = useState(false);


    const sets = {setEsconderSenha, setIconeSenha, setIsLoading};
    const estados = {esconderSenha, iconeSenha};

    if(isLoading){
        return(
            <View style={styles.viewLoading}>
                <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </View> 
        )
    }else{
        return (
            <ScrollView>
                <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                <View style={styles.viewForm}>
                    <Text style={styles.label}>Novo e-mail:</Text>
                    <TextInput style={styles.input} keyboardType="email-address" value={novoEmail} onChangeText={novoEmail=>setNovoEmail(novoEmail)}/>

                    <Text style={styles.label}>Senha Atual:</Text>
                    <View style={styles.viewInput}>
                        <TextInput secureTextEntry={esconderSenha} style={styles.inputSenha} value={senha} onChangeText={senha=>setSenha(senha)}/>
                        <TouchableOpacity style={styles.iconeTogleSenha} onPress={()=>toggleSenha(sets, estados)}>
                            <Ionicons name={iconeSenha} size={35}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewBotao}> 
                    <Button title="Atualizar" color="#612F74" onPress={()=>atualizaEmail(usuario, novoEmail, senha,  navigation)}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    viewForm:{
      margin: 10,
    },
    label:{
      fontSize: 12,
      marginTop: 20,
      marginBottom: 2
    },
    viewInput:{
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 5,
      justifyContent: 'space-between',
      padding: 0,
    },
    input:{
      padding: 1,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ddd',
    },
    inputSenha:{
      width: '85%',
      padding: 1,
    },
    viewBotao:{
      borderRadius: 5,
      overflow: 'hidden',
      marginTop: 40,
    },
    iconeTogleSenha:{
      paddingRight: 2,
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});