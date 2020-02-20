import React, {useState} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';

import loadingAnimated from '../../../animations/seta.json';
import sadAnimation from '../../../animations/sad.json';
import Texto from '../../../components/Texto';
import {
        Filtros, 
        Filtro, 
        Foto,
        NotFound,
        Animacao,
        Categoria,
        Seta,
        RowEventos,
        EventoFiltrado,
        TituloEventoFiltrado,
        Evento,
        TituloEvento
    } from './styles';


export default function Main({navigation}){
    const categorias = useSelector(state=>state.listaCategorias.categorias);
    const eventosDeHoje = useSelector(state=>state.listaEventosDeHoje.eventos);
    const [filtro, setFiltro] = useState(null);


    function renderizaEventosDeHoje(filtro){
        if(eventosDeHoje.length  ==  0){
            return(
                <NotFound>
                    <Animacao>
                        <Lottie resizeMode="contain"  source={sadAnimation} autoPlay loop />
                    </Animacao>
                    <Text style={{textAlign: 'center'}}>Não há eventos hoje :(</Text>
                    <Text style={{textAlign: 'center'}}>Busque eventos futuros na aba "Procurar eventos"</Text>
                </NotFound> 
            )
        }else{
            if(filtro == null){
                return categorias.map(categoria=>{
                    if(VerificaSeCategoriaPoussiPeloMenosUmEvento(categoria)){
                        return(
                            <View key={Math.random(10)}>
                                <Categoria>
                                    <View> 
                                        <Texto color="#000" size="12px">{categoria}</Texto>
                                    </View>
                                    <Seta>
                                        <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                                    </Seta>
                                </Categoria>
                                <RowEventos horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    {renderizaEventosPorCategoria(categoria)}
                                </RowEventos>
                            </View>
                        )
                    }
                })
            }else{
                return(
                    <View key={Math.random(10)}>
                        {renderizaEventosFiltrados(filtro)}
                    </View>
                )
            }
        }
    }

    function RenderizaCategoriasDeFiltro(){
        return categorias.map((categoria) => {
            return (
                <Filtro key={Math.random(10)}  onPress={()=>setFiltro(categoria)}>
                    <Text style={styles.txtCategoria}>{categoria}</Text>
                </Filtro>
            )
        })
    }

    function renderizaEventosFiltrados(categoria){
        return eventosDeHoje.map((evento) => {
            if(evento.categoria == categoria){
                return (
                    <EventoFiltrado  key={evento.keyEvento} onPress={()=>navigation.navigate("TelaEvento", {evento})}>
                        <Foto source={{ uri: evento.uriFoto}} />
                        <TituloEventoFiltrado numberOfLines={1}>{evento.titulo}</TituloEventoFiltrado>
                    </EventoFiltrado>
                )
            }
        })
    }

    function renderizaEventosPorCategoria(categoria){
        return eventosDeHoje.map((evento) => {
            if(evento.categoria == categoria){
                return (
                    <Evento key={evento.keyEvento} onPress={()=>navigation.navigate("TelaEvento", {evento})}>
                        <Foto source={{ uri: evento.uriFoto}} />
                        <TituloEvento numberOfLines={1}>{evento.titulo}</TituloEvento>
                    </Evento>
                )
            }
        })
    }

    function VerificaSeCategoriaPoussiPeloMenosUmEvento(categoria){
        var catPossuiEvento = false;
        eventosDeHoje.map(evento=>{
            if(evento.categoria == categoria) catPossuiEvento = true;
            return catPossuiEvento;
        })
        return catPossuiEvento;
    }


    return(
        <ScrollView>
            <Filtros horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Filtro key={Math.random(10)} onPress={()=>setFiltro(null)}>
                    <Text style={styles.txtCategoria}>Todos</Text>
                </Filtro>
                {RenderizaCategoriasDeFiltro()}
            </Filtros>
            {renderizaEventosDeHoje(filtro)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    txtCategoria:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

