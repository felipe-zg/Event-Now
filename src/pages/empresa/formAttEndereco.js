import React, {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, Picker, StatusBar} from 'react-native';
import Firebase from 'react-native-firebase';
import EnderecoDao from '../../daos/enderecoDao';
import {useDispatch} from 'react-redux';

import {attEnderecoNaLista} from '../../actions';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../animations/form_loading.json';

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


atualizaEndereco = async(endereco, navigation, dispatch, setIsLoading)=>{
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
    
    if(isLoading){
        return(
            <View style={styles.viewLoading}>
                <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
            </View> 
        )
    }else{
        return(
            <ScrollView>
                <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                <View style={styles.viewForm}>
                    <Text style={styles.label}>Rua:</Text>
                    <TextInput style={styles.input}  placeholder="Rua" value={rua} onChangeText={rua=>setRua(rua)}/>

                    <Text style={styles.label}>Bairro:</Text>
                    <TextInput style={styles.input}  placeholder="Bairro" value={bairro} onChangeText={bairro=>setBairro(bairro)}/>
                    <View style={styles.viewFlexRow}>
                        <Text style={styles.labelCep}>CEP:</Text>
                        <Text style={styles.labelNumero}>Número:</Text>
                    </View>
                    <View style={styles.viewFlexRow}>
                        <TextInput style={styles.inputCep} maxLength={8} keyboardType='numeric' placeholder="CEP" value={cep} onChangeText={cep=>handlerNumberInput(setCep, cep)}/>
                        <TextInput style={styles.inputNumero} maxLength={6} keyboardType='numeric'  placeholder="Número" value={numero} onChangeText={numero=>handlerNumberInput(setNumero, numero)}/>
                    </View>
                    <View style={styles.viewFlexRow}>
                        <Text style={styles.labelCidade}>Cidade:</Text>
                        <Text style={styles.labelEstado}>estado:</Text>
                    </View>
                    <View style={styles.viewFlexRow}>
                        <TextInput style={styles.inputCidade}  placeholder="Cidade" value={cidade} onChangeText={cidade=>setCidade(cidade)}/>
                        <View style={styles.viewPicker}>
                            <Picker
                                selectedValue={estado}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    setEstado(itemValue)
                                }>
                                {renderizaUFs(ufs)}
                            
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.viewBotao}>
                        <Button title="Atualizar" color="#612F74" onPress={()=>atualizaEndereco(enderecoAAtt = {rua, numero, bairro, cep, cidade, estado, keyEndereco, uIdEmpresa}, navigation, dispatch, setIsLoading)} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 20
    },
    viewForm:{
        margin: 15,
        marginTop: 50,
        overflow: 'hidden'
    },
    input:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    label:{
        color: '#612F74',
        fontWeight: 'bold',
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 10,
    },
    viewBotao:{
        marginTop: 30,
        borderRadius: 5,
        overflow: 'hidden'
    },
    viewFlexRow:{
        flexDirection: 'row',
    },
    labelCep:{
        width: '68%',
        marginRight: 25,
        color: '#612F74',
        fontWeight: 'bold',
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 10,
    },
    labelNumero:{
        borderBottomColor: "grey",
        width: '26%',
        color: '#612F74',
        fontWeight: 'bold',
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 10,
    },
    labelCidade:{
        width: '68%',
        marginRight: 25,
        color: '#612F74',
        fontWeight: 'bold',
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 10,
    },
    labelEstado:{
        width: '26%',
        color: '#612F74',
        fontWeight: 'bold',
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 10,
    },
    inputCep:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    inputNumero:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '26%',
    },
    inputCidade:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    picker:{
        height: 30, 
        width: '100%',
    },
    viewPicker:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '26%',
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})