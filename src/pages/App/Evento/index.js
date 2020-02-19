import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import  Toast  from 'react-native-root-toast';
import {NavigationApps,actions,googleMapsTravelModes, mapsTravelModes} from 'react-native-navigation-apps';

import EnderecoDao from '../../../daos/enderecoDao';
import UsuarioDao from '../../../daos/usuarioDao';
import {addFavoritoNaLista, deletarFavoritoDaLista} from '../../../actions';
import {Container, ViewFoto ,Foto, Acoes, Acao, Titulo, InfoEvento, Descricao} from './styles';

handleComprarIngresso = (evento)=>{
    if(evento.linkIngresso == ''){
        Toast.show('Esse evento não possui venda de ingressos');
    }else{
        Linking.openURL(evento.linkIngresso);
    }
}


export default function evento({navigation}){
    const evento = navigation.getParam('evento', null);
    const isLogged = useSelector(state => state.isLogged);
    const usuario = useSelector(state=>state.usuario.dados);
    const favoritos = useSelector(state=>state.eventosFavoritos.eventos);
    const dispatch = useDispatch();

    const [ehFavorito, setEhFavorito] = useState(false);
    const [corIcone, setCorIcone] = useState('#fff');
    const [endereco, setEndereco] = useState(null);;

    useEffect(()=>{
        favoritos.map(favorito=>{
            if(favorito.keyEvento == evento.keyEvento){
                if(!ehFavorito){
                    setEhFavorito(true);
                    setCorIcone('#b22222');
                } 
            }
        })
    },[]);


    useEffect(()=>{
        if(endereco == null){
            EnderecoDao.findEnderecoByKey(evento.keyEndereco)
                .then(enderecoEvento=>{
                    setEndereco(enderecoEvento);
                });
        }
    }, [endereco]);

    function HandleAddFavorito(){
        if(isLogged){
            if(ehFavorito){
                Alert.alert(
                    'Excluir favorito',
                    'Tem certeza que deseja excluir o evento da lista de favoritos ? ',
                    [
                      {
                        text: 'Cancelar',
                        onPress: () => console.log("exclusão cancelada"),
                        style: 'cancel',
                      },
                      {text: 'Excluir', onPress: () => ExcluiEventoDaListaDeFavoritos()},
                    ],
                    {cancelable: false},
                  );
            }else{
                UsuarioDao.adicionaEventoAListaDeFavoritos(usuario.keyListaFavoritos, evento.keyEvento)
                    .then(()=>{
                        setEhFavorito(true);
                        setCorIcone('#b22222');
                        dispatch(addFavoritoNaLista(evento));
                        Toast.show("Adicionado a lista de favoritos");
                    });
            }
        }else{
            Toast.show("Você precisa estar logado para adicionar favoritos");
        }
    }

    function ExcluiEventoDaListaDeFavoritos(){
        // apaga favorito do bd
        UsuarioDao.deletaFavoritoDaLista(usuario.keyListaFavoritos, evento.keyEvento)
            .then(()=>{
                dispatch(deletarFavoritoDaLista(evento));
                setEhFavorito(false);
                setCorIcone('#fff');
                Toast.show("Evento deletado da lista de favoritos");
            })
    }
    
    return(
        <Container>
            <ViewFoto>
                <Foto source={{ uri: evento.uriFoto}} />
            </ViewFoto>


            <Acoes>
                <Acao onPress={()=>HandleAddFavorito()}>
                    <AntdesignIcon name="heart" color={corIcone} size={30} />
                </Acao>
                <Acao onPress={()=>handleComprarIngresso(evento) }>
                    <FontawesomeIcon name="ticket" color="#fff" size={30} />
                </Acao>
            </Acoes>


            <Titulo>{evento.titulo}</Titulo>

            <InfoEvento>
                <View style={styles.viewLeftInfo}>
                    <Text>{evento.categoria}</Text>
                    <Text>R$ {evento.valIngresso}</Text>
                </View>
                <View style={styles.viewRightInfo}>
                    <Text>{evento.data}</Text>
                    <Text>às {evento.hora} horas</Text>
                </View>
            </InfoEvento>

            {endereco != null &&(
                <InfoEvento>
                    <View style={styles.viewLeftEndereco}>
                        <Text>{endereco.rua}, {endereco.numero}</Text>
                        <Text>{endereco.bairro}, {endereco.cidade} - {endereco.estado}</Text>
                    </View>
                    <View style={styles.viewRightEndereco}>
                        <MaterialIcon name="directions-car" color="#000" size={40} />
                        <NavigationApps
                            viewMode='sheet'
                            actionsheetTitle='Escolha seu mapa'
                            actionSheetBtnCloseTitle='Cancelar'
                            actionSheetBtnOpenTextStyle={{fontSize: 10, textAlign: 'center'}}
                            actionSheetBtnOpenTitle='Como Chegar'
                            address='' // address to navigate by for all apps 
                            waze={{address:'', lat:endereco.latitude, lon:endereco.longitude, action: actions.navigateByLatAndLon}}
                            googleMaps={{address:'' ,lat:endereco.latitude,lon:endereco.longitude,action: actions.navigateByLatAndLon,travelMode:googleMapsTravelModes.driving}} 
                            maps={{address:'' ,lat:endereco.latitude,lon:endereco.longitude,action: actions.navigateByLatAndLon,travelMode:mapsTravelModes.driving}} 
                        />
                    </View>
                </InfoEvento>
            )}

            <Descricao>
                <Text>{evento.descricao}</Text>
            </Descricao>
        </Container>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    viewLeftInfo:{
        width: (Dimensions.get('window').width *0.5)-10,
        alignItems: 'flex-start'
    },
    viewRightInfo:{
        width: (Dimensions.get('window').width *0.5)-10,
        alignItems: 'flex-end'
    },
    viewLeftEndereco:{
        width: (Dimensions.get('window').width *0.8)-10,
    },
    viewRightEndereco:{
        alignItems: 'center',
        justifyContent: 'center',
        width: (Dimensions.get('window').width *0.2)-10,
    },
})