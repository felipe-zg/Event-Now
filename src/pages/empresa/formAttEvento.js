import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Picker, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, StatusBar} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';

import EventoDao from '../../daos/eventoDao';
import StorageDao from '../../daos/storageDao';

import {atualizaEventoNaListaAction} from '../../actions'
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../animations/form_loading.json';

import {dataAtual, dataAtualMaisUmAno} from '../../helpers';

formularioPossuiCamposVazios = (evento)=>{
    if(evento.titulo == '' || evento.categoria =='' || evento.data == '' || evento.hora =='' || evento.keyEndereco =='' || evento.descricao == ''){
        return true;
    }else{
        return false;
    }
}

atualizaEvento = (uId, evento, foto, navigation, dispatch, setIsLoading)=>{
        if(formularioPossuiCamposVazios(evento)){
            Toast.show("Existem campos obrigátórios não preenchidos");
            return;
        }
        setIsLoading(true);
        if(foto!=null){
            StorageDao.deletaFoto(evento.uriFoto);
            StorageDao.salvaFoto(uId, evento.keyEvento, foto.path)
            .then(()=>{
                StorageDao.getUrlFoto(uId, evento.keyEvento)
                    .then(uriFotoEvento=>{
                        evento.uriFoto = uriFotoEvento;
                        EventoDao.salvaEvento(evento)
                            .then(()=>{
                                Toast.show("Evento atualizado com sucesso !");
                                dispatch(atualizaEventoNaListaAction(evento));
                                setIsLoading(false);
                                navigation.pop(2);
                            })
                    })
            })
        }else{
            EventoDao.salvaEvento(evento)
                .then(()=>{
                    Toast.show("Evento atualizado com sucesso !");
                    dispatch(atualizaEventoNaListaAction(evento));
                    setIsLoading(false);
                    navigation.pop(2);
                })
        }
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



export default function formAttEvento({navigation}){

    const enderecosDaEmpresa = useSelector(state=>state.listaEnderecos.enderecos);
    const categorias = useSelector(state=>state.listaCategorias.categorias);
    const uId = useSelector(state=>state.uId);

    const dispatch = useDispatch();

    var evento = navigation.getParam('eventoAAtualizar', null);
 

    const [titulo, setTitulo] = useState(evento.titulo);
    const [categoria, setCategoria] = useState(evento.categoria);
    const [valIngresso, setValIngresso] = useState(evento.valIngresso);
    const [data, setData] = useState(evento.data);
    const [hora, setHora] = useState(evento.hora);
    const [keyEndereco, setKeyEndereco] = useState(evento.keyEndereco);
    const [linkIngresso, setLinkIngresso] = useState(evento.linkIngresso);
    const [descricao, setDescricao] = useState(evento.descricao);
    const [uriFoto, setUriFoto] = useState(evento.uriFoto);
    const [keyEvento, setKeyEvento] = useState(evento.keyEvento);
    const [uIdEmpresa, setUIdEmpresa] = useState(uId);
    const [foto, setFoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
                            <Image 
                                source={{ uri: evento.uriFoto}}
                                style={styles.foto} />
                        </TouchableOpacity>
                    )}

                    {foto!=null &&(
                        <TouchableOpacity  style={styles.viewFoto} onPress={()=>addFoto(setFoto)}>
                            <Image 
                                source={{ uri: foto.uri}}
                                style={styles.foto} />
                        </TouchableOpacity>
                    )}
            
                    <KeyboardAvoidingView style={styles.viewForm} behavior='padding'>
                        <Text style={styles.label}>Título:</Text>
                        <TextInput style={styles.input} placeholder="Título do evento" value={titulo} onChangeText={titulo=>setTitulo(titulo)}/>
                        
                        <Text style={styles.label}>Categoria:</Text>
                        <View style={styles.viewPicker}>
                            <Picker
                                value={categoria}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCategoria(itemValue)
                                }>
                                <Picker.Item key={Math.random(10)} label={evento.categoria} value={evento.categoria}/>
                                {renderizaCategorias(categorias)}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Valor do ingresso:</Text>
                        <TextInput style={styles.input} placeholder="Valor do ingresso" value={valIngresso} onChangeText={valIngresso=>setValIngresso(valIngresso)}/>

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
                            <TextInput style={styles.inputHora} placeholder="hh:mm" value={hora} onChangeText={hora=>setHora(hora)}/>
                        </View>

                        <Text style={styles.label}>Endereço:</Text>
                        <View style={styles.viewPicker}>
                            <Picker
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    setKeyEndereco(itemValue)
                                }>
                                <Picker.Item key={Math.random(10)} label="endereço atual" value={keyEndereco}/>
                                {renderizaEnderecos(enderecosDaEmpresa)}
                            </Picker>
                        </View>
                        
                        <Text style={styles.label}>Link para compra de ingresso:</Text>
                        <TextInput style={styles.input} placeholder="https://" value={linkIngresso} onChangeText={link=>setLinkIngresso(link)}/>
                        <Text style={styles.label}>Descrição:</Text>
                        <TextInput  multiline={true} numberOfLines={5} maxLength={200} style={styles.inputDescricao} placeholder="descrição" value={descricao} onChangeText={descricao=>setDescricao(descricao)}/>
                
                        <View style={styles.viewBotao}>
                            <Button title="Atualizar" color="#612F74" onPress={()=>atualizaEvento(uId, evento = {titulo, categoria, valIngresso, data, hora, keyEndereco, linkIngresso, descricao, uriFoto, keyEvento, uIdEmpresa}, foto, navigation, dispatch, setIsLoading)} />
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
        borderWidth: 3,
        borderColor: '#612F74',
        borderRadius: 5
    },
    foto:{
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    txtPrincipal:{
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 20
    },
    viewForm:{
        margin: 15,
        marginTop: 25,
        overflow: 'hidden'
    },
    input:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#612F74",
    },
    inputDescricao:{
        paddingBottom: 0,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        height: 150,
        textAlignVertical: 'top',
    },
    label:{
        color: '#612F74',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 10,
    },
    labelData:{
        width: '68%',
        marginRight: 25,
        color: '#612F74',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 10,
    },
    labelHora:{
        width: '26%',
        color: '#612F74',
        fontWeight: 'bold',
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
    inputData:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#612F74",
        width: '68%',
        marginRight: 25,
    },
    inputHora:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#612F74",
        width: '26%',
    },
    picker:{
        height: 50, 
        width: '100%',
    },
    viewPicker:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#612F74",
        width: '100%',
    },
    viewLoading:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})