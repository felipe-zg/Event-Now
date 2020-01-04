import React, {useState} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';

import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../animations/seta.json';
import sadAnimation from '../animations/sad.json';


renderizaCategoriasDeFiltro = (categorias, setFiltro)=>{
    return categorias.map((categoria) => {
        return (
            <TouchableOpacity key={Math.random(10)} style={styles.viewCategoria} onPress={()=>setFiltro(categoria)}>
                <Text style={styles.txtCategoria}>{categoria}</Text>
            </TouchableOpacity>
        )
    })
}

renderizaEventosPorCategoria = (eventosDeHoje, categoria, estiloDaView, estiloTitulo, navigation)=>{
    return eventosDeHoje.map((evento) => {
        if(evento.categoria == categoria){
            return (
                <TouchableOpacity style={estiloDaView} key={evento.keyEvento} onPress={()=>navigation.navigate("TelaEvento", {evento})}>
                    <Image 
                        source={{ uri: evento.uriFoto}}
                        style={styles.foto} />
                    <Text numberOfLines={1} style={estiloTitulo}>{evento.titulo}</Text>
                </TouchableOpacity>
            )
        }
    })
}

verificaSeCategoriaPoussiPeloMenosUmEvento = (eventosDeHoje, categoria)=>{
    var catPossuiEvento = false;
    eventosDeHoje.map(evento=>{
        if(evento.categoria == categoria) catPossuiEvento = true;
        return catPossuiEvento;
    })
    return catPossuiEvento;
}

renderizaEventosDeHoje = (eventosDeHoje, categorias, filtro, navigation)=>{
    if(eventosDeHoje.length  ==  0){
        return(
            <View style={styles.viewNotFound}>
                <View style={styles.viewAnimacaoNotFound}>
                    <Lottie resizeMode="contain"  source={sadAnimation} autoPlay loop />
                </View>
                <Text style={{textAlign: 'center'}}>Não há eventos hoje :(</Text>
                <Text style={{textAlign: 'center'}}>Busque eventos futuros na aba "Procurar eventos"</Text>
            </View> 
        )
    }else{
        if(filtro == null){
            return categorias.map(categoria=>{
                if(verificaSeCategoriaPoussiPeloMenosUmEvento(eventosDeHoje, categoria)){
                    return(
                        <View key={Math.random(10)}>
                            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                            <View style={styles.txtViewEventos}>
                                <View style={styles.viewTxtCategoria}> 
                                    <Text style={styles.txtEvento}>{categoria}</Text>
                                </View>
                                <View style={styles.viewAnimacao}>
                                    <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                                </View>
                            </View>
                            <ScrollView style={styles.viewRowEventos} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                {renderizaEventosPorCategoria(eventosDeHoje, categoria, styles.viewEvento, styles.txtTituloEvento, navigation)}
                            </ScrollView>
                        </View>
                    )
                }
            })
        }else{
            return(
                <View key={Math.random(10)}>
                    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
                    {renderizaEventosPorCategoria(eventosDeHoje, filtro, styles.viewEventoFiltrado, styles.txtTituloEventoFiltrado, navigation)}
                </View>
            )
        }
    }
}


export default function Main({navigation}){


    const categorias = useSelector(state=>state.listaCategorias.categorias);
    const eventosDeHoje = useSelector(state=>state.listaEventosDeHoje.eventos);
    const [filtro, setFiltro] = useState(null);
    return(
        <ScrollView>
            <ScrollView style={styles.filtroCategorias} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <TouchableOpacity key={Math.random(10)} style={styles.viewCategoria} onPress={()=>setFiltro(null)}>
                    <Text style={styles.txtCategoria}>Todos</Text>
                </TouchableOpacity>
                {renderizaCategoriasDeFiltro(categorias, setFiltro)}
            </ScrollView>
            {renderizaEventosDeHoje(eventosDeHoje, categorias, filtro, navigation)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBtnSearch:{
        height: 40,
        margin: 5,
        paddingHorizontal:10,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        backgroundColor: '#FF6347',
    },
    filtroCategorias:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 15,
    },
    viewCategoria:{
        height: 40,
        margin: 5,
        paddingHorizontal:10,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        backgroundColor: '#FF6347',
    },
    txtCategoria:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txtTituloEvento:{
        fontSize: 11,
        marginLeft: 10,
        color: '#612F74',
    },
    txtTituloEventoFiltrado:{
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 10,
        paddingVertical: 2,
        color: '#fff',
    },
    viewRowEventos:{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    viewEvento:{
        height: 140,
        width: 180,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
    },
    viewEventoFiltrado:{
        height: 200,
        marginVertical: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#612F74',
        overflow: 'hidden',
    },
    txtViewEventos:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    txtEvento:{
        fontSize: 12,
    },
    viewTxtCategoria:{
     
    },
    viewAnimacao:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
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
    viewAnimacaoNotFound:{
        height: 200,
        width: 200
    },
})

