import React, {useState} from 'react';
import {ScrollView, View, Text, Image, FlatList, TouchableOpacity ,StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../../../animations/caixaVazia.json';
import {
    Container,
    ViewAnimacao,
    Animacao,
    TxtAnimacao,
    Evento,
    Foto
} from './styles';


export default function Eventos({navigation}){

    const eventos = useSelector(state=>state.listaEventos.eventos);
    const enderecos = useSelector(state=>state.listaEnderecos.enderecos);

    function vaiParaTelaDetaheEvento(evento){
        const endereco = retornaEnderecoPelaKey(evento.keyEndereco);
        navigation.navigate('TelaDetalheEventoEmpresa', {evento, endereco});
    }

    function retornaEnderecoPelaKey(key){
        var enderecoARetornar = null;
        enderecos.map(endereco=>{
            if(endereco.keyEndereco == key){
                enderecoARetornar = endereco;
            }
        });
        return enderecoARetornar;
    }


    return(
        <Container>
            {eventos.length == 0 &&(
                <ViewAnimacao>
                    <Animacao>
                        <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                    </Animacao>
                    <TxtAnimacao>Nenhum evento cadastrado</TxtAnimacao>
                </ViewAnimacao> 
            )}
            {eventos.length >0 &&(
                <FlatList   data={ eventos } keyExtractor={ item => item.keyEvento }  
                    renderItem={  ({ item}) => 
                        <Evento onPress={()=>vaiParaTelaDetaheEvento(item)}>
                            <Foto source={{ uri: item.uriFoto}} />
                            <Text numberOfLines={1} style={styles.txtFoto}>{item.titulo}</Text>
                        </Evento>
                    }
                />
            )}
        </Container>
    )
    
} 

const styles = StyleSheet.create({
    txtFoto:{
        alignSelf: 'center',
    },
})