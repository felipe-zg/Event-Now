import React, {Component, useState, useEffect} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, Picker} from 'react-native';
import Firebase from 'react-native-firebase';
import Geocoder from 'react-native-geocoding';
import Lottie from 'lottie-react-native';
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import EnderecoDao from '../../../daos/enderecoDao';
import loadingAnimated from '../../../animations/form_loading.json';
import {GOOGLE_MAPS_APIKEY} from '../../../configs';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import{
    Animacao,
    Input,
    Row,
    ViewPicker
}from './styles';

export default function CadastroEndereco({navigation}){
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('RJ');
    const [keyEndereco, setKeyEndereco] = useState('');
    const [uIdEmpresa, setUIdEmpresa] = useState('');
    const [UFs, setUFs] = useState(['RJ', 'SP', 'MG', 'ES']);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const usuarioLogado = Firebase.auth().currentUser;
        if(usuarioLogado != null)
            setUIdEmpresa(usuarioLogado.uid);
    },[])

    const inputs = [];

    function focusField(index) {
        inputs[index].focus();
    }

    async function realizaCadastro(){
        if(formularioPossuiCampoVazio()){
            Toast.show("todos os campos são obrigatórios");
            return;
        }
        setIsLoading(true);
        const enderecoMaps = `${rua}, ${numero}, ${bairro} - ${cidade}, ${estado}`;
        Geocoder.init(GOOGLE_MAPS_APIKEY); 
        Geocoder.from(enderecoMaps)
            .then(json => {
                var location = json.results[0].geometry.location;
                let latitude = location.lat;
                let longitude = location.lng;
                EnderecoDao.salvaEndereco(endereco = {rua, numero, bairro, cep, cidade, estado, latitude, longitude, keyEndereco, uIdEmpresa});
                setIsLoading(false);
                navigation.replace('TelaDashboard');
            })
            .catch(error => {
                Toast.show("Endereço não existe");
                setIsLoading(false);
                return;
            });    
    }

    function formularioPossuiCampoVazio(){
        if(rua=='' || bairro=='' || cep=='' || numero=='' || cidade=='' || estado=='' )
            return true;
        return false;
    }

    function renderizaUFs(){
        return UFs.map((uf) => {
            return (
                <Picker.Item key={uf} label={uf} value={uf} />
            )
        })
    }
    
    function formatoDoCepEhValido(){
        if(cep.length < 8){
            return false
        }else{
            return true;
        }
    }
    
    function handlerNumberInput(set, valor){
        const char = valor.charAt(valor.length-1)
        if(!isNaN(parseFloat(char)) && isFinite(char)){
            set(valor)
        }
        if(char.length == 0) set('');
    }

    if(isLoading){
        return(
            <Animacao>
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </Animacao> 
        )
    }else{
        return(
            <ScrollView>
                <Text style={styles.txtPrincipal}>Cadastre o endereço principal da empresa</Text>
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.formulario}
                    scrollEnabled={false}
                >
                    <Input width="undefined" marginRight="0" 
                        autoCapitalize="sentences"
                        placeholder="Rua" 
                        value={rua} 
                        onChangeText={rua=>setRua(rua)}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusField('bairro');
                        }}
                        blurOnSubmit={false}
                    />
                    <Input width="undefined" marginRight="0" 
                        autoCapitalize="sentences"
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
                        <Input width="68%" marginRight="25px" 
                            maxLength={8} keyboardType='number-pad' 
                            placeholder="CEP" value={cep} 
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
                        <Input width="26%" marginRight="0" 
                            maxLength={6} 
                            keyboardType='number-pad'  
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
                        <Input width="68%" marginRight="25px" 
                            autoCapitalize="words"
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
                                {renderizaUFs()}
                            
                            </Picker>
                        </ViewPicker>
                    </Row>
                    <Botao  color="#612F74" marginTop="30px" onPress={()=>realizaCadastro()}>
                        <Texto color="#fff" size="14px">Cdastrar</Texto>
                    </Botao>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    txtPrincipal:{
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20
    },
    formulario:{
        margin: 15,
        marginTop: 50,
        overflow: 'hidden'
    },
    picker:{
        height: 50, 
        width: '100%',
    },
})