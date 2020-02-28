import React from 'react';
import {View, ScrollView, Text, Image, StyleSheet, Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';

import EventoDao from '../../../../daos/eventoDao';
import {deletaEventoNaLista} from '../../../../actions';
import {
    Banner,
    Imagem,
    Info,
    Titulo,
    Texto,
    Botoes,
    Botao,
    Label
} from './styles';


export default function detalheEvento({navigation}){
    const evento = navigation.getParam('evento');
    const endereco = navigation.getParam('endereco');
    const dispatch = useDispatch();

    function exibeDialogExcluir(){
        Alert.alert(
            'Excluir evento',
            'Tem certeza que deseja excluir o evento ' + evento.titulo + " ?",
            [
              {
                text: 'Cancelar',
                onPress: () => console.log("exclusão cancelada"),
                style: 'cancel',
              },
              {text: 'Excluir', onPress: () => excluiEvento()},
            ],
            {cancelable: false},
          );
    }

    function excluiEvento(){
        EventoDao.deletaEvento(evento)
            .then(()=>{
                Toast.show('Evento excluido com sucesso');
                dispatch(deletaEventoNaLista(evento));
                navigation.pop(1);
            })
    }

    return(
        <ScrollView>
            <Banner>
                <Imagem  source={{ uri: evento.uriFoto}} />
            </Banner>

            <Info>
                <Titulo>Dados:</Titulo>
                <Texto>{evento.titulo}</Texto>
                <Texto>{evento.data}  - às {evento.hora} horas</Texto>
                <Texto>{evento.categoria}  - R$ {evento.valIngresso}  </Texto>
                <Text style={styles.txtLink}>{evento.linkIngresso}</Text>
            </Info>

            <Info> 
                <Titulo>Descrição:</Titulo>
                <Texto>{evento.descricao}</Texto>
            </Info>

            <Info>
                <Titulo>Endereço:</Titulo>
                <Texto>{endereco.rua}, {endereco.numero}</Texto>
                <Texto>{endereco.bairro}</Texto>
                <Texto>{endereco.cidade}, {endereco.estado}  </Texto>
                <Texto>{endereco.cep}</Texto>
            </Info>

            <Botoes>
                <Botao color='red' onPress={()=>{exibeDialogExcluir()}}>
                    <Label color="#fff" size="13px">Excluir</Label>
                </Botao>
                <Botao color='blue' onPress={()=>{navigation.navigate("TelaFormAttEvento", {eventoAAtualizar: evento})}} >
                    <Label color="#fff" size="13px">Editar</Label>
                </Botao>
            </Botoes>
        </ScrollView>
    )
    
} 

const styles = StyleSheet.create({
    txtLink:{
        fontSize: 16,
        color: 'blue',
    },
})