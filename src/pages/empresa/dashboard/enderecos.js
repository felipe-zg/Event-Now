import React,{} from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet, Button, Alert, StatusBar} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import Lottie from 'lottie-react-native';
import loadingAnimated from '../../../animations/caixaVazia.json';

import EnderecoDao from '../../../daos/enderecoDao';
import {deletaEnderecoNaLista} from '../../../actions';
import Toast from 'react-native-root-toast';

vaiParaOFormAttEndereco = (endereco, navigation)=>{
    navigation.navigate("TelaFormAttEndereco", {enderecoAAtualizar: endereco});
}

exibeDialogExcluirEndereco = (endereco, dispatch, eventos)=>{
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
              if(enderecoPertenceAAlgumEvento(endereco, eventos)){
                Toast.show('O endereço está sendo usado por um ou mais evento e não pode ser excluido');
              }else{
                excluiEndereco(endereco, dispatch);
              }
          }},
        ],
        {cancelable: false},
      );
}

enderecoPertenceAAlgumEvento = (endereco, eventos) =>{
    var pertence = false;
    eventos.map(evento=>{
        if(evento.keyEndereco == endereco.keyEndereco){
            pertence = true;
        }
    })
    return pertence;
}

excluiEndereco = (endereco, dispatch)=>{
    EnderecoDao.deletaEndereco(endereco)
        .then(()=>{
            Toast.show('Endereço excluido com sucesso');
            dispatch(deletaEnderecoNaLista(endereco));
        });
}


export default function Enderecos({navigation}){

    const dispatch = useDispatch();
    const eventos = useSelector(state=>state.listaEventos.eventos);
    const enderecos = useSelector(state => state.listaEnderecos.enderecos);
    if(enderecos.lenght>0){
        popoulaEnderecos();
    }
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            {enderecos.length == 0 &&(
                <View style={styles.viewPrincipal}>
                    <View style={styles.viewLoading}>
                        <Lottie resizeMode="contain"  source={loadingAnimated} autoPlay loop />
                    </View>
                    <Text style={styles.txtListaVazia}>Nenhum evento cadastrado</Text>
                </View> 
            )}
            {enderecos.length >0 &&(
                <ScrollView>
                    <FlatList   data={ enderecos } keyExtractor={ item => item.keyEndereco }  
                        renderItem={  ({ item}) => 
                            <View key={item.keyEndereco} style={styles.cardEndereco}> 
                                <Text>{item.rua}, {item.numero}, {item.bairro}</Text> 
                                <Text>{item.cidade}, {item.estado}</Text> 
                                <View style={styles.viewBotoes}>
                                    <View style={styles.viewBotao}>
                                        <Button title="Excluir" color='red' onPress={()=>{exibeDialogExcluirEndereco(item, dispatch, eventos)}} />
                                    </View>
                                    <View style={styles.viewBotao}>
                                        <Button title="Editar" color='blue' onPress={()=>{vaiParaOFormAttEndereco(item, navigation)}} />
                                    </View>
                                </View>
                            </View> 
                        }
                    />
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cardEndereco:{
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#612F74',
        borderRadius: 5,
        marginHorizontal: 5,
        marginTop: 10,
        padding: 5,
    },
    viewBotoes:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
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
    },
    viewBotao:{
        borderRadius: 20,
        width: '40%',
        overflow: 'hidden',
    }
})
