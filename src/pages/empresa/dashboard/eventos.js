import React, {useState} from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity ,StyleSheet, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../../animations/caixaVazia.json';


vaiParaTelaDetaheEvento = (evento, enderecos, navigation)=>{
    const endereco = retornaEnderecoPelaKey(enderecos, evento.keyEndereco);
    navigation.navigate('TelaDetalheEventoEmpresa', {evento, endereco});
}

retornaEnderecoPelaKey = (enderecos, key)=>{
    var enderecoARetornar = null;
    enderecos.map(endereco=>{
        if(endereco.keyEndereco == key){
            enderecoARetornar = endereco;
        }
    });
    return enderecoARetornar;
}

export default function Eventos({navigation}){

    const eventos = useSelector(state=>state.listaEventos.eventos);
    const enderecos = useSelector(state=>state.listaEnderecos.enderecos);
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            {eventos.length == 0 &&(
                <View style={styles.viewPrincipal}>
                    <View style={styles.viewLoading}>
                        <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                    </View>
                    <Text style={styles.txtListaVazia}>Nenhum evento cadastrado</Text>
                </View> 
            )}
            {eventos.length >0 &&(
                <ScrollView>
                    {eventos.map(evento=>{
                        return(
                            <TouchableOpacity style={styles.viewEvento} key={evento.keyEvento} onPress={()=>vaiParaTelaDetaheEvento(evento, enderecos, navigation)}>
                                <Image 
                                    source={{ uri: evento.uriFoto}}
                                    style={styles.foto} />
                                <Text numberOfLines={1} style={styles.txtFoto}>{evento.titulo}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            )}
        </View>
    )
    
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    viewEvento:{
        height: 150,
        margin: 5,
        marginTop: 10,
        borderBottomWidth: 3,
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
    txtFoto:{
        alignSelf: 'center',
    },
    viewPrincipal:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    viewLoading:{
        height: 200,
        width: 200,
        marginBottom: 20,
    },
    txtListaVazia:{
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 10,
    }
})