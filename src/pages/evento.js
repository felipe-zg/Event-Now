import React, {useState} from 'react';
import {View, ScrollView, Text, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, Alert, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FontawesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialComunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import EnderecoDao from '../daos/enderecoDao';
import UsuarioDao from '../daos/usuarioDao';

import  Toast  from 'react-native-root-toast';
import {NavigationApps,actions,googleMapsTravelModes, mapsTravelModes} from 'react-native-navigation-apps';


import {addFavoritoNaLista, deletarFavoritoDaLista} from '../actions';
import Firebase  from 'react-native-firebase';

handleComprarIngresso = (evento)=>{
    if(evento.linkIngresso == ''){
        Toast.show('Esse evento não possui venda de ingressos');
    }else{
        Linking.openURL(evento.linkIngresso);
    }
}

handleEnviarNotificacoes = (evento)=>{

    const channel = new Firebase.notifications.Android.Channel('test-channel', 'Test Channel', Firebase.notifications.Android.Importance.Max)
        .setDescription('My apps test channel');

    Firebase.notifications().android.createChannel(channel);

    const notificacao = new Firebase.notifications.Notification()
        .setNotificationId('notificationId')
        .setTitle('My notification title')
        .setBody('My notification body')
        .setData({
            key1: 'value1',
            key2: 'value2',
        });

        notificacao.android.setChannelId(channel);
        notificacao.android.setSmallIcon('ic_launcher');
    if(checkPermission()){
        console.warn("tem permissao");
        Firebase.notifications().displayNotification(notificacao);
    }else{
        requestPermission();
    }
}

checkPermission = async()=>{
    const permitido = await Firebase.messaging().hasPermission();
    if(permitido){
        return true;
    }else{
        return false;
    }
}
requestPermission = async()=>{
    try{
        await Firebase.messaging().requestPermission();
    }catch(e){
        console.warn(e);
    }
}

excluiEventoDaListaDeFavoritos = (evento, dispatch, setEhFavorito, setCorIcone, usuario, )=>{
    // apaga favorito do bd
    UsuarioDao.deletaFavoritoDaLista(usuario.keyListaFavoritos, evento.keyEvento)
        .then(()=>{
            dispatch(deletarFavoritoDaLista(evento));
            setEhFavorito(false);
            setCorIcone('#fff');
            Toast.show("Evento deletado da lista de favoritos");
        })
}

handleAddFavorito = (isLogged, usuario, evento, ehFavorito, setEhFavorito, setCorIcone, dispatch)=>{
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
                  {text: 'Excluir', onPress: () => excluiEventoDaListaDeFavoritos(evento, dispatch, setEhFavorito, setCorIcone, usuario)},
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


export default function evento({navigation}){
    const evento = navigation.getParam('evento', null);
    const isLogged = useSelector(state => state.isLogged);
    const usuario = useSelector(state=>state.usuario.dados);
    const favoritos = useSelector(state=>state.eventosFavoritos.eventos);
    const dispatch = useDispatch();

    const [ehFavorito, setEhFavorito] = useState(false);
    const [corIcone, setCorIcone] = useState('#fff');
    const [endereco, setEndereco] = useState(null);;

    favoritos.map(favorito=>{
        if(favorito.keyEvento == evento.keyEvento){
            if(!ehFavorito){
                setEhFavorito(true);
                setCorIcone('#b22222');
            } 
        }
    })


    if(endereco == null){
        EnderecoDao.findEnderecoByKey(evento.keyEndereco)
        .then(enderecoEvento=>{
            setEndereco(enderecoEvento);
        });
    }else{
       
    }
    
    return(
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612F74" />
            <View style={styles.viewFoto}>
                <Image 
                    source={{ uri: evento.uriFoto}}
                    style={styles.foto} />
            </View>


            <View style={styles.viewRowFavorito}>
            {/* <TouchableOpacity style={styles.viewAddFavorito} onPress={ ()=> handleEnviarNotificacoes(evento) }>
                    <MaterialComunityIcons name="bell-ring" color="#fff" size={30} />
                </TouchableOpacity>    */}
                <TouchableOpacity style={styles.viewAddFavorito} onPress={()=>handleAddFavorito(isLogged, usuario, evento, ehFavorito, setEhFavorito, setCorIcone, dispatch)}>
                    <AntdesignIcon name="heart" color={corIcone} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewAddFavorito} onPress={ ()=> handleComprarIngresso(evento) }>
                    <FontawesomeIcon name="ticket" color="#fff" size={30} />
                </TouchableOpacity>
            </View>


            <Text style={styles.txtTitulo}>{evento.titulo}</Text>

            <View style={styles.viewRowInfo}>
                <View style={styles.viewLeftInfo}>
                    <Text>{evento.categoria}</Text>
                    <Text>R$ {evento.valIngresso}</Text>
                </View>
                <View style={styles.viewRightInfo}>
                    <Text>{evento.data}</Text>
                    <Text>às {evento.hora} horas</Text>
                </View>
            </View>

            {endereco != null &&(
                <View  style={styles.viewRowEndereco}>
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
                            waze={{address:'', lat:endereco.latitude, lon:endereco.longitude, action: actions.navigateByLatAndLon}} // specific settings for waze
                            googleMaps={{address:'' ,lat:endereco.latitude,lon:endereco.longitude,action: actions.navigateByLatAndLon,travelMode:googleMapsTravelModes.driving}} // specific settings for google maps
                            maps={{address:'' ,lat:endereco.latitude,lon:endereco.longitude,action: actions.navigateByLatAndLon,travelMode:mapsTravelModes.driving}} // specific settings for maps
                        />
                    </View>
                </View>
            )}

            <View style={styles.viewDescricao}>
                <Text style={styles.txtDescricao}>{evento.descricao}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    viewFoto:{
        height: 250,
    },
    foto:{
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    viewRowFavorito:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    viewAddFavorito:{
        padding: 10,
        marginTop: -30,
        marginRight: 10,
        borderRadius: 30,
        backgroundColor: '#4B0082',
    },
    txtTitulo:{
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 5,
    },
    viewDescricao:{
        padding: 10,
        borderBottomColor: "#000",
        borderBottomWidth: 2,
    },
    txtDescricao:{

    },
    viewRowInfo:{
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: "#000",
        borderBottomWidth: 2,
    },
    viewLeftInfo:{
        width: (Dimensions.get('window').width *0.5)-10,
        alignItems: 'flex-start'
    },
    viewRightInfo:{
        width: (Dimensions.get('window').width *0.5)-10,
        alignItems: 'flex-end'
    },
    viewRowEndereco:{
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: "#000",
        borderBottomWidth: 2,
    },
    viewLeftEndereco:{
        width: (Dimensions.get('window').width *0.8)-10,
    },
    viewRightEndereco:{
        alignItems: 'center',
        justifyContent: 'center',
        width: (Dimensions.get('window').width *0.2)-10,
    },
    txtComoChegar:{
        textAlign: 'center',
        fontSize: 10
    },
    viewRowBtns:{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        
    },
    viewBtns:{
        alignItems: 'center'
    },
    txtBtns:{
        fontSize: 10,
    }
})