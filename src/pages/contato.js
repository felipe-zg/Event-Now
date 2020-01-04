import React, {useState} from 'react';
import {ScrollView, View, KeyboardAvoidingView,  Text, TextInput, Button, Picker, StyleSheet, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import firebase from 'react-native-firebase';

import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/lf30_editor_IaoObY.json';
import Toast from 'react-native-root-toast';

enviaEmail = async(assunto, mensagem, nome, email, sets, navigation)=>{
    sets.setIsLoading(true);
    
    await firebase.functions().httpsCallable('sendMail')({
        dest: 'felipe_zeba@outlook.com',
        assunto,
        mensagem,
        email,
        nome
    }).then(()=>{
            sets.setIsLoading(false);
            sets.setAssunto('');
            sets.setMensagem('');
            sets.setCaracteres(200);
            navigation.goBack();
            Toast.show("Mensagem enviada com sucesso, aguarde o retorno em breve");
        })
    .catch(e=>Toast.show("Ocorreu um erro ao enviar a mensagem> Por favor, tente novamente."));
}


export default function contato({navigation}){
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [caracteres, setCaracteres] = useState(200);
    const [isLoading, setIsLoading] = useState(false);

    const empresa = useSelector(state=> state.empresa.dados);
    const usuario = useSelector(state => state.usuario.dados);

    const sets = {setIsLoading, setAssunto, setMensagem, setNome, setEmail, setCaracteres};

    if(empresa.nome && nome == ''){
        setNome(empresa.nome);
        setEmail(empresa.email);
    }
    if(usuario.nome && nome == ''){
        setNome(usuario.nome);
        setEmail(usuario.email);
    }

    if(isLoading){
        return(
            <View style={styles.viewLoading}>
                <StatusBar barStyle="light-content" backgroundColor="#612F74" />
               <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </View> 
        )
    }else{
        return(
            <ScrollView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                <KeyboardAvoidingView style={styles.form}>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput style={styles.input} value={nome} onChangeText={nome=>setNome(nome)}/>

                    <Text style={styles.label}>E-mail:</Text>
                    <TextInput style={styles.input} value={email} onChangeText={email=>setEmail(email)}/>
                                                                                                                                
                    <Text style={styles.label}>Assunto:</Text>
                    <View style={styles.viewPicker}>
                        <Picker
                            selectedValue={assunto}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setAssunto(itemValue)
                            }>
                            <Picker.Item key={Math.random(10)} label="Selecione o assunto" value=""/>
                            <Picker.Item key={Math.random(10)} label="Tenho um problema" value="problema"/>
                            <Picker.Item key={Math.random(10)} label="Tenho uma sugestão" value="sugestão"/>
                            <Picker.Item key={Math.random(10)} label="Meu app está dando erro" value="erro"/>
                        </Picker>
                    </View>
                    <Text style={styles.label}>Mensagem:</Text>
                    <TextInput multiline={true} numberOfLines={5} maxLength={200} style={styles.inputMensagem} value={mensagem} onChangeText={mensagem=>{
                                                                                                                                    setMensagem(mensagem);
                                                                                                                                    setCaracteres(200 - mensagem.length);
                                                                                                                                }}/>
                    <Text style={styles.caracteres}>{caracteres} caracteres</Text>
                    <View style={styles.botao}>
                        <Button title="Enviar" color="#612F74" onPress={()=>enviaEmail(assunto, mensagem, nome, email, sets, navigation)} />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    form:{
        paddingHorizontal: 20
    },
    label:{
        marginTop: 20,
        fontSize: 10
    },
    caracteres:{
        fontSize: 10,
        alignSelf: 'flex-end',
    },
    viewPicker:{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 0,
    },
    input:{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingVertical: 7,
    },
    inputMensagem:{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingBottom: 0,
        height: 150,
        textAlignVertical: 'top',
    },
    botao:{
        marginTop: 20,
        borderRadius: 5,
        overflow: 'hidden',
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})
