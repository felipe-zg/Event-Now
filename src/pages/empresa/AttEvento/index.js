import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Picker, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EventoDao from '../../../daos/eventoDao';
import StorageDao from '../../../daos/storageDao';
import {atualizaEventoNaListaAction} from '../../../actions'
import loadingAnimated from '../../../animations/form_loading.json';
import {dataAtual, dataAtualMaisUmAno} from '../../../helpers';
import Botao from '../../../components/Botao';
import Texto from '../../../components/Texto';
import {
    Container,
    Foto,
    Imagem,
    Row,
    Label,
    Input,
    InputDescricao,
    ViewPicker
} from './styles';

formularioPossuiCamposVazios = (evento)=>{
    if(evento.titulo == '' || evento.categoria =='' || evento.data == '' || evento.hora =='' || evento.keyEndereco =='' || evento.descricao == ''){
        return true;
    }else{
        return false;
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

   

    function addFoto(){
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

    function atualizaEvento(){
        const evento = {titulo, categoria, valIngresso, data, hora, keyEndereco, linkIngresso, descricao, uriFoto, keyEvento, uIdEmpresa};
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

    return(
        <Container>
            {isLoading &&(
                <View style={styles.viewLoading}>
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View> 
            )}
            {!isLoading &&(
                <ScrollView>
                    {foto==null &&(
                        <Foto onPress={()=>addFoto()}>
                            <Imagem source={{ uri: evento.uriFoto}} />
                        </Foto>
                    )}

                    {foto!=null &&(
                        <Foto onPress={()=>addFoto()}>
                            <Imagem source={{ uri: foto.uri}} />
                        </Foto>
                    )}
            
                    <KeyboardAwareScrollView
                        style={{ backgroundColor: '#fff' }}
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.formulario}
                        scrollEnabled={false}
                    >
                        <Label width="undefined" marginRight="0">Título:</Label>
                        <Input width="undefined" marginRight="0" placeholder="Título do evento" value={titulo} onChangeText={titulo=>setTitulo(titulo)}/>
                        
                        <Label width="undefined" marginRight="0">Categoria:</Label>
                        <ViewPicker>
                            <Picker
                                value={categoria}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCategoria(itemValue)
                                }>
                                <Picker.Item key={Math.random(10)} label={evento.categoria} value={evento.categoria}/>
                                {renderizaCategorias(categorias)}
                            </Picker>
                        </ViewPicker>

                        <Label width="undefined" marginRight="0">Valor do ingresso:</Label>
                        <Input width="undefined" marginRight="0" placeholder="Valor do ingresso" value={valIngresso} onChangeText={valIngresso=>setValIngresso(valIngresso)}/>

                        <Row>
                            <Label width="68%" marginRight="25px">Data:</Label>
                            <Label width="26%" marginRight="0">Hora:</Label>
                        </Row>
                        <Row>
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
                            <Input width="26%" marginRight="0" placeholder="hh:mm" value={hora} onChangeText={hora=>setHora(hora)}/>
                        </Row>

                        <Label width="undefined" marginRight="0">Endereço:</Label>
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
                        
                        <Label width="undefined" marginRight="0">Link para compra de ingresso:</Label>
                        <Input width="undefined" marginRight="0" placeholder="https://" value={linkIngresso} onChangeText={link=>setLinkIngresso(link)}/>
                        <Label width="undefined" marginRight="0">Descrição:</Label>
                        <InputDescricao  
                            multiline={true} 
                            numberOfLines={5} 
                            maxLength={200} 
                            placeholder="descrição" 
                            value={descricao} 
                            onChangeText={descricao=>setDescricao(descricao)}
                            returnKeyType="send"
                            onSubmitEditing={atualizaEvento}
                        />
                
                        <Botao  color="#612F74" marginTop="30px" onPress={()=>atualizaEvento()}>
                            <Texto color="#fff" size="14px">Atualizar</Texto>
                        </Botao>
                    </KeyboardAwareScrollView>
                </ScrollView>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    formulario:{
        margin: 15,
        marginTop: 25,
        overflow: 'hidden'
    },
    inputData:{
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#612F74",
        width: '68%',
        marginRight: 25,
    },
    picker:{
        height: 50, 
        width: '100%',
    },
})