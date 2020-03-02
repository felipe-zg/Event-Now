import React, {useState} from 'react';
import {
    View, 
    KeyboardAvoidingView, 
    ScrollView, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet, 
    Picker, 
    TouchableOpacity, 
    Image
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import DatePicker from 'react-native-datepicker';
import Lottie from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import EventoDao from '../../../../daos/eventoDao';
import StorageDao from '../../../../daos/storageDao';
import {addEventoNaListaAction} from '../../../../actions'
import loadingAnimated from '../../../../animations/form_loading.json';
import {dataAtual, dataAtualMaisUmAno} from '../../../../helpers';
import Botao from '../../../../components/Botao';
import Texto from '../../../../components/Texto';
import {
    Container,
    Animacao,
    Foto,
    Imagem,
    Label,
    Input,
    InputDescricao,
    ViewPicker,
    Row
} from './styles';


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


    function cadastraEvento(){
        if(!fotoFoiAdicionada(foto)){
            Toast.show("A foto é obrigatória");
            return;
        }
        if(formularioPossuiCamposVazios(evento)){
            Toast.show("Existem campos obrigátórios não preenchidos");
            return;
        }
        setIsLoading(true);
        const evento = {titulo, categoria, valIngresso, data, hora, keyEndereco, linkIngresso, descricao, uriFoto, keyEvento, uIdEmpresa};
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
                                        limpaEstadoDoFOrm();
                                        setIsLoading(false);
                                        navigation.replace("TelaDashboard");
                                    })
                            })
                    })
            })
    }

    function limpaEstadoDoFOrm(){
        setTitulo('');
        setCategoria('');
        setValIngresso('');
        setData('');
        setHora('');
        setKeyEndereco('');
        setLinkIngresso('');
        setDescricao('');
        setFoto(null);
    }

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

    return(
        <Container>
            {isLoading &&(
                <Animacao>
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </Animacao> 
            )}
            {!isLoading &&(
                <ScrollView>
                    {foto==null &&(
                        <Foto onPress={()=>addFoto()}>
                            <Icon name="photo" color="#000" size={40} />
                            <Text sstyle={styles.txtAddFoto}>Add Foto</Text>
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
                        contentContainerStyle={styles.viewForm}
                        scrollEnabled={false}
                    >
                        <Label width="undefined" marginRight="0px">Título:</Label>
                        <Input width="100%" placeholder="Título do evento *" value={titulo} onChangeText={titulo=>setTitulo(titulo)}/>
                        
                        <Label width="undefined" marginRight="0px">Categoria:</Label>
                        <ViewPicker>
                            <Picker
                                selectedValue={categoria}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCategoria(itemValue)
                                }>
                                <Picker.Item key={Math.random(10)} label="Selecione uma categoria *" value=''/>
                                {renderizaCategorias(categorias)}
                            </Picker>
                        </ViewPicker>
                        <Label width="undefined" marginRight="0px">Valor do ingresso:</Label>
                        <Input width="100%" placeholder="R$00,00" value={valIngresso} onChangeText={valIngresso=>setValIngresso(valIngresso)}/>

                        <Row>
                            <Label width="68%" marginRight="25px">Data:</Label>
                            <Label width="26%" marginRight="0px">Hora:</Label>
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
                            <Input width="26%" placeholder="hh:mm *" value={hora} onChangeText={hora=>setHora(hora)}/>
                        </Row>
                        
                        <Label width="undefined" marginRight="0px">Endereço:</Label>
                        <ViewPicker>
                            <Picker
                                style={styles.picker}
                                selectedValue={keyEndereco}
                                onValueChange={(itemValue, itemIndex) =>
                                    setKeyEndereco(itemValue)
                                }>
                                <Picker.Item key={Math.random(10)} label="Selecione o endereço *" value=''/>
                                {renderizaEnderecos(enderecosDaEmpresa)}
                            </Picker>
                        </ViewPicker>
                        
                        <Label width="undefined" marginRight="0px">Link para compra de ingresso:</Label>
                        <Input width="100%" placeholder="https://" value={linkIngresso} onChangeText={link=>setLinkIngresso(link)}/>
                        <Label width="undefined" marginRight="0px"l>Descrição:</Label>
                        <InputDescricao 
                            multiline={true} 
                            numberOfLines={5} 
                            maxLength={200} 
                            placeholder="descrição *" 
                            value={descricao} 
                            onChangeText={descricao=>setDescricao(descricao)}
                            returnKeyType="send"
                            onSubmitEditing={cadastraEvento}
                        />
                
                        <Botao color="#612F74" marginTop="30px" onPress={()=>cadastraEvento()}>
                            <Texto color="#fff" size="14">Cadastrar</Texto>
                        </Botao>
                    </KeyboardAwareScrollView>
                </ScrollView>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    txtAddFoto:{
        fontWeight: 'bold'
    },
    viewForm:{
        margin: 15,
        marginTop: 50,
        overflow: 'hidden'
    },
    inputData:{
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
})