import React,{} from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Lottie from 'lottie-react-native';
import Toast from 'react-native-root-toast';

import loadingAnimated from '../../../../animations/caixaVazia.json';
import EnderecoDao from '../../../../daos/enderecoDao';
import {deletaEnderecoNaLista} from '../../../../actions';
import {
    Container,
    ViewAnimacao,
    Animacao,
    TxtAnimacao,
    Endereco,
    Botoes,
    Botao,
    LabelBotao
} from './styles';

export default function Enderecos({navigation}){

    const dispatch = useDispatch();
    const eventos = useSelector(state=>state.listaEventos.eventos);
    const enderecos = useSelector(state => state.listaEnderecos.enderecos);
    if(enderecos.lenght>0){
        popoulaEnderecos();
    }

    function exibeDialogExcluirEndereco(endereco){
        Alert.alert(
            'Excluir Endereço',
            'Tem certeza que deseja excluir o endereço ?',
            [
              {
                text: 'Cancelar',
                onPress: () => console.log("exclusão cancelada"),
                style: 'cancel',
              },
              {text: 'Excluir', onPress: () => {
                  if(enderecoPertenceAAlgumEvento(endereco)){
                    Toast.show('O endereço está sendo usado por um ou mais eventos e não pode ser excluido');
                  }else{
                    excluiEndereco(endereco);
                  }
              }},
            ],
            {cancelable: false},
          );
    }

    function enderecoPertenceAAlgumEvento(endereco){
        var pertence = false;
        eventos.map(evento=>{
            if(evento.keyEndereco == endereco.keyEndereco){
                pertence = true;
            }
        })
        return pertence;
    }

    function excluiEndereco(endereco){
        EnderecoDao.deletaEndereco(endereco)
            .then(()=>{
                Toast.show('Endereço excluido com sucesso');
                dispatch(deletaEnderecoNaLista(endereco));
            });
    }

    return(
        <Container>
            {enderecos.length == 0 &&(
                <ViewAnimacao>
                    <Animacao>
                        <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                    </Animacao>
                    <TxtAnimacao>Nenhum evento cadastrado</TxtAnimacao>
                </ViewAnimacao> 
            )}
            {enderecos.length >0 &&(
                <ScrollView>
                    <FlatList   data={ enderecos } keyExtractor={ item => item.keyEndereco }  
                        renderItem={  ({ item}) => 
                            <Endereco key={item.keyEndereco}> 
                                <Text>{item.rua}, {item.numero}, {item.bairro}</Text> 
                                <Text>{item.cidade}, {item.estado}</Text> 
                                <Botoes>
                                    <Botao color='#f00' onPress={()=>{exibeDialogExcluirEndereco(item)}}>
                                        <LabelBotao>excluir</LabelBotao>
                                    </Botao>
                                    <Botao color='#00f' onPress={()=>navigation.navigate("TelaFormAttEndereco", {enderecoAAtualizar: item})}>
                                        <LabelBotao>editar</LabelBotao>
                                    </Botao>
                                </Botoes>
                            </Endereco> 
                        }
                    />
                </ScrollView>
            )}
        </Container>
    )
}

