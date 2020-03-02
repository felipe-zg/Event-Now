import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, Picker} from 'react-native';
import Firebase from 'react-native-firebase';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';
import Geocoder from 'react-native-geocoding';
import Lottie from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import EnderecoDao from '../../../../daos/enderecoDao';
import {addEnderecoNaListaAction} from '../../../../actions'
import loadingAnimated from '../../../../animations/form_loading.json';
import {GOOGLE_MAPS_APIKEY} from '../../../../configs';
import Botao from '../../../../components/Botao';
import Texto from '../../../../components/Texto';
import {
    Container,
    Animacao,
    Input,
    ViewPicker
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


export default function formEndereco({navigation}){

    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('RJ');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [keyEndereco, setKeyEndereco] = useState('');
    const [uIdEmpresa, setUIdEmpresa] = useState('');
    const [ufs, setUfs] = useState(['RJ', 'MG', 'SP', 'ES']);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        const usuarioLogado = Firebase.auth().currentUser;
        if(usuarioLogado != null && uIdEmpresa =='')
           setUIdEmpresa(usuarioLogado.uid);
    },[]);

    const inputs = [];

    function focusField(index) {
        inputs[index].focus();
    }

    function limpaFormulario(){
        setRua('');
        setNumero('');
        setCep('');
        setBairro('');
        setCidade('');
        setEstado('');
        setKeyEndereco('');
        setUIdEmpresa('');
    }

    async function realizaCadastro(){
        const endereco = {rua, numero, bairro, cep, cidade, estado,latitude, longitude, keyEndereco, uIdEmpresa};

        if(formTemCampoVazio(endereco)){
            Toast.show('Todos os campos são obrigatórios');
        }else{
            if(formatoDoCepEhValido(endereco.cep)){
                setIsLoading(true);
                const enderecoMaps = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro} - ${endereco.cidade}, ${endereco.estado}`
                Geocoder.init(GOOGLE_MAPS_APIKEY); 
                Geocoder.from(enderecoMaps)
                    .then(json => {
                        var location = json.results[0].geometry.location;
                        endereco.latitude = location.lat;
                        endereco.longitude = location.lng;
                        EnderecoDao.salvaEndereco(endereco).then(()=>{
                            Toast.show("Novo endereço cadastrado com sucesso");
                            limpaFormulario();
                            dispatch(addEnderecoNaListaAction(endereco));
                            setIsLoading(false);
                            navigation.goBack();
                        });
                    })
                    .catch(error => {
                        Toast.show("Endereço não existe");
                        setIsLoading(false);
                        return;
                    }); 
            }else{
                Toast.show('O Cep está incorreto');
            }
        }
    }

    return(
        <Container>
            {isLoading &&(
                <Animacao>
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </Animacao> 
            )}
            {!isLoading &&(
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.viewForm}
                    scrollEnabled={false}
                >
                    <Input 
                        width="100%" 
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
                    <Input 
                        width="100%" 
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
                    <View style={styles.viewFlexRow}>
                        <Input 
                            width="68%" 
                            marginRight="
                            25px" maxLength={8} 
                            numeric 
                            keyboardType="numeric"  
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
                            numeric 
                            keyboardType="numeric"  
                            placeholder="Número" 
                            value={numero} 
                            onChangeText={numero=>handlerNumberInput(setNumero ,numero)}
                            ref={input => {
                                inputs.numero = input;
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                focusField('cidade');
                            }}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.viewFlexRow}>
                        <Input 
                            width="68%" 
                            marginRight="25px" 
                            maxLength={30} 
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
                                }
                                ref={input => {
                                    inputs.uf = input;
                                }}
                            >
                                {renderizaUFs(ufs)}
                            
                            </Picker>
                        </ViewPicker>
                    </View>
                    <Botao marginTop="30px" color="#612F74" onPress={()=>realizaCadastro()} >
                        <Texto color="#fff" size="14">Cadastrar</Texto>
                    </Botao>
                </KeyboardAwareScrollView>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    viewForm:{
        margin: 15,
        marginTop: 50,
        overflow: 'hidden'
    },
    viewFlexRow:{
        flexDirection: 'row',
    },
    picker:{
        height: 50, 
        width: '100%',
    },
})