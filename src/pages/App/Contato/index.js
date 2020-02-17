import React, {useState, useEffect} from 'react';
import {ScrollView, View, KeyboardAvoidingView,  Text, TextInput, Button, Picker, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import firebase from 'react-native-firebase';
import Lottie from 'lottie-react-native';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import loadingAnimated from '../../../animations/lf30_editor_IaoObY.json';
import LoadingView from '../../../components/Loading';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import {Label, Input, InputMensagem, PickerView} from './styles';


export default function contato({navigation}){
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [caracteres, setCaracteres] = useState(200);
    const [isLoading, setIsLoading] = useState(false);

    const empresa = useSelector(state=> state.empresa.dados);
    const usuario = useSelector(state => state.usuario.dados);

    useEffect(()=>{
        if(empresa.nome && nome == ''){
            setNome(empresa.nome);
            setEmail(empresa.email);
        }
        if(usuario.nome && nome == ''){
            setNome(usuario.nome);
            setEmail(usuario.email);
        }
    },[]);


    async function EnviaEmail(){
        setIsLoading(true);
        
        await firebase.functions().httpsCallable('sendMail')({
            dest: 'felipe_zeba@outlook.com',
            assunto,
            mensagem,
            email,
            nome
        }).then(()=>{
                setIsLoading(false);
                setAssunto('');
                setMensagem('');
                setCaracteres(200);
                navigation.goBack();
                Toast.show("Mensagem enviada com sucesso, aguarde o retorno em breve");
            })
        .catch(e=>Toast.show("Ocorreu um erro ao enviar a mensagem> Por favor, tente novamente."));
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
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.formulario}
                    scrollEnabled={false}
                >
                    <Label>Nome:</Label>
                    <Input value={nome} onChangeText={nome=>setNome(nome)}/>

                    <Label>E-mail:</Label>
                    <Input value={email} onChangeText={email=>setEmail(email)}/>
                                                                                                                                
                    <Label>Assunto:</Label>
                    <PickerView>
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
                    </PickerView>
                    <Label>Mensagem:</Label>
                    <InputMensagem numberOfLines={5} maxLength={200} multiline={true} value={mensagem} 
                        onChangeText={mensagem=>{
                            setMensagem(mensagem);
                            setCaracteres(200 - mensagem.length);
                        }}
                    />
                    <Text style={styles.caracteres}>{caracteres} caracteres</Text>
                    <Botao color="#612F74" marginTop="20px" onPress={()=>EnviaEmail()}>
                        <Texto color="#fff" size="12px">ENVIAR</Texto>
                    </Botao>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formulario:{
        paddingHorizontal: 20
    },
    caracteres:{
        fontSize: 10,
        alignSelf: 'flex-end',
    },
})
