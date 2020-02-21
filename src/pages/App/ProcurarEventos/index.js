import React, {useState, useEffect} from 'react';
import {ScrollView ,View, TouchableOpacity, Text, TextInput, Button ,StyleSheet, Picker, Image} from 'react-native';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';

import EventoDao from '../../../daos/eventoDao';
import EnderecoDao from '../../../daos/enderecoDao';
import loadingAnimated from '../../../animations/sad.json';
import Botao from '../../../components/Botao'
import Texto from '../../../components/Texto';
import {
    Container,
    BtnFiltros,
    Formulario,
    BtnEsconderFiltros,
    Label,
    Input,
    Categoria,
    PickerCategoria,
    Evento,
    Foto,
    NotFound,
    Animanao
} from './styles';

aplicaFiltroData = (eventosFiltrados, filtro)=>{
    var listaFinal = [];
    eventosFiltrados.map(evento=>{
        if(evento.data == filtro){
            listaFinal = [...listaFinal, evento];
        }
    });

    return listaFinal;
}

aplicaFiltroCategoria = (eventosFiltrados, filtro)=>{
    var listaFinal = [];
    eventosFiltrados.map(evento=>{
        if(evento.categoria == filtro){
            listaFinal = [...listaFinal, evento];
        }
    });

    return listaFinal;
}

aplicaFiltroBairro = (eventosFiltrados, enderecos, filtro)=>{
    var listaFinal = [];
    eventosFiltrados.map(evento=>{
        enderecos.map(endereco=>{
            if(evento.keyEndereco == endereco.keyEndereco){
                if(endereco.bairro.toUpperCase() == filtro.trim().toUpperCase()){
                    listaFinal = [...listaFinal, evento];
                }
            }
        });
    });
    return listaFinal;
}

aplicaFiltroCidade = (eventosFiltrados, enderecos, filtro)=>{
    var listaFinal = [];
    eventosFiltrados.map(evento=>{
        enderecos.map(endereco=>{
            if(evento.keyEndereco == endereco.keyEndereco){
                if(endereco.cidade.toUpperCase() == filtro.trim().toUpperCase()){
                    listaFinal = [...listaFinal, evento];
                }
            }
        });
    });
    return listaFinal;
 
}

aplicaFiltroTurno = (eventosFiltrados, filtro)=>{
    var listaFinal = [];

    switch(filtro){
        case '1':
            eventosFiltrados.map(evento=>{
                const hora = evento.hora.charAt(0)+evento.hora.charAt(1);
                console.warn(hora);
                if(hora >= 5 && hora<12){
                    listaFinal = [...listaFinal, evento];
                }
            });
            return listaFinal;
        case '2':
            eventosFiltrados.map(evento=>{
                const hora = evento.hora.charAt(0)+evento.hora.charAt(1);
                if(hora >= 12 && hora<18){
                    listaFinal = [...listaFinal, evento];
                }
            });
            return listaFinal;
        case '3':
            eventosFiltrados.map(evento=>{
                const hora = evento.hora.charAt(0)+evento.hora.charAt(1);
                if(hora >= 18 || (hora >=0 && hora <5)){
                    listaFinal = [...listaFinal, evento];
                }
            });
            return listaFinal;
        default:
    }
}

renderizaCategorias = (categorias)=>{
    return categorias.map((categoria) => {
        return (
            <Picker.Item key={Math.random(10)} label={categoria} value={categoria} />
        )
    })
}

formTemCamposPreenchidos = (filtro)=>{
    if(filtro.cidade == '' && filtro.bairro == '' && filtro.categoria =='' && filtro.data == '' && filtro.turno =='0')
        return false;
    else return true;
}

comecaPorData = (filtro)=>{
    var eventosFiltrados = [];
    EventoDao.buscaEventosPorData(filtro.data)
        .then(eventos=>eventosFiltrados = [...eventosFiltrados, eventos]);
    
}



export default function procurarEvento({navigation}){
    const [escondeForm, setEscondeForm] = useState(true);
    const [escondeBotao, setEscondeBotao] = useState(false);

    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [categoria, setCategoria] = useState('');
    const [data, setData] = useState('');
    const [turno, setTurno] = useState('');

    const [eventosFiltrados, setEventosFiltrados] = useState(null);
    const [eventos, setEventos] = useState(null);
    const [enderecos, setEnderecos] = useState(null);
    const categorias = useSelector(state=>state.listaCategorias.categorias);


    useEffect(()=>{ 
        EventoDao.buscaEventos()
            .then(eventos=>{
                setEventosFiltrados(eventos);
                setEventos(eventos);
            });
        EnderecoDao.buscaTodosOsEnderecos()
            .then(enderecosRetornados=>{
                setEnderecos(enderecosRetornados);
            });
    },[]);

    function toggleFormulario(){
        setEscondeForm(!escondeForm);
        setEscondeBotao(!escondeBotao);
    }

    function renderizaEventos(){
        if(eventosFiltrados.length>0){
            return eventosFiltrados.map(evento=>{
                return (
                    <Evento key={evento.keyEvento} onPress={()=>navigation.navigate("TelaEvento", {evento})}>
                        <Foto source={{ uri: evento.uriFoto}}/>
                        <Text numberOfLines={1} style={{color: '#fff'}}>{evento.titulo}</Text>
                    </Evento>
                )
            })
        }else{
            return(
                <NotFound>
                    <Animanao>
                        <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                    </Animanao>
                    <Text>Nenhum evento encontrado</Text>
                </NotFound> 
            )
        }
    }

    async function handleProcurar(filtro){
        if(formTemCamposPreenchidos(filtro)){
            setEventosFiltrados(await aplicaFiltros(filtro));
        }else{
            setEventosFiltrados(eventos);
        }
        toggleFormulario();
    }

    async function aplicaFiltros(filtro){
        var filtrados = eventos;
        filtrados =  await filtro.cidade!=''?aplicaFiltroCidade(filtrados, enderecos, filtro.cidade):filtrados;
        filtrados =  await filtro.bairro!=''?aplicaFiltroBairro(filtrados, enderecos, filtro.bairro):filtrados;
        filtrados =  await filtro.data!=''?aplicaFiltroData(filtrados, filtro.data):filtrados;
        filtrados =  await filtro.categoria!=''?aplicaFiltroCategoria(filtrados, filtro.categoria):filtrados;
        //eventosFiltrados =  await filtro.turno!='0'?aplicaFiltroTurno(eventosFiltrados, filtro.turno):eventosFiltrados;
        return filtrados;
    }
    

    return( 
        <Container>
            <BtnFiltros style={escondeBotao?styles.escondeView:null} onPress={()=>toggleFormulario()}>
                    <Texto color="#fff" size="12px">filtros<FontawesomeIcon name="filter" color="#fff" size={15}/></Texto>
            </BtnFiltros>
            <Formulario style={escondeForm?styles.escondeView:null}>
               
                <BtnEsconderFiltros onPress={()=>toggleFormulario()}>
                    <Text style={styles.txtEsconder}>Esconder</Text><FontawesomeIcon name="angle-double-up" color="#FF6347" size={25}/>
                </BtnEsconderFiltros>
                

                <Label>Cidade:</Label>
                <Input placeholder="Digite aqui" value={cidade} onChangeText={cidade=>setCidade(cidade)}/>

                <Label>Bairro:</Label>
                <Input placeholder="Digite aqui" value={bairro} onChangeText={bairro=>setBairro(bairro)}/>

                <Label>Categoria:</Label>
                <Categoria>
                    <PickerCategoria
                        selectedValue={categoria}
                        onValueChange={(itemValue, itemIndex) =>
                            setCategoria(itemValue)
                        }>
                        <Picker.Item key={Math.random(10)} label="Selecione uma categoria *" value=''/>
                        {renderizaCategorias(categorias)}
                    </PickerCategoria>
                </Categoria>

                <Label>Data:</Label>
                <View>
                    <DatePicker 
                        style={styles.inputData}
                        date={data}
                        mode="date"
                        placeholder="selecione a data"
                        format="DD-MM-YYYY"
                        minDate="25/11/2019"
                        maxDate="25/11/2025"
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
                </View>

                <Botao marginTop="20px" color="#FF6347" onPress={()=>handleProcurar(filtro={cidade, bairro, categoria, data, turno})}>
                    <Texto color="#fff" size="13px">APLICAR</Texto>
                </Botao>
            </Formulario>

            <ScrollView>
                {eventosFiltrados != null &&
                    renderizaEventos()
                }
            </ScrollView>

        </Container>
    );
}

const styles = StyleSheet.create({
    txtEsconder:{
        color:"#FF6347",
        fontSize: 10,
        marginHorizontal: 5
    },
    escondeView:{
        height: 0,
        opacity: 0,
    },
    inputData:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
})

