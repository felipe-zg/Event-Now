import React, {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet, Picker, StatusBar} from 'react-native';
import Firebase from 'react-native-firebase';
import EnderecoDao from '../../../daos/enderecoDao';
import {useDispatch} from 'react-redux';
import {addEnderecoNaListaAction} from '../../../actions'
import Toast from 'react-native-root-toast';
import Geocoder from 'react-native-geocoding';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../../animations/form_loading.json';


limpaFormulario = (setStates)=>{
    setStates.setRua('');
    setStates.setNumero('');
    setStates.setCep('');
    setStates.setBairro('');
    setStates.setCidade('');
    setStates.setEstado('');
    setStates.setKeyEndereco('');
    setStates.setUIdEmpresa('');
}

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

realizaCadastro = async(endereco, navigation, dispatch, setStates)=>{
    if(formTemCampoVazio(endereco)){
        Toast.show('Todos os campos são obrigatórios');
    }else{
        if(formatoDoCepEhValido(endereco.cep)){
            setStates.setIsLoading(true);
            const GOOGLE_MAPS_APIKEY = 'AIzaSyDMXuA3kgjioFdpiBeJNEoGp_B_p0WfYNs';
            const enderecoMaps = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro} - ${endereco.cidade}, ${endereco.estado}`
            Geocoder.init(GOOGLE_MAPS_APIKEY); 
            Geocoder.from(enderecoMaps)
                .then(json => {
                    var location = json.results[0].geometry.location;
                    endereco.latitude = location.lat;
                    endereco.longitude = location.lng;
                    EnderecoDao.salvaEndereco(endereco).then(()=>{
                        Toast.show("Novo endereço cadastrado com sucesso");
                        limpaFormulario(setStates);
                        dispatch(addEnderecoNaListaAction(endereco));
                        setStates.setIsLoading(false);
                        navigation.goBack();
                    });
                })
                .catch(error => {
                    Toast.show("Endereço não existe");
                    setStates.setIsLoading(false);
                    return;
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

    const setStates = {setRua, setNumero, setCep, setBairro, setCidade, setEstado, setKeyEndereco, setUIdEmpresa, setIsLoading};

    const usuarioLogado = Firebase.auth().currentUser;
    if(usuarioLogado != null && uIdEmpresa =='')
       setUIdEmpresa(usuarioLogado.uid);

    const dispatch = useDispatch();

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            {isLoading &&(
                <View style={styles.viewLoading}>
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View> 
            )}
            {!isLoading &&(
                <ScrollView style={styles.viewForm}>
                    <TextInput style={styles.input}  placeholder="Rua" value={rua} onChangeText={rua=>setRua(rua)}/>
                    <TextInput style={styles.input}  placeholder="Bairro" value={bairro} onChangeText={bairro=>setBairro(bairro)}/>
                    <View style={styles.viewFlexRow}>
                        <TextInput maxLength={8} numeric value keyboardType="numeric" style={styles.inputCep} placeholder="CEP" value={cep} onChangeText={cep=>handlerNumberInput(setCep, cep)}/>
                        <TextInput maxLength={6} numeric value keyboardType="numeric" style={styles.inputNumero} placeholder="Número" value={numero} onChangeText={numero=>handlerNumberInput(setNumero ,numero)}/>
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
                        <Button title="Cadastrar" color="#612F74" onPress={()=>realizaCadastro(endereco = {rua, numero, bairro, cep, cidade, estado,latitude, longitude, keyEndereco, uIdEmpresa}, navigation, dispatch, setStates)} />
                    </View>
                </ScrollView>
            )}
        </View>
    );
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
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    viewBotao:{
        marginTop: 30,
        borderRadius: 5,
        overflow: 'hidden'
    },
    viewFlexRow:{
        flexDirection: 'row',
    },
    inputCep:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    inputNumero:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '26%',
    },
    inputCidade:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    picker:{
        height: 50, 
        width: '100%',
    },
    viewPicker:{
        paddingBottom: 0,
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