import React, {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, Picker} from 'react-native';
import Firebase from 'react-native-firebase';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EnderecoDao from '../../../daos/enderecoDao';
import {attEnderecoNaLista} from '../../../actions';
import loadingAnimated from '../../../animations/form_loading.json';
import {GOOGLE_MAPS_APIKEY} from '../../../configs';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import {
    Container,
    Animacao,
    Label,
    Input,
    ViewPicker,
    Row
} from './styles';

formTemCampoVazio = (endereco)=>{
    if(endereco.rua =='' || endereco.numero =='' || endereco.bairro =='' || endereco.cep =='' || endereco.cidade =='' || endereco.estado ==''){
        return true;
    }else{
        return false;
    }
}

formatoDoCepEhValido = (cep)=>{
    if(cep.length < 8){
        return false
    }else{
        return true;
    }
}

handlerNumberInput = (setState, valor)=>{
    const char = valor.charAt(valor.length-1)
    if(!isNaN(parseFloat(char)) && isFinite(char)){
        setState(valor);
    }
    if(char.length == 0) setState('');
}

renderizaUFs = (ufs)=>{
    return ufs.map((uf) => {
        return (
            <Picker.Item key={uf} label={uf} value={uf} />
        )
    })
}


export default function formAttEndereco({navigation}){

    const endereco = navigation.getParam('enderecoAAtualizar', null);

    const [rua, setRua] = useState(endereco.rua);
    const [numero, setNumero] = useState(endereco.numero);
    const [cep, setCep] = useState(endereco.cep);
    const [bairro, setBairro] = useState(endereco.bairro);
    const [cidade, setCidade] = useState(endereco.cidade);
    const [estado, setEstado] = useState(endereco.estado);
    const [keyEndereco, setKeyEndereco] = useState(endereco.keyEndereco);
    const [uIdEmpresa, setUIdEmpresa] = useState(endereco.uIdEmpresa);
    const [ufs, setUfs] = useState(['RJ', 'MG', 'SP', 'ES']);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const inputs = [];

    function focusField(index) {
        inputs[index].focus();
    }

    async function atualizaEndereco(){
        const endereco = {rua, numero, bairro, cep, cidade, estado, keyEndereco, uIdEmpresa};
        if(formTemCampoVazio(endereco)){
            Toast.show('Todos os campos são obrigatórios');
        }else{
            if(formatoDoCepEhValido(endereco.cep)){
                setIsLoading(true);
                EnderecoDao.atualizaEndereco(endereco)
                    .then(()=>{
                        Toast.show("Endereço atualizado com sucesso");
                        dispatch(attEnderecoNaLista(endereco));
                        setIsLoading(false);
                        navigation.goBack();
                    });
            }else{
                Toast.show('O Cep está incorreto');
            }
        }
        
    }
    
    if(isLoading){
        return(
            <Animacao>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </Animacao> 
        )
    }else{
        return(
            <Container>
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.formulario}
                    scrollEnabled={false}
                >
                    <Label width="undefined" marginRight="0">Rua:</Label>
                    <Input 
                        width="undefined" 
                        marginRight="0" 
                        placeholder="Rua" 
                        value={rua} 
                        onChangeText={rua=>setRua(rua)}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('bairro');
                        }}
                        blurOnSubmit={false}
                    />

                    <Label width="undefined" marginRight="0">Bairro:</Label>
                    <Input 
                        width="undefined" 
                        marginRight="0"  
                        placeholder="Bairro" 
                        value={bairro} 
                        onChangeText={bairro=>setBairro(bairro)}
                        ref={input => {
                            inputs.bairro = input;
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('cep');
                        }}
                        blurOnSubmit={false}
                    />
                    <Row>
                        <Label width="68%" marginRight="25px">CEP:</Label>
                        <Label width="26%" marginRight="0">Número:</Label>
                    </Row>
                    <Row>
                        <Input 
                            width="68%" 
                            marginRight="25px" 
                            maxLength={8} 
                            keyboardType='numeric' 
                            placeholder="CEP" 
                            value={cep} 
                            onChangeText={cep=>handlerNumberInput(setCep, cep)}
                            ref={input => {
                                inputs.cep = input;
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                focusField('numero');
                            }}
                            blurOnSubmit={false}
                        />
                        <Input 
                            width="26%" 
                            marginRight="0" 
                            maxLength={6} 
                            keyboardType='numeric'  
                            placeholder="Número" 
                            value={numero} 
                            onChangeText={numero=>handlerNumberInput(setNumero, numero)}
                            ref={input => {
                                inputs.numero = input;
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                focusField('cidade');
                            }}
                            blurOnSubmit={false}
                        />
                    </Row>
                    <Row>
                        <Label width="68%" marginRight="25px">Cidade:</Label>
                        <Label width="26%" marginRight="0">estado:</Label>
                    </Row>
                    <Row>
                        <Input 
                            width="68%" 
                            marginRight="25px"  
                            placeholder="Cidade" 
                            value={cidade} 
                            onChangeText={cidade=>setCidade(cidade)}
                            ref={input => {
                                inputs.cidade = input;
                            }}
                        />
                        <ViewPicker>
                            <Picker
                                selectedValue={estado}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    setEstado(itemValue)
                                }>
                                {renderizaUFs(ufs)}
                            
                            </Picker>
                        </ViewPicker>
                    </Row>
                    <Botao color="#612F74" marginTop="30px" onPress={()=>atualizaEndereco()} >
                        <Texto color="#fff" size="14px">Atualizar</Texto>
                    </Botao>
                </KeyboardAwareScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    formulario:{
        margin: 15,
        marginTop: 50,
        overflow: 'hidden'
    },
    picker:{
        height: 30, 
        width: '100%',
    },
})