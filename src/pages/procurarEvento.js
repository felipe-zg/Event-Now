import React, {useState} from 'react';
import {ScrollView ,View, TouchableOpacity, Text, TextInput, Button ,StyleSheet, Picker, Image, StatusBar} from 'react-native';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-root-toast';
import EventoDao from '../daos/eventoDao';
import EnderecoDao from '../daos/enderecoDao';


import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/sad.json';


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

renderizaEventos = (eventos, navigation)=>{
    if(eventos.length>0){
        return eventos.map(evento=>{
            return (
                <TouchableOpacity style={styles.viewEvento} key={evento.keyEvento} onPress={()=>navigation.navigate("TelaEvento", {evento})}>
                    <Image 
                        source={{ uri: evento.uriFoto}}
                        style={styles.foto} />
                    <Text numberOfLines={1} style={{color: '#fff'}}>{evento.titulo}</Text>
                </TouchableOpacity>
            )
        })
    }else{
        return(
            <View style={styles.viewNotFound}>
                <View style={styles.viewAnimacao}>
                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                </View>
                <Text>Nenhum evento encontrado</Text>
            </View> 
        )
    }
}

abreFormulario = (setEscondeForm, setEscondeBotao)=>{
    setEscondeForm(false);
    setEscondeBotao(true);
}

fechaFormulario = (setEscondeForm, setEscondeBotao)=>{
    setEscondeForm(true);
    setEscondeBotao(false);
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

aplicaFiltros = async(eventos, enderecos, filtro)=>{
    var eventosFiltrados = eventos;
    eventosFiltrados =  await filtro.cidade!=''?aplicaFiltroCidade(eventosFiltrados, enderecos, filtro.cidade):eventosFiltrados;
    eventosFiltrados =  await filtro.bairro!=''?aplicaFiltroBairro(eventosFiltrados, enderecos, filtro.bairro):eventosFiltrados;
    eventosFiltrados =  await filtro.data!=''?aplicaFiltroData(eventosFiltrados, filtro.data):eventosFiltrados;
    eventosFiltrados =  await filtro.categoria!=''?aplicaFiltroCategoria(eventosFiltrados, filtro.categoria):eventosFiltrados;
    //eventosFiltrados =  await filtro.turno!='0'?aplicaFiltroTurno(eventosFiltrados, filtro.turno):eventosFiltrados;
    return eventosFiltrados;
}

handleProcurar = async(eventos, enderecos,  setEventosFiltrados, filtro, setEscondeForm, setEscondeBotao)=>{
    // VALIDA FORM ( PELO MENOS UM CAMPO DEVE SER PREENCHIDO)
    if(formTemCamposPreenchidos(filtro)){
        setEventosFiltrados(await aplicaFiltros(eventos, enderecos, filtro));
    }else{
        setEventosFiltrados(eventos);
    }
    setEscondeForm(true);
    setEscondeBotao(false);
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


    if(eventosFiltrados == null){
        EventoDao.buscaEventos()
            .then(eventos=>{
                setEventosFiltrados(eventos);
                setEventos(eventos);
            });
        EnderecoDao.buscaTodosOsEnderecos()
            .then(enderecosRetornados=>{
                setEnderecos(enderecosRetornados);
            });
    }

    return( 
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            <TouchableOpacity style={escondeBotao?styles.escondeView:styles.viewBotao} onPress={()=>abreFormulario(setEscondeForm, setEscondeBotao)}>
                    <Text style={styles.txtFiltros}>filtros<FontawesomeIcon name="filter" color="#fff" size={15}/></Text>
            </TouchableOpacity>
            <View style={escondeForm?styles.escondeView:styles.viewForm}>
                <View style={styles.viewLinkEsconder}>
                    <TouchableOpacity style={styles.viewLinkEsconder} onPress={()=>fechaFormulario(setEscondeForm, setEscondeBotao)}>
                        <Text style={styles.txtEsconder}>Esconder</Text><FontawesomeIcon name="angle-double-up" color="#FF6347" size={25}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.txt}>Cidade:</Text>
                <TextInput style={styles.input} placeholder="Digite aqui" value={cidade} onChangeText={cidade=>setCidade(cidade)}/>

                <Text style={styles.txt}>Bairro:</Text>
                <TextInput style={styles.input} placeholder="Digite aqui" value={bairro} onChangeText={bairro=>setBairro(bairro)}/>

                <Text style={styles.txt}>Categoria:</Text>
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

                <Text style={styles.txt}>Data:</Text>
                <View style={styles.viewData}>
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

               

                <View style={styles.viewBtnProcurar}>
                    <Button title="Aplicar" color="#FF6347" onPress={()=>handleProcurar(eventos, enderecos, setEventosFiltrados, filtro={cidade, bairro, categoria, data, turno}, setEscondeForm, setEscondeBotao)}/>
                </View>
            </View>

            <ScrollView>
                {eventosFiltrados != null &&
                    renderizaEventos(eventosFiltrados, navigation)
                }
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    viewBotao:{
        width: 80,
        height: 30,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtFiltros:{
        fontSize: 12,
        color: '#fff',
    },
    viewLinkEsconder:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    txtEsconder:{
        color:"#FF6347",
        fontSize: 10,
        marginHorizontal: 5
    },
    viewForm:{
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'yellow',
    },
    escondeView:{
        height: 0,
        opacity: 0,
    },
    txt:{
        fontSize: 10,
        marginTop: 10,
        marginBottom: 0,
        paddingBottom: 0,
    },
    input:{
        padding: 0,
        paddingBottom: 1,
        borderRadius: 5,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    viewBtnProcurar:{
        marginTop: 20, 
        borderRadius: 15,
        overflow: 'hidden',
    },
    picker:{
        height: 40, 
        width: '100%',
    },
    viewPicker:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '100%',
    },
    inputData:{
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '68%',
        marginRight: 25,
    },
    viewEvento:{
        height: 200,
        marginVertical: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#612F74',
        overflow: 'hidden',
    },
    foto:{
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    viewNotFound:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    viewAnimacao:{
        height: 200,
        width: 200
    }
})

