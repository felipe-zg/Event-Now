import React, {useState} from 'react';
import {View, KeyboardAvoidingView, ScrollView, Text, TextInput, Button, StyleSheet, Picker, TouchableOpacity, Image, StatusBar} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import ImagePicker from 'react-native-image-picker';

import EventoDao from '../../../daos/eventoDao';
import StorageDao from '../../../daos/storageDao';

import {addEventoNaListaAction} from '../../../actions'

import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import DatePicker from 'react-native-datepicker';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../../animations/form_loading.json';
import {dataAtual, dataAtualMaisUmAno} from '../../../helpers'

fotoFoiAdicionada = (foto)=>{
    if(foto == null){
        return false;
    }else{
        return true;
    }
}
formularioPossuiCamposVazios = (evento)=>{
    if(evento.titulo == '' || evento.categoria =='' || evento.data == '' || evento.hora =='' || evento.keyEndereco =='' || evento.descricao == ''){
        return true;
    }else{
        return false;
    }
}

limpaEstadoDoFOrm = (sets)=>{
    sets.setTitulo('');
    sets.setCategoria('');
    sets.setValIngresso('');
    sets.setData('');
    sets.setHora('');
    sets.setKeyEndereco('');
    sets.setLinkIngresso('');
    sets.setDescricao('');
    sets.setFoto(null);
}

cadastraEvento = (uId, evento, foto, navigation, dispatch, sets)=>{
    if(!fotoFoiAdicionada(foto)){
        Toast.show("A foto é obrigat´roa");
        return;
    }
    if(formularioPossuiCamposVazios(evento)){
        Toast.show("Existem campos obrigátórios não preenchidos");
        return;
    }
    sets.setIsLoading(true);
    EventoDao.insereEventoERetornaKey()
        .then(key =>{
            evento.keyEvento = key;
            StorageDao.salvaFoto(uId, key, foto.path)
                .then(()=>{
                    StorageDao.getUrlFoto(uId, key)
                        .then(uriFotoEvento=>{
                            evento.uriFoto = uriFotoEvento;
                            EventoDao.salvaEvento(evento)
                                .then(()=>{
                                    dispatch(addEventoNaListaAction(evento));
                                    limpaEstadoDoFOrm(sets);
                                    sets.setIsLoading(false);
                                    navigation.push("TelaDashboard");
                                })
                        })
                })
        })
}

renderizaEnderecos = (enderecos)=>{
    return enderecos.map((endereco) => {
        const label = endereco.rua + ", " + endereco.numero + " - " + endereco.cidade;
        return (
            <Picker.Item key={endereco.keyEndereco} label={label} value={endereco.keyEndereco} />
        )
    })
}

renderizaCategorias = (categorias)=>{
    return categorias.map((categoria) => {
        return (
            <Picker.Item key={Math.random(10)} label={categoria} value={categoria} />
        )
    })
}

addFoto = (setFoto)=>{
    const options = {
        noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
            let source = response;
            setFoto(source);
        }
    });
}

renderizaUFs = (ufs)=>{
    return ufs.map((uf) => {
        return (
            <Picker.Item key={uf} label={uf} value={uf} />
        )
    })
}



export default function formEvento({navigation}){

    const enderecosDaEmpresa = useSelector(state=>state.listaEnderecos.enderecos);
    const categorias = useSelector(state=>state.listaCategorias.categorias);
    const uId = useSelector(state=>state.uId);

    const dispatch = useDispatch();

    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [valIngresso, setValIngresso] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [keyEndereco, setKeyEndereco] = useState('');
    const [linkIngresso, setLinkIngresso] = useState('');
    const [descricao, setDescricao] = useState('');
    const [uriFoto, setUriFoto] = useState('');
    const [keyEvento, setKeyEvento] = useState('');
    const [uIdEmpresa, setUIdEmpresa] = useState(uId);
    const [foto, setFoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [estado, setEstado] = useState('');
    const [ufs, setUfs] = useState(['RJ', 'MG', 'SP', 'ES']);

    const sets = {setTitulo, setCategoria, setValIngresso, setData, setHora, setKeyEndereco, setLinkIngresso, setDescricao, setFoto, setIsLoading}

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            {isLoading &&(
                <View style={styles.viewLoading}>
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View> 
            )}
            {!isLoading &&(
                <ScrollView>
                    {foto==null &&(
                        <TouchableOpacity  style={styles.viewFoto} onPress={()=>addFoto(setFoto)}>
                            <Icon name="photo" color="#000" size={40} />
                            <Text sstyle={styles.txtAddFoto}>Add Foto</Text>
                        </TouchableOpacity>
                    )}

                    {foto!=null &&(
                        <View style={styles.viewFoto}>
                            <Image 
                                source={{ uri: foto.uri}}
                                style={styles.foto} />
                        </View>
                    )}

                    <KeyboardAvoidingView behavior="padding" style={styles.viewForm}>
                        <Text style={styles.label}>Título:</Text>
                        <TextInput style={styles.input} placeholder="Título do evento *" value={titulo} onChangeText={titulo=>setTitulo(titulo)}/>
                        
                        <Text style={styles.label}>Categoria:</Text>
                        <View style={styles.viewPicker}>
                            <Picker
                                selectedValue={categoria}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCategoria(itemValue)
                                }>
                                <Picker.Item key={Math.random(10)} label="Selecione uma categoria *" value=''/>
                                {renderizaCategorias(categorias)}
                            </Picker>
                        </View>
                        <Text style={styles.label}>Valor do ingresso:</Text>
                        <TextInput style={styles.input} placeholder="R$00,00" value={valIngresso} onChangeText={valIngresso=>setValIngresso(valIngresso)}/>

                        <View style={styles.viewFlexRow}>
                            <Text style={styles.labelData}>Data:</Text>
                            <Text style={styles.labelHora}>Hora:</Text>
                        </View>
                        <View style={styles.viewFlexRow}>
                            <DatePicker 
                                style={styles.inputData}
                                date={data}
                                mode="date"
                                placeholder="selecione a data"
                                format="DD-MM-YYYY"
                                minDate={dataAtual()}
                                maxDate={dataAtualMaisUmAno()}
                                confirmBtnText="confirmar"
                                cancelBtnText="Cancelar"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderWidth: 0
                                    }
                                }}
                                onDateChange={(date) => {setData(date)}}
                            />
                            <TextInput style={styles.inputHora} placeholder="hh:mm *" value={hora} onChangeText={hora=>setHora(hora)}/>
                        </View>
                        
                        <Text style={styles.label}>Endereço:</Text>
                        <View style={styles.viewPicker}>
                            <Picker
                                style={styles.picker}
                                selectedValue={keyEndereco}
                                onValueChange={(itemValue, itemIndex) =>
                                    setKeyEndereco(itemValue)
                                }>
                                <Picker.Item key={Math.random(10)} label="Selecione o endereço *" value=''/>
                                {renderizaEnderecos(enderecosDaEmpresa)}
                            </Picker>
                        </View>
                        
                        <Text style={styles.label}>Link para compra de ingresso:</Text>
                        <TextInput style={styles.input} placeholder="https://" value={linkIngresso} onChangeText={link=>setLinkIngresso(link)}/>
                        <Text style={styles.label}>Descrição:</Text>
                        <TextInput multiline={true} numberOfLines={5} maxLength={200} style={styles.inputDescricao} placeholder="descrição *" value={descricao} onChangeText={descricao=>setDescricao(descricao)}/>
                
                        <View style={styles.viewBotao}>
                            <Button title="Cadastrar" color="#612F74" onPress={()=>cadastraEvento(uId, evento = {titulo, categoria, valIngresso, data, hora, keyEndereco, linkIngresso, descricao, uriFoto, keyEvento, uIdEmpresa}, foto, navigation, dispatch, sets)} />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    viewFoto:{
        height: 150,
        margin: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#612F74',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    foto:{
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    txtAddFoto:{
        fontWeight: 'bold'
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
        borderBottomColor: "grey"
    },
    inputDescricao:{
        paddingBottom: 0,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        height: 150,
        textAlignVertical: 'top',
    },
    viewBotao:{
        marginTop: 30,
        borderRadius: 5,
        overflow: 'hidden'
    },
    viewFlexRow:{
        flexDirection: 'row',
        marginTop: 5,
    },
    inputData:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    inputHora:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '26%',
    },
    picker:{
        height: 50, 
        width: '100%',
    },
    viewPicker:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '100%',
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    label:{
        color: '#612F74',
        marginBottom: 0,
        marginTop: 10,
    },
    labelData:{
        width: '68%',
        marginRight: 25,
        color: '#612F74',
        marginBottom: 0,
        marginTop: 10,
    },
    labelHora:{
        width: '26%',
        color: '#612F74',
        marginBottom: 0,
        marginTop: 10,
    },
})